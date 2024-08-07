const { StatusCodes } = require('http-status-codes');

const { AirportService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


/**
 * POST : /airports 
 * req-body {modelNumber: 'airbus320', capacity: 200}
 */


async function createAirport(req, res) {
    try {

        const {name,cityId,code,address}=req.body;
        const airport = await AirportService.createAirport({
          name,
          code,
          address,
          cityId
        });
        SuccessResponse.data = airport;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


async function getAirports(req,res){
    try {
        
        const airports=await AirportService.getAirports();
        SuccessResponse.data=airports;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
        
    }
}

// POST :/airports/:id
// req-body {}

async function getAirport(req,res){
    try {
        
        const airport=await AirportService.getAirport(req.params.id);
        SuccessResponse.data=airport;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
        
    }
}




async function destroyAirport(req,res){
    try {
        
        const airport=await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data=airport;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
        
    }
}


async function updateAirport(req,res){
    try {
        
        const airport=await AirportService.updateAirport(req.params.id,req.body);
        SuccessResponse.data=airport;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
        
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}