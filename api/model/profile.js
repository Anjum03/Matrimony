const mongoose = require('mongoose');
//define mongoose scehma
//here user profile details
const matrimonySchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userName:{
        type: String,
        required: true
    },
    
    email:{
        type: String,
        unique: true,
        required: true
    },
    phone:{
        type: Number,
        unique: true,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        default: Date.now,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    caste:{
        type:String,
        required: true
    },
    subCaste:{
        type:String
        
    }


})
module.exports = mongoose.model('Matrimony',matrimonySchema);