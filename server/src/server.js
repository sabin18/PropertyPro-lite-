import express from 'express';
import router from '../routes/routes';
import dotenv from "dotenv";
import _ from 'lodash'
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use(router);
    
app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Welcome to Property Pro Lite you can search properties for sale or rent!',
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Property Pro Lite  server On....'));

export default app;
