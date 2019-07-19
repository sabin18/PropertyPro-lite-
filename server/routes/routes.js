import express from 'express';
import PropertyController from '../controller/propertycontroller';
import fileUpload from "express-fileupload";
import flagController from '../controller/flagscontroller';
import userController from '../controller/userscontroller';
import authentication from '../helpers/authentication';

const router = express.Router();
router.use(fileUpload({
    createParentPath: true,
    useTempFiles:true
  }));
  
// get routers

router.get('/api/v1/users',userController.getuser);
router.get('/api/v1/flags', flagController.getflags);
router.get('/api/v1/properties',PropertyController.GetPropertyType);

// post routers
router.post('/api/v1/property',authentication.UseraccessRequired, PropertyController.createproperty);
router.post('/api/v1/:property_id/flags', flagController.createflags);
router.post('/api/v1/auth/signup', userController.createUser);
router.post('/api/v1/auth/signin', userController.login);


// get by id  routers
router.get('/api/v1/users/:ID',userController.getOneuser);
router.get('/api/v1/property/:ID',PropertyController.getOneproperty);
router.get('/api/v1/property/:ID/flags',flagController.getOneflag);
router.get('/api/v1/flags/:ID',flagController.Oneflag);

// patch router
router.patch('/api/v1/property/:ID/',authentication.UseraccessRequired,PropertyController.updateproperty);
router.patch('/api/v1/property/:ID/sold',authentication.UseraccessRequired, PropertyController.markproperty);
router.patch('/api/v1/user/resetpassword', userController.resetpassword);


// delete routers
router.delete('/api/v1/property/:ID',authentication.UseraccessRequired,PropertyController.deleteproperty);


export default router;
