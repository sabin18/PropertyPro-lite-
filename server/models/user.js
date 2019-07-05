
import passwordHash from 'password-hash';

// Define a class for creating a user
class user {
  constructor() {
    this.users = [

     {
    id: 1,
    email: 'mugabe@gmail.com',
    firstname: 'kwizera',
    lastname: 'kivin',
    password: 'sha1$db1129e7$1$14d8764a1910de685c04cefc47bd265667780921',
    address: 'kigali',
    PhoneNumber:'0789765444',
    status: 'Not login',
    isadmin: 'true',
     }
    ];
  }

  userEmail(data) {
    const findemail = this.users.find(oneusers => oneusers.email === data);
    return findemail;
  }
  
  signupuser(info) {
    const insertuser = {
      id: this.users.length + 1,
      firstname: info.firstname,
      lastname: info.lastname,
      PhoneNumber:info.PhoneNumber,
      email: info.email,
      password:this.setPassword(info.password),
      address : info.address,
      status: 'Not login',
      isadmin: 'false',
  

    };
    this.users.push(insertuser);
    return insertuser;
  }

  // define a function to hash the password.
  setPassword(password) {
    const hashedPassword = passwordHash.generate(password);
    // hash the password
    return (this.password = hashedPassword);
  }
  getuser(id) {
    const finduser = this.users.find(fetchusers => fetchusers.id == id);
    return finduser;
  }

}


export default new user();
