const express=require('express');
const { UserController } = require('../../controllers');
const { AuthMiddleware } = require('../../middlewares');

const router=express.Router();

router.post('/signup',AuthMiddleware.validateAuthRequest,UserController.createUser);
router.post('/signin',AuthMiddleware.validateAuthRequest,UserController.signin);
router.post('/role',AuthMiddleware.checkAuth,AuthMiddleware.isAdmin,UserController.addRoletoUser);


module.exports=router;