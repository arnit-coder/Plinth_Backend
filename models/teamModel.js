const mongoose = require('mongoose')

// TeamCreation model

const teamSchema = new mongoose.Schema({
    teamName : String,
    email1 : String,  //Team leader email
    email2 : String,
    email3 : String,
    email4 : String, 
})

const Team = mongoose.model("Team", teamSchema)
module.exports = Team;