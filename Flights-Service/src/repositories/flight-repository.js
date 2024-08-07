const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport } = require("../models");
const { Sequelize } = require("sequelize");
const db = require("../models");
const { Queries } = require(".");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filters, sort) {
    const flights = await Flight.findAll({
      where: filters,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplaneDetail",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          
        },
        {
         model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
        }
      ],
    });

    return flights;
  }

  async updateRemainingSeats(flightsId,seats,dec=true){

    const transaction=await db.sequelize.transaction();
   try {
    await db.sequelize.query(Queries.addRowLockOnFlights(flightsId))
    const flight=await Flight.findByPk(flightsId);
    if(+dec){
     await flight.decrement('totalSeats',{by:seats},{transaction:transaction});
     
    }else{
      await flight.increment('totalSeats',{by:seats},{transaction:transaction});
      
    }

    await  transaction.commit();
    return flight;
    
   } catch (error) {
    await transaction.rollback();
    throw error;
   }
  }

}

module.exports = FlightRepository;
