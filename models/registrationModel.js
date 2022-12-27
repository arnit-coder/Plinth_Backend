// Registration model
const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name : {type : String, required : true, },
    email : {type : String, required : true, unique : true},
    phoneNo : {type : String, required : true, unique : true},
    country : {type : String, required : true},
    city : {type : String, required : true},
    residentialAddress : {type : String, required : true},
    instituteName : {type : String, required : true},
    instituteAddress : {type : String, required : true},
    instituteAreaPincode : {type : String, required : true},
    yearOfStudy : {type : Number, required : true},
})

const Register = mongoose.model("Register", registerSchema)
module.exports = Register;