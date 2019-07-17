import passwordHash from 'password-hash';
import joi from 'joi';
import authentication from '../helpers/authentication';
import queries from '../db/Queries';
import execute from '../src/connection';
import mymodel from '../models/user';
import Schema from '../helpers/inputvalidation';
import response from '../helpers/response';


class userController {
  static async createUser(req, res) {
    const {
      email, firstname, lastname, password,phonenumber, address, isadmin,
    } = req.body;
    const { error} = joi.validate(
      {
        email,
        firstname,
        lastname,
        phonenumber,
        password,
        address,
       
      },
      Schema.userSchema,{ abortEarly: false },
      );
      const arrErrors = [];
      const Validatelist = () => {
        for (let i = 0; i < error.details.length; i++) {
          arrErrors.push(error.details[i].message);
        }
      };
      if (error) {
        `${Validatelist()}`;
        if (error) return res.status(400).json({ status: 400, error: arrErrors });
      }else {
      // generate the id and pass it to a user
      const getallusers = await execute(queries.alluser);
      const id = parseInt(getallusers.length) + 1;
      const token = authentication.encodeToken({
        email,
        firstname,
        lastname,
        password,
        address,
        phonenumber,
        userId: id,
        status: 'Not login',
        isadmin:'false',
      }); 
      const checkemail= await mymodel.userEmail(email); 
      if (checkemail.length!=0) {
        return response.error(res,400,'email already exist please use another email!')
      }
      mymodel.signupuser(req.body);

      res.status(201).send({
        status:'201',
        message: 'user registered successfully',
        user: {
          token,
          id,
          firstname,
          lastname,
          email,
          phonenumber,
          isadmin,
        },
      });
    }
  }

  static async  getuser(req, res) {
    const users = await mymodel.getusers()
    return response.success(res,200,'List of all users',users)
    
  }

  // get user by id
  static async  getOneuser(req, res) {
    const { id } = req.params;
    const user = await mymodel.getuser(id);
    if (user.length!=0) {
      return response.success(res,200,'one user found ',user)
    }
    else{
      return response.error(res,404,'No user found with that id')
    } 
  }

  // Login data processing
  static async login(req, res) {
    const { email, password } = req.body;
    const specificUser =await mymodel.userEmail(email);

    if (specificUser.length==0) {
      return response.error(res,404,'No user with that email !')
    } else {
      if (passwordHash.verify(password,specificUser[0].password)) {
        const {
          firstname, lastname,phonenumber, email, password, isadmin,
        } = specificUser[0];
        const user = {
          firstname,
          lastname,
          phonenumber:specificUser[0].phonenumber,
          email,
          password,
          status:'login',
          isadmin: specificUser[0].isadmin,
          id: specificUser[0].id,
        };
        const token = authentication.encodeToken(user);
        return res.status(200).send({
          status:'200',
          message: 'Logged in successfully ',
          token,
          id: specificUser.id,
          firstname,
          lastname,
          phonenumber,
          email,
          status: specificUser.status,
          isadmin,


        });
      } else {
        return response.error(res,401,'incorrect Password !') 
      }
    }
  }


  // change password function  
  static async resetpassword(req, res) {
    const { email,newpassword } = req.body;
    const { error } = joi.validate(
      {
        email,
        newpassword,
      },
      Schema.resetpassSchema,{ abortEarly: false }
    );
    const arrErrors = [];
    const Validatelist = () =>{
      for (let i = 0; i < error.details.length; i++) {
        arrErrors.push(error.details[i].message);
      }
    }
    if (error) {
      `${Validatelist ()}`;
      if (error) return res.status(400).json({ status: 400, errors: arrErrors });
    } else {
      const getuser =await mymodel.userEmail(email);
      if (getuser.length!=0) {
        await execute(queries.resetpassword,[await mymodel.setPassword(newpassword),email]);
        return response.success(res,201,"password updated  succesfully")
      }
     
    }
    return response.error(res,404,"can't find user with that email") 
  }
}


export default userController;
