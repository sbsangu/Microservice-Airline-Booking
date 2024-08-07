const express = require('express');

const { AirportController } = require('../../controllers');
const { AirportMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/airplanes POST
router.post('/', 
        AirportMiddlewares.validateCreateRequest,
        AirportController.createAirport);

// /api/v1/airplanes GET
router.get('/', 
       AirportController.getAirports);   
        
router.get('/:id', 
       AirportController.getAirport);     
        
router.delete('/:id', 
     AirportController.destroyAirport);  
        
        
router.patch('/:id', 
      AirportController.updateAirport);            

module.exports = router;