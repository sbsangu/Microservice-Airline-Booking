const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");


// POST -/cities
// req-body: {name:"London"}

async function createCity(req, res) {
 try {
     const cities = await CityService.createCity({
         name:req.body.name
     });
     
     SuccessResponse.data = cities;
     console.log(SuccessResponse);
     return res
             .status(StatusCodes.CREATED)
             .json(SuccessResponse);
 } catch(error) {
     ErrorResponse.error = error;
     console.log(ErrorResponse);
     return res
             .status(error.statusCode)
             .json(ErrorResponse);
 }
}


module.exports={
 createCity
}