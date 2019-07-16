import dotenv from 'dotenv';
import { Pool } from 'pg';
import 'babel-polyfill';
// Use dotenv to configure the environment variables
// You need to put all environment variables in the .env file like passwords, PGDatabase.
dotenv.config();
// instantiate the connection string
// const connectionString
let pool;
if(process.env.NODE_ENV==='production'){
  pool=new Pool({connectionString: process.env.DATABASE_URL});
}

if(process.env.NODE_ENV==='test'){

  pool=new Pool({connectionString:DATABASE_TEST_URL});
}else{
  pool = new Pool({connectionString: process.env.DATABASE_URL});
}
const connect = async () => pool.connect();
// use async for a function that will have to wait for another one to complete.
const execute = async (sql, data = []) => {
  const connection = await connect();
  try {
    // wait for the query using await
    const result = await connection.query(sql, data);
    return result.rows;
  } catch (error) {
    // Error handling
    console.log(error.message);
  } finally {
    // close the pool or the databasee
    connection.release();
  }
};
export default execute;