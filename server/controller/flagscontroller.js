import joi from 'joi';
import flags from '../models/flags';
import Schema from '../helpers/inputvalidation';
import model from '../models/property';
import flag from '../models/flags';


class flagsController {

  static getflags(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'List of all flags',
      flags,
    });
  }
  
  // create flag function

  static createflags(req, res) {
    const { property_id } = req.params;
    const { reason,description} = req.body;
    const { error, value } = joi.validate(
      {
        reason,description,
      },
      Schema.flagSchema,
    );
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const getproperty = model.findOne(property_id);
      if (getproperty) {
        if (getproperty.status=='sold') {
          return res.status(400).json({
            status: 400,
            message: 'this property have been sold !',
          });
          
        }
        const createdflag = flag.createRepayments(req.body, property_id);
        return res.status(200).json({
          status: 200,
          message: 'your flag have submit successfully ',
          createdflag,
        });
      }
      else{
      return res.status(400).json({
        status: 400,
        message: "that property doesn't exist",
      });
    }
  }
}
  
  // get property flag by id
  static getOneflag(req, res) {
    const { id } = req.params;
    const getflag = flag.findOneflags(id);
    if (getflag.length>=1) {
       return res.status(200).json({
        status:200, 
        message: 'flag found',
        getflag,
      });
    }
    else{
    res.status(400).json({
      status: 400,
      error: 'no flag found with that property id',
    });
  }
}

// get flag by id
static Oneflag(req, res) {
  const { id } = req.params;
  const findflag = flag.getOne(id);

  if (findflag) {
    return res.status(200).json({
      status: 200,
      message: 'flag found',
      findflag,
    });
  }
  res.status(400).json({
    status: 400,
    error: 'could not find that flag',
  });
  
}


}


export default flagsController;
