import joi from 'joi';
import Schema from '../helpers/inputvalidation';
import model from '../models/property';
import flag from '../models/flags';
import server from '../helpers/response';
import execute from '../src/connection';
import queries from '../db/Queries';

class flagsController {

  static async getflags(req, res) {
    const flags = await execute(queries.getall);
    return server(res,200,'List of all flags',flags)
    
  }
  // create flag function
  static async createflags(req, res) {
    const { property_id } = req.params;
    const { reason,description} = req.body;
    const {error} = joi.validate(
      {
        reason,description,
      },
      Schema.flagSchema, { abortEarly: false },
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
      const getproperty = await model.findOne(property_id);
      if (getproperty.length!=0) {
        if (getproperty[0].status=='sold') {
          return server(res,400,'this property have been sold !')
        }
        const createdflag =await flag.createflag(req.body, property_id);
        return server(res,200,'your flag have submit successfully ',createdflag)
      
      }
      else{
        return server(res,400,"that property doesn't exist")
      
    }
  }
}
  
  // get property flag by id
  static async getOneflag(req, res) {
    const { id } = req.params;
    const getflag = await flag.findOneflags(id);
    if (getflag.length!=0) {
      return server(res,200,'flag found',getflag)
     
    }
    else{
     return server(res,400,"no flag found with that property id")
  
  }
}

// get flag by id
static async Oneflag(req, res) {
  const { id } = req.params;
  const findflag = await flag.getOne(id);

  if (findflag.length!=0) {
    return server(res,200,'flag found',findflag)
    
  }
  return server(res,400,"could not find that flag")

  
}


}


export default flagsController;
