import queries from '../db/Queries';
import execute from '../src/connection';
import passwordHash from 'password-hash';

// Define a class for creating a user
class user {

  async userEmail(data) {
    const findemail = await execute(queries.checkuser,[data]);
    return findemail;
  }
  
  async getusers() {
    const users = await execute(queries.alluser);
    return users;
  }
  
 async signupuser(info) {
    const insertuser = {
      firstname: info.firstname,
      lastname: info.lastname,
      PhoneNumber:info.phonenumber,
      email: info.email,
      password:this.setPassword(info.password),
      address : info.address,
      status: 'Not login',
      isadmin: 'false',
  

    };
    const insertuserdata = await execute(queries.insertuser, [
      insertuser.email,
      insertuser.firstname,
      insertuser.lastname,
      insertuser.PhoneNumber,
      insertuser.password,
      insertuser.address,
      insertuser.status,
      insertuser.isadmin,
           
    ]);
    return insertuserdata;
  }

  // define a function to hash the password.
  setPassword(password) {
    const hashedPassword = passwordHash.generate(password);
    // hash the password
    return (this.password = hashedPassword);
  }
 
  async getuser(id) { 
    const finduser = await execute(queries.findoneuser,[id]);
    return finduser;
  }

}


export default new user();
