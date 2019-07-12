import joi from 'joi';
import flags from '../models/flags';
import Schema from '../helpers/inputvalidation';
import model from '../models/property';
import flag from '../models/flags';
import server from '../helpers/response';

class flagsController {

  static getflags(req, res) {
    return server(res,200,'List of all flags',flags)
    
  }
  
  // create flag function

  static createflags(req, res) {
    const { property_id } = req.params;
    const { reason,description} = req.body;
    const { error, value } = joi.validate(
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
      const getproperty = model.findOne(property_id);
      if (getproperty) {
        if (getproperty.status=='sold') {
          return server(res,400,'this property have been sold !')
        }
        const createdflag = flag.createflag(req.body, property_id);
        return server(res,200,'your flag have submit successfully ',createdflag)
      
      }
      else{
        return server(res,400,"that property doesn't exist")
      
    }
  }
}
  
  // get property flag by id
  static getOneflag(req, res) {
    const { id } = req.params;
    const getflag = flag.findOneflags(id);
    if (getflag.length>=1) {
      return server(res,200,'flag found',getflag)
     
    }
    else{
     return server(res,400,"no flag found with that property id")
  
  }
}

// get flag by id
static Oneflag(req, res) {
  const { id } = req.params;
  const findflag = flag.getOne(id);

  if (findflag) {
    return server(res,200,'flag found',findflag)
    
  }
  return server(res,400,"could not find that flag")

  
}


}


export default flagsController;
