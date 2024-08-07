const express = require('express');

const { InfoController } = require('../../controllers');

const airplaneRoutes = require('./airplane-routes');
const CityRoutes=require("./city-routes")
const airportRoutes=require('./airport-routes')
const flightRoutes=require('./flight-routes')

const router = express.Router();

router.use('/airplanes', airplaneRoutes);

//for airports
router.use('/airports', airportRoutes);

//for cities

router.use("/cities",CityRoutes)
//for flight
router.use('/flights', flightRoutes);


router.get('/info', InfoController.info);


module.exports = router;