import moment from 'moment';
// Define a class for creating a property
class Property {
  constructor() {
    this.properties = [];
  }
  
  // Fetch type
  findall(query={}) {
    if(query.type){
    const propertytype = this.properties.find(oneproperty => oneproperty.type ===query.type);
    return propertytype;
    }
    
  }

  // Fetch Property by id
  findOne(PropertyId) {
    const foundproperty = this.properties.find(property => property.id === parseInt(PropertyId));
    return foundproperty;
  }

  //fecth a property to delete
  
  findproperty(propertyid) {
    const property = this.properties.findIndex(property => property.id === parseInt(propertyid));
    return property;
    
  }

  deleteproperty(id) {
    const findproperty = this.findOne(id);
    const indexof = this.properties.indexOf(findproperty);
    const deletedproperty = this.properties.splice(indexof, 1);
    return deletedproperty;
  }

  createproperty(data,userInfo,url) {
    const insertproperty = {
      id: this.properties.length + 1,
      created_On: moment.utc().format('DD-MM-YYYY HH:mm:ss'),
      owner: userInfo.id,
      ownerPhoneNumber: userInfo.phonenumber,
      ownerEmail: userInfo.email,
      status:'available',
      type: data.type,
      city: data.city,
      address: data.address,
      price: data.price,
      image_url:url.image_url, 
    };
    this.properties.push(insertproperty);
    return insertproperty;
  }
}


export default new Property();
