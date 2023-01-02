const mongoose = require('mongoose');


//define mongoose scehma

//here user profile details
const matrimonySchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email: String,
    phone: Number,
    password: String

})

module.exports = mongoose.model('Matrimony',matrimonySchema);