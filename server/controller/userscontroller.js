import passwordHash from 'password-hash';
import joi from 'joi';
import authentication from '../helpers/authentication';
import users from '../models/user';
import mymodel from '../models/user';
import Schema from '../helpers/inputvalidation';
import server from '../helpers/response';


class userController {
  static createUser(req, res) {
    const {
      email, firstname, lastname, password,phonenumber, address, isadmin,
    } = req.body;
    const { error, value } = joi.validate(
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
      const id = parseInt(mymodel.users.length) + 1;
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
      const checkemail= mymodel.userEmail(email); 
      if (checkemail) {
        return server(res,400,'email already exist please use another email!')
      }
      mymodel.signupuser(req.body);

      res.status(201).send({
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

  static getuser(req, res) {
    return server(res,200,'List of all users',users)
    
  }

  // get user by id
  static getOneuser(req, res) {
    const { id } = req.params;
    const user = mymodel.getuser(id);
    if (user) {
      return server(res,200,'one user found ',user)
    }
    else{
      return server(res,400,'No user found with that id')
    } 
  }


  // Login functions
  static login(req, res) {
    const { email, password } = req.body;
    const specificUser = mymodel.userEmail(email);
    if (!specificUser) {
      return server(res,400,'No user with that email !')
    } if (specificUser) {
      if (passwordHash.verify(password,specificUser.password)) {
        const {
          firstname, lastname,phonenumber, email, password, isadmin,
        } = specificUser;
        const user = {
          firstname,
          lastname,
          email,
          phonenumber,
          password,
          status:'login',
          isadmin: specificUser.isadmin,
          id: specificUser.id,
        };
        const token = authentication.encodeToken(user);
        res.status(200).send({
          message: 'Logged in successfully',
          token,
          id: specificUser.id,
          firstname,
          lastname,
          phonenumber,
          email,
          status:user.status,
          isadmin,


        });
      } else {
        res.status(400).send({ error: 'incorrect Password !' });
      }
    }
  }

  // change password function 
  static resetpassword(req, res) {
    const { email,newpassword } = req.body;
    const { error, value } = joi.validate(
      {
        email,
        newpassword,
      },
      Schema.resetpassSchema,{ abortEarly: false },
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
      } else {
      const getuser = mymodel.userEmail(email);
      if (getuser) {
        (getuser.password = mymodel.setPassword(newpassword));
        return server(res,201,"password updated  succesfully")
      }
      return server(res,400,"can't find user with that email")
    }
    
  }
}


export default userController;
