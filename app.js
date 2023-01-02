const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



//create route
const profileRoute = require('./api/route/profile');
const userSignupRoute = require('./api/route/userSignup');


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

app.use('/profile',profileRoute);
app. use('/userSignup', userSignupRoute);



//when wrong request hit
app.use((req,res,next )=>{
    res.status(404).json({
        error:'Bad Request'
    })
})


app.use((req,res,next)=>{
    res.status(200).json({
        msg:`app is runinng on port 5000`
    })
})




module.exports = app;