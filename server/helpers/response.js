
const success = (res,status,message,data) => res.status(status).send({ status,message,data});
const error = (res,status,error) => res.status(status).send({status,error});
 
export default {success,error}

