const express=require("express");
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");

const router=express.Router();

router.post("/",CityMiddleware.validateCityMiddleware ,CityController.createCity);

module.exports=router;