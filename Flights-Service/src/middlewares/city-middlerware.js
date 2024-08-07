const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

async function validateCityMiddleware(req,res,next){
 
 if(!req.body.name){
  
  ErrorResponse.message="Something went wrong while creating the city";
  ErrorResponse.error=new AppError(['Name not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
  }
  next();
 }


 module.exports={
  validateCityMiddleware
 }