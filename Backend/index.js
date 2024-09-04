const express = require('express');
const cors = require("cors");
const path = require('path'); 
const mongoose = require('mongoose');
require('dotenv').config();
const db_uri = process.env.MONGODB_URL;
console.log(db_uri)
mongoose.connect(db_uri).then(()=>{console.log("connection done")});
const app = express();
var bodyParser = require('body-parser'); 
const User = require('./models/user_model')

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

//importing routes
const newUpload = require('./routes/newUpload')
const showPhotoes = require('./routes/showPhotoes')
const UserLoginRegister = require('./routes/UserLoginRegister')
//routers
app.use('/image/assets', express.static(path.join(__dirname, 'assets')));
app.use('/image/newUpload',newUpload)
app.use('/image/showPhotoes',showPhotoes)
app.use('/image/user',UserLoginRegister)

const port = process.env.PORT || 8001;
app.listen(port,()=>{
    console.log(`image portal server running on port ${port}`)
});