//create models here
const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User',usersSchema);