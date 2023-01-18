const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

//create route
const profileRoute = require('./api/route/profile');
// const userRoute = require('./api/route/user');
const imgRoute = require('./api/route/img');

//mongo DB connection
const mongoDB = "mongodb://localhost:27017/matrimony"
mongoose.connect(mongoDB,(err) =>{
    if(err){
        console.log(`MongoDB is not conected`);
    }
    else{
        console.log(`MongoDB is Connect Successfully`);
    }
 });

//using bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('combined'));

//using cors policy
app.use(cors());


app.use('/profile',profileRoute);
// app.use('/user', userRoute);
app.use('/img',imgRoute);


//when wrong request hit
app.use((req,res,next )=>{
    res.status(404).json({
        error:'Bad Request'
    })
})




app.use((req,res,next)=>{
    res.status(200).json({
        type:"success",
        msg:`app is runinng on port 5000`,
        data: null,
    })
})




module.exports = app;