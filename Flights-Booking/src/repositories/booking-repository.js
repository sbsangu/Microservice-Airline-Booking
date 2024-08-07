const { StatusCodes } = require("http-status-codes");

const { Booking } = require("../models");
const CrudRepository = require("./crud-repository");
const AppError = require("../utils/errors/app-error");
const { Enums } = require('../utils/common');
const { Op } = require("sequelize");

const {BOOKED,CANCELLED}=Enums.BOOKING_STATUS

class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  async createBooking(data, transaction) {
    const booking = await Booking.create(data, { transaction: transaction });
    // console.log(booking)
    return booking;
  }

  async get(data, transaction) {
    const booking = await Booking.findByPk(data, { transaction: transaction });
    if (!booking) {
      throw new AppError("Unable to find the booking", StatusCodes.NOT_FOUND);
    }
    return booking;
  }

  async update(id, data, transaction) {
    const response = await this.model.update(
      data,
      {
        where: { id },
      },
      {
        transaction: transaction,
      }
    );

    // if (!affectedRows) {
    //     throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    // }

    // const updatedRecord = await this.model.findOne({
    //     where: { id }
    // });

    return response;
  }

  async cancelOldBookings(timestamp) {
    console.log("in repo")
    const response = await Booking.update({status: CANCELLED},{
        where: {
            [Op.and]: [
                {
                    createdAt: {
                        [Op.lt]: timestamp
                    }
                }, 
                {
                    status: {
                        [Op.ne]: BOOKED
                    }
                },
                {
                    status: {
                        [Op.ne]: CANCELLED
                    }
                }
            ]
            
        }
    });
    return response;
}

}

module.exports = BookingRepository;
