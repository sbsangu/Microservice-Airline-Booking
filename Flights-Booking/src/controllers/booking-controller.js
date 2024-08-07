const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const inMemDb={};

async function createBooking(req, res) {
    console.log("body",req.body);
    try {
        
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        console.log("controller catching")
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}


async function makePayment(req, res) {
    console.log("body",req.body);
    try {
        const idempotencyKey=req.headers['x-idempotency-key'];

      if(!idempotencyKey){
        return res.status(StatusCodes.BAD_REQUEST).json({message:'idempotency key is missing'});
      }


        if(inMemDb[idempotencyKey]){
            return res.status(StatusCodes.BAD_REQUEST).json({message:'cannot retry on successfull payment'})
        }

        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });
        inMemDb[idempotencyKey]=idempotencyKey

        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        console.log("controller catching")
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}


module.exports = {
   createBooking,
   makePayment
}