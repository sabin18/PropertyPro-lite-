import execute from '../src/connection';

const sqlQueries = {};

const tables = `
               CREATE TABLE IF NOT EXISTS users(
                  id SERIAL PRIMARY KEY,
                  email VARCHAR(128)  UNIQUE NOT NULL,
                  firstname VARCHAR(128) NOT NULL,
                  lastname VARCHAR(128) NOT NULL,
                  phonenumber VARCHAR(255) NOT NULL,
                  password VARCHAR(255) NOT NULL,
                  address VARCHAR(255) NOT NULL,
                  status VARCHAR(255) NOT NULL,
                  isadmin VARCHAR(255) NOT NULL
                  );
                  
                  
                  CREATE TABLE IF NOT EXISTS property(
                    id SERIAL PRIMARY KEY,
                    created_on VARCHAR NOT NULL,
                    owner INTEGER REFERENCES users(id) NOT NULL,
                    ownerphonenumber INTEGER NOT NULL,
                    owneremail VARCHAR(128) REFERENCES users(email)  NOT NULL,
                    status VARCHAR(128) NOT NULL,
                    type VARCHAR(128) NOT NULL,
                    city VARCHAR(128) NOT NULL,
                    address VARCHAR(128) NOT NULL,
                    price INTEGER NOT NULL,
                    description VARCHAR(128) NOT NULL,
                    image_url VARCHAR(128) NOT NULL
                   
                    
                    );


                CREATE TABLE IF NOT EXISTS flags(
                  id SERIAL PRIMARY KEY,
                  createdon VARCHAR,
                  property_id INTEGER REFERENCES property(id) NOT NULL,
                  reason VARCHAR(128) NOT NULL,
                  description VARCHAR(128) NOT NULL
                  );


                  
                    
`;


sqlQueries.tables = tables;
 execute(tables);

 export default sqlQueries;
