import moment from 'moment';
import queries from '../db/Queries';
import execute from '../src/connection';

// Define a class for creating a flag
class Flag {
  
  async fetchOne(propertyId) {
    const foundproperty =await execute(queries.findoneproperty,[propertyId]);
    return foundproperty;
  }

  async getOne(Id) {
    const oneflag =await execute(queries.getoneflags,[Id]);
    return oneflag;
  }
  // Fetch flag by id
  async findOneflags(flagId) {
    const foundflag = await execute(queries.findflags,[flagId]);
    return foundflag;
  }

  async createflag(data, propertyid) {
    const property = await this.fetchOne(parseInt(propertyid));
    const insertflag = {
      createdOn: moment.utc().format('DD-MM-YYYY HH:MM:SS'),
      property_id:property[0].id,
      reason:data.reason,
      description:data.description, 
    };

    const createflag = await execute(queries.insertflags,[
      insertflag.createdOn,
      insertflag.property_id,
      insertflag.reason,
      insertflag.description,
     
    ]);
    return createflag;
  }
}


export default new Flag();
