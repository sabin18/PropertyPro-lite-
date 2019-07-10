import moment from 'moment';
import properties from './property';

// Define a class for creating a flag
class Flag {
  constructor() {
    this.flags = [];
  }

  fetchOne(propertyId) {
    const foundproperty =properties.findOne(propertyId);
    return foundproperty;
  }
  getOne(Id) {
    const oneflag =this.flags.find(flag => flag.id === parseInt(Id));
    return oneflag;
  }

  // Fetch flag by id
  findOneflags(flagId) {
    const foundflag = this.flags.filter(flag => flag.property_id === parseInt(flagId));
    return foundflag;
  }

  createflag(data, propertyid) {
    const property = this.fetchOne(parseInt(propertyid));
    const insertflag = {
      id: this.flags.length + 1,
      createdOn: moment.utc().format('DD-MM-YYYY HH:MM:SS'),
      property_id:property.id,
      reason:data.reason,
      description:data.description,
      

    };
    this.flags.push(insertflag);
    return insertflag;
  }
}


export default new Flag();
