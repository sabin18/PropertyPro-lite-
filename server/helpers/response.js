

const failed = (res, status, error) => res.status(status).send({ status, error });

const success = (res, status, message,data) => res.status(status).send({ status, message,data});

const successfull = (res, status, message,data) => res.status(status).send({ status, message});

export default {failed,success,successfull};