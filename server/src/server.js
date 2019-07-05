import express from 'express';
import router from '../routes/routes';
import dotenv from "dotenv";
import _ from 'lodash'
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use(router);

// enable files upload
/*router.use(fileUpload({
  createParentPath: true,
  useTempFiles:true
}));

/*configure our cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_ID, 
  api_secret: process.env.API_SECRET 
});
*/
//add other middleware
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

/*app.post('/api/v1/image', (req, res) => {
  console.log(req.files)
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded!'
          });
      }
      else {
        ///Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let image = req.files.image;  
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
       // image.mv('./uploads/' + image.name, (err, result) => {;
     cloudinary.uploader.upload(image.tempFilePath, (result) => {
    res.send({
       message: 'File is uploaded',
       success:true,
       result: result.url
      });
       });
      }
      
      });
*/
   
  
app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Welcome to Property Pro Lite you can search properties for sale or rent!',
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Property Pro Lite  server On....'));

export default app;
