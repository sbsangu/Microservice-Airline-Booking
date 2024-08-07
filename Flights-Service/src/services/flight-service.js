const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    // console.log(data)
    const flight = await flightRepository.create(data);
    console.log(flight);

    return flight;
  } catch (error) {
    console.log(error.message);
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter=[];
  const endingTripTime = "23:59:00";

  if (query.trips) {

    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    

    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  //according to price
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.tripTime) {
    customFilter.departureTime = {
      [Op.between]: [query.tripTime, query.tripTime + endingTripTime],
    };
  }


  if(query.sort){
  
    const params=query.sort.split(',');
    const sortFilters=params.map(param=> param.split('_'));
    sortFilter=sortFilters

  }

  try {
    const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
    
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the details of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id){

  try {
    const flight = await flightRepository.get(id);
    return flight;

    
  } catch (error) {
    if(error.statusCode==StatusCodes.NOT_FOUND){
      throw new AppError("The detail of the flight not found",StatusCodes.NOT_FOUND)
    }

    throw new AppError(
      "Cannot fetch the details of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
}

}

async function updateSeats(data){

  try {
    const response = await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);

    return response;
    
  } catch (error) {
    throw new AppError(
      "Cannot update the details of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
}

}


module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
};
