const mongoose = require('mongoose');


//define mongoose scehma

//here user profile details
userSignupSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    phone: Number,
    password: String,
    userType:String

})

module.exports = mongoose.model('userSignup',userSignupSchema);