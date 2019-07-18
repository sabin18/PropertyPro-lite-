import jwt from 'jwt-simple';
import joi from 'joi';
import Schema from '../helpers/inputvalidation';
import model from '../models/property';
import cloudinary from 'cloudinary';
import dotenv from "dotenv";
import queries from '../db/queries';
import execute from '../src/connection';
import response from '../helpers/response';
dotenv.config();

/*configure our cloudinary*/
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_ID, 
  api_secret: process.env.API_SECRET 
});

class PropertyController { 
//get properties function
  
   static async GetPropertyType(req, res) {
    const {type}=req.query;
    const { error } = joi.validate(
      {
        type,
      },
      Schema.UpdateSchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const checkproperty= await model.findall(req.query);
     
    if(!type)
    {
      const properties= await execute(queries.getproperty);
      return response.success(res,200,'List of all properties',properties)
      
    }
    if (checkproperty.length!=0) {
      return response.success(res,200,'List of properties',checkproperty)
      
    }
    else{
      return response.error(res,404,"can't find any property")
    
  }
  }
}

// create  property function
   static async createproperty(req, res) {
    if(!req.files) {
      return response.error(res,404,"please upload image !")
    }
    else {
      
      let image = req.files.image;   
   cloudinary.uploader.upload(image.tempFilePath, async (result) => {
   const insertimage={
     image_url:result.url 
    };
    const decoded = jwt.decode(req.headers.token, process.env.SECRET_KEY);
    
    const {
       type,city,address,price,description,
    } = req.body;


    const {id,phonenumber,email,}=decoded.sub;
    const decodedData={id,phonenumber,email}
    const { error} = joi.validate(
      {
        type,
        city,
        address,
        price,
        description,
      },
      Schema.propertySchema, { abortEarly: false },
      );
      const arrErrors = [];
      const Validatelist = () => {
        for (let i = 0; i < error.details.length; i++) {
          arrErrors.push(error.details[i].message);
        }
      };
      if (error) {
        `${Validatelist()}`;
        if (error) return res.status(400).json({ status: 400, errors: arrErrors });
      } else  {
      const checkproperty = await model.findproperty(description);
      if(checkproperty.length!=0){
        return response.error(res,409,"property aleardy exist")
      }else{
      const propertydata = await model.createproperty(req.body,decodedData,insertimage);
      return response.success(res,201,'property created successfully',propertydata)
      
    } 
  }
  });
  }
  
}

  // update property function (patch)
   static async updateproperty(req, res) {

    let image = req.files.image;   
   cloudinary.uploader.upload(image.tempFilePath,async  (result) => {
  
     result.url 
    
    
    const { ID } = req.params;
    const {type,price} = req.body;
    const decoded = jwt.decode(req.headers.token, process.env.SECRET_KEY);
    const {id}=decoded.sub;
    const { error} = joi.validate(
      {
        type,
        price,
        ID
      },
      Schema.UpdateSchema, { abortEarly: false },
      );
      const arrErrors = [];
      const Validatelist = () => {
        for (let i = 0; i < error.details.length; i++) {
          arrErrors.push(error.details[i].message);
        }
      };
      if (error) {
        `${Validatelist()}`;
        if (error) return res.status(400).json({ status: 400, errors: arrErrors });
      }  else {
      const getproperty = await model.findOne(ID);
      if (getproperty.length!=0) {
        if(getproperty[0].owner!=id)
      {
        return response.error(res,403,"you are not allowed to update this property")
      }
      else{
         await model.update(type,price,result.url,ID);
        const updatedproperty=  await model.findOne(ID);
        return response.success(res,200,'property updated succesfully',updatedproperty)
      }
    }
      else{
        return response.error(res,404,"could not find that property")
    }

  }
  });
  }

  //mark a property as sold function
   static async markproperty(req, res) {
    const { ID } = req.params;
    const {status} = req.body;
     const decoded = jwt.decode(req.headers.token, process.env.SECRET_KEY);
     const {id}=decoded.sub;
    const { error} = joi.validate(
      {
        status,
        ID,
      },
      Schema.markSchema, { abortEarly: false },
      );
      const arrErrors = [];
      const Validatelist = () => {
        for (let i = 0; i < error.details.length; i++) {
          arrErrors.push(error.details[i].message);
        }
      };
      if (error) {
        `${Validatelist()}`;
        if (error) return res.status(400).json({ status: 400, errors: arrErrors });
      } else{
        const getproperty = await model.findOne(ID);
        if (getproperty.length!=0) {
          if(getproperty[0].owner!=id)
          {
            return response.error(res,403,"you are not allowed to update this property")
          }
          else{
        model.MarkAsSold(status,ID);
        const getmarked = await model.findOne(ID);
        return response.success(res,200,'property updated succesfully',getmarked)
      }
    }
      else{
        return response.error(res,404,"could not find that property")
        
    }
    }
    
  }

  // get property by id
   static async getOneproperty(req, res) {
    const { ID } = req.params;
    const { error} = joi.validate(
      {
        ID,
      },
      Schema.parmSchema, { abortEarly: false },
      );
      const arrErrors = [];
      const Validatelist = () => {
        for (let i = 0; i < error.details.length; i++) {
          arrErrors.push(error.details[i].message);
        }
      };
      if (error) {
        `${Validatelist()}`;
        if (error) return res.status(400).json({ status: 400, errors: arrErrors });
      } else{
    const findproperty = await model.findOne(ID);
    if (findproperty.length!=0) {
      return response.success(res,200,'property found',findproperty)
    }
    return response.error(res,404,"could not find that property")
    
  }
}
//delete property function 
   static async deleteproperty(req, res) {
    const { ID } = req.params;
    const { error} = joi.validate(
      {
        ID,
      },
      Schema.parmSchema, { abortEarly: false },
      );
      const arrErrors = [];
      const Validatelist = () => {
        for (let i = 0; i < error.details.length; i++) {
          arrErrors.push(error.details[i].message);
        }
      };
      if (error) {
        `${Validatelist()}`;
        if (error) return res.status(400).json({ status: 400, errors: arrErrors });
      } else{
    const decoded = jwt.decode(req.headers.token, process.env.SECRET_KEY);
     const {id}=decoded.sub;
    const findloan = await model.findOne(ID);
    if (findloan.length!=0) {
      if(findloan[0].owner!=id)
          {
            return response.error(res,403,"you are not allowed to delete this property")
          }
          else{
      model.deleteproperty(ID);
      return response.success(res,200,"property successfully deleted")
          }
    } else {
      return response.error(res,404,"could not find that property")
      
    }
  }
}
}

export default PropertyController;
