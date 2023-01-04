const mongoose = require('mongoose')

// TeamCreation model

const teamSchema = new mongoose.Schema({
    teamName : String,
    email1 : String,  //Team leader email
    email2 : String,
    email3 : String,
    email4 : String,
    email5 : String,
    email6 : String,
    email7 : String,
    email8 : String,
    email9 : String,
    email10 : String, 
})

const Team = mongoose.model("Team", teamSchema)
module.exports = Team;