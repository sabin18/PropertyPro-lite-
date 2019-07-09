import jwt from 'jwt-simple';
import joi from 'joi';
import properties from '../models/property';
import Schema from '../helpers/inputvalidation';
import model from '../models/property';
import cloudinary from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

const failed = (res, status, error) => res.status(status).send({ status, error });
const success = (res, status, message,data) => res.status(status).send({ status, message,data});
/*configure our cloudinary*/
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_ID, 
  api_secret: process.env.API_SECRET 
});

class PropertyController { 
//get properties function
  
  static GetPropertyType(req, res) {
    const {type}=req.query;
    const { error, value } = joi.validate(
      {
        type,
      },
      Schema.UpdateSchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
    const checkproperty= model.findall(req.query);
    if (checkproperty) {
      return success(res,200,'List of properties',checkproperty)
      
    }
    if(!type)
    {
      return success(res,200,'List of all properties',properties)
      
    }
    else{
      return failed(res,404,"can't find any property")
    
  }
  }
}

// create  property function
  static createproperty(req, res) {
    if(!req.files) {
        res.send({
            status: false,
            message: 'please upload image !'
        });
    }
    else {
      
      let image = req.files.image;   
   cloudinary.uploader.upload(image.tempFilePath, (result) => {
   const insertimage={
     image_url:result.url 
    };
    const decoded = jwt.decode(req.headers.token, process.env.SECRET_KEY);
    
    const {
       type,city,address,price,
    } = req.body;

    

    const {id,PhoneNumber,email,}=decoded.sub;
    const decodedData={id,PhoneNumber,email}
    const { error, value } = joi.validate(
      {
        type,
        city,
        address,
        price,
      },
      Schema.propertySchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const propaertydata = model.createproperty(req.body,decodedData,insertimage);
      return success(res,200,'property created successfully',propaertydata)
      
    }
  });
  }
}

  // update property function (patch)
  static updateproperty(req, res) {

    let image = req.files.image;   
   cloudinary.uploader.upload(image.tempFilePath, (result) => {
  
     result.url 
    
    
    const { id } = req.params;
    const {type,price} = req.body;
    const { error, value } = joi.validate(
      {
        type,
        price,
      },
      Schema.UpdateSchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const getproperty = model.findOne(id);
      if (getproperty) {
        (getproperty.type = type),(getproperty.price =price),(getproperty.image_url = result.url);
        return success(res,201,'property updated succesfully',getproperty)
      

      }
      else{
        return failed(res,400,"could not find that property")
    }
    }
  });
  }

  //mark a property as sold function
  static markproperty(req, res) {
    const { id } = req.params;
    const {status} = req.body;
    const { error, value } = joi.validate(
      {
        status,
      },
      Schema.markSchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const getproperty = model.findOne(id);
      if (getproperty) {
        (getproperty.status = status);
        return success(res,201,'property updated succesfully',getproperty)
      }
      else{
        return failed(res,400,"could not find that property")
        
    }
    }
  }

  // get property by id
  static getOneproperty(req, res) {
    const { id } = req.params;
    const findproperty = model.findOne(id);

    if (findproperty) {
      return res.status(200).json({
        status: 200,
        message: 'property found',
        findproperty,
      });
    }
    return failed(res,400,"could not find that property")
    
  }
//delete property function 
  static deleteproperty(req, res) {
    const { id } = req.params;
    const findloan = model.findproperty(id);
    if (findloan > -1) {
      model.deleteproperty(id);
     return res.status(200).json({
        status: 200,
        message:'property successfully deleted',
      });
    } else {
      return failed(res,400,"could not find that property")
      
    }
  }
}


export default PropertyController;
