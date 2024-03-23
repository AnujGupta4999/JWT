const express = require('express');
// const router = express.Router();

const router = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();
const { connect }= require('./config/dbconnection');

require('dotenv').config();
require('./model/userSchema');

const PORT = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use('/api/v1', router);


connect().then(() => {
        // Start the server after successful connection
        app.listen(PORT, () => {
            console.log(`Server is running on port mongo ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
    });


// app.listen(PORT, ()=>{
//   console.log(`Server is running on port  server ${PORT}`);
// })


