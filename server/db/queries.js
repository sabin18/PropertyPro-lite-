import execute from '../src/connection';

const sqlQueries = {};

//insert loans into the database
const getproperty = 'SELECT * FROM property';
const insertproperty = 'INSERT INTO property (created_on,owner,ownerphonenumber,owneremail,status,type,city,address,price,image_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING * ';
const findoneproperty=  'SELECT * FROM property WHERE id =$1';
const findtype=  'SELECT * FROM property WHERE type =$1';
const updateproperty=  'UPDATE property SET type = $1, price = $2, image_url = $3 WHERE id = $4 RETURNING *';
const deletepro='DELETE FROM property WHERE id =$1';
const mark = 'UPDATE property SET status = $1 WHERE id = $2 RETURNING * ';


sqlQueries.getproperty = getproperty;
sqlQueries.insertproperty = insertproperty;
sqlQueries.findtype = findtype;
sqlQueries.findoneproperty = findoneproperty;
sqlQueries.deletepro = deletepro;
sqlQueries.updateproperty = updateproperty;
sqlQueries.mark = mark;

//insert user into database
const insertuser = 'INSERT INTO users (email,firstname,lastname,phonenumber,password,address,status,isadmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ';
const checkuser = 'SELECT * FROM users WHERE email =$1';
const alluser = 'SELECT * FROM users ';
const findoneuser=  'SELECT * FROM users WHERE id =$1';
const resetpassword = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING * ';


sqlQueries.insertuser = insertuser;
sqlQueries.checkuser = checkuser;
sqlQueries.alluser = alluser;
sqlQueries.findoneuser = findoneuser;
sqlQueries.resetpassword = resetpassword;

//insert user into database
const findflags= 'SELECT * FROM flags WHERE property_id =$1';
const insertflags = 'INSERT INTO flags (createdon,property_id,reason,description) VALUES($1,$2,$3,$4) RETURNING * ';
const getall= 'SELECT * FROM flags';
const getoneflags= 'SELECT * FROM flags WHERE id =$1 ';

sqlQueries.findflags = findflags;
sqlQueries.insertflags = insertflags;
sqlQueries.getall=getall;
sqlQueries.getoneflags =getoneflags;


export default sqlQueries;
