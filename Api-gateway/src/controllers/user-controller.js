const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createUser(req, res) {
  try {
    const user = await UserService.create({
      email: req.body.email,
      password: req.body.password,
    });

    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signin(req,res){
  try {
    const user=await UserService.signin(req.body);
    SuccessResponse.data=user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
    
  } catch (error) {
    console.log(error)
    ErrorResponse.error=error
    return res.status(error.statusCode).json(ErrorResponse)
  }
}


async function addRoletoUser(req,res){
  try {
    const user=await UserService.addRoletoUser({
      role:req.body.role,
      id:req.body.id
    });
    SuccessResponse.data=user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
    
  } catch (error) {
    console.log(error)
    ErrorResponse.error=error
    return res.status(error.statusCode).json(ErrorResponse)
  }
}


module.exports={
 createUser,
 signin,
 addRoletoUser
}