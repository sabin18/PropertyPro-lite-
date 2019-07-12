import joi from 'joi';

const userSchema = joi.object().keys({
  firstname: joi.string().alphanum().min(3).max(15)
    .required().trim(),
  lastname: joi.string().alphanum().min(3).max(15)
    .required().trim(),
  address: joi.string().min(3).max(15)
    .required().trim(),
  phonenumber: joi.number().integer().required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().trim(),
  email: joi.string().email().required().trim(), 

});

const resetpassSchema = joi.object().keys({
  newpassword: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().trim(),
  email: joi.string().email().required().trim(), 

});

const flagSchema = joi.object().keys({
  reason: joi.string().min(3).max(15).valid(['pricing','weird demands'])
  .required().trim().label('reason'),
  description: joi.string().min(3)
    .required().trim().label('discription'),
});

const propertySchema = joi.object().keys({
  type: joi.string().min(8).valid(['1 bedroom','2 bedroom','3 bedroom','4 bedroom','5 bedroom','6 bedroom','7 bedroom','mini flat'])
  .required()
  .trim(),
  city: joi.string().alphanum().min(3).max(15)
  .required().trim().label('city'),
  address: joi.string().alphanum().min(3).max(15)
    .required().trim().label('address'),
  price: joi.number().integer().min(1)
    .required(),

 
});
const UpdateSchema = joi.object().keys({
  type: joi.string().min(8).valid(['1 bedroom','2 bedroom','3 bedroom','4 bedroom','5 bedroom','6 bedroom','7 bedroom','mini flat']).trim(),
  price: joi.number().integer().min(1) ,
 
});

const markSchema = joi.object().keys({
  status: joi.string().min(4).max(4).valid(['sold'])
    .required()
    .trim(),
});

export default {
  userSchema, flagSchema,propertySchema,UpdateSchema ,markSchema,resetpassSchema,
};
