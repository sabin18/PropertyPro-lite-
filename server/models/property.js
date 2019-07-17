import moment from 'moment';
import queries from '../db/queries';
import execute from '../src/connection';

// Define a class for creating a property
class Property {
  
  // Fetch type
  async findall(query={}) {
    if(query.type){
    const propertytype = await execute(queries.findtype,[query.type]);
    return propertytype;
    }
    
  }

  async update(type,price,image_url,id) {
    const propertytype = await execute(queries.updateproperty,[type,price,image_url,id]);
    return propertytype;
   
  }

  async MarkAsSold(status,id) {
    const sold = await execute(queries.mark,[status,id]);
    return sold;
   
  }
  // Fetch Property by id
  async findOne(PropertyId) {
    const foundproperty = await execute(queries.findoneproperty,[PropertyId]);
    return foundproperty;
  }

  //fecth a property to delete
  async deleteproperty(id) {
    const deletedprop =  await execute(queries.deletepro,[id]);
    return deletedprop;
  }

  async createproperty(data,userInfo,url) {
    const insertproperty = {
      created_On: moment.utc().format('DD-MM-YYYY HH:mm:ss'),
      owner: userInfo.id,
      ownerPhoneNumber: userInfo.phonenumber,
      ownerEmail: userInfo.email,
      status:'available',
      type: data.type,
      city: data.city,
      address: data.address,
      price: data.price,
      image_url: url.image_url, 
    };
    const insert = await execute(queries.insertproperty, [
      insertproperty.created_On,
      insertproperty. owner,
      insertproperty.ownerPhoneNumber,
      insertproperty.ownerEmail,
      insertproperty.status,
      insertproperty.type,
      insertproperty.city,
      insertproperty.address,
      insertproperty.price, 
      insertproperty.image_url,  
    ]);
    return insert;
    
  }
}


export default new Property();
