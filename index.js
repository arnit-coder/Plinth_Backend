// Server side js
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose= require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session')

require('./passport-setup');

const app = express();

app.set('view engine', 'ejs');

//oauth work

// For an actual app you should configure this with an expiration time, better keys, proxy and secure
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/competetion',{useNewUrlParser:true}); 
// }

const usersSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User',usersSchema);

// const user1 = new User ({
//     name:"Ashu",
//     email:"asdf@gmail.com"
// })
// user1.save();



//register
app.get("/",(req,res)=>{
    res.render("oauth")
})
app.get('/failed', (req, res) => {
    res.send('You Failed to log in!')
})
// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) =>{
    res.render("profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})



// TeamCreation model

const teamSchema = new mongoose.Schema({
    teamName : String,
    email1 : String,  //Team leader email
    email2 : String,
    email3 : String,
    email4 : String, 
})

const Team = mongoose.model("Team", teamSchema)


// Registration model
const registerSchema = new mongoose.Schema({
    name : {type : String, required : true, },
    email : {type : String, required : true, unique : true},
    phoneNo : {type : String, required : true, unique : true},
    country : {type : String, required : true},
    city : {type : String, required : true},
    resedentialAddress : {type : String, required : true},
    instituteName : {type : String, required : true},
    instituteAddress : {type : String, required : true},
    instituteAreaPincode : {type : String, required : true},
    yearOfStudy : {type : Number, required : true},
})

const Register = mongoose.model("Register", registerSchema)


//competition
app.get("/competition",(req,res)=>{
    res.render("index");
})

app.post("/competition",async (req,res)=>{
    const NAME = req.body.userName;
    const EMAIL = req.body.userEmail;

    const userExists =await User.findOne({email:EMAIL});

    const user1 = new User ({
        name : NAME,
        email : EMAIL
    })

    if(userExists){
        console.log("user already exists");
    }else{
        user1.save();
    }

})

app.get('/create-team', (req, res) => {
    res.render('team')
})


app.post('/create-team', async (req,res) => {
try{
    const TEAMNAME = req.body.teamName;
    const EMAIL1 = req.body.email1;
    const EMAIL2 = req.body.email2;
    const EMAIL3 = req.body.email3;
    const EMAIL4 = req.body.email4;

    const team1 = new Team ({
        teamName : TEAMNAME,
        email1 : EMAIL1,
        email2 : EMAIL2,
        email3 : EMAIL3,
        email4 : EMAIL4,
    })

    const teamNameExists = await Team.findOne({teamName:TEAMNAME})
    if(!teamNameExists)
    {
        const email1Exists =await Team.findOne({email1:EMAIL1});
        const email2Exists =await Team.findOne({email2:EMAIL2});
        const email3Exists =await Team.findOne({email3:EMAIL3});
        const email4Exists =await Team.findOne({email4:EMAIL4});
        if(email1Exists && email2Exists && email3Exists && email4Exists)
        {
            console.log("Emails verified");
            team1.save();
        }
        else
        {
            console.log('One or more emails from your team are not registered')
        }
    }
    else{
        res.send('team name already exists')
    }
}

catch(e){
    console.log(e);
    res.send('ERROR')
}

})

app.get('/registration', (req, res) => {
    res.send('registration')
})

app.post('/registration', async (req, res) => {
    const NAME = req.body.fullName;
    const EMAIL = req.body.email;
    const PHONENO = req.body.phone;
    const COUNTRY = req.body.country;
    const CITY = req.body.city;
    const RESEDENTIALADDRESS = req.body.residentialAddress;
    const INSTITUTENAME = req.body.instituteName;
    const INSTITUTEADDRESS = req.body.instituteAddress;
    const INSTITUTEAREAPINCODE = req.body.institutePincode;
    const YEAROFSTUDY = req.body.yearOfStudy;

    const info1 = new Register({
        name : NAME,
        email : EMAIL,
        phoneNo : PHONENO,
        country : COUNTRY,
        city : CITY,
        resedentialAddress : RESEDENTIALADDRESS,
        instituteName : INSTITUTENAME,
        instituteAddress : INSTITUTEADDRESS,
        instituteAreaPincode : INSTITUTEAREAPINCODE,
        yearOfStudy : YEAROFSTUDY,
    })

    const userEmailExists = await User.findOne({email: EMAIL})
    const emailExists = await Register.findOne({email:EMAIL})
    if(userEmailExists)
    {
        if(emailExists)
        {
            res.send('Email already registered')
        }
        else{
            console.log('Succesfully registered')
            info1.save()
            res.redirect('/competitions')
        }
    }

})



app.listen(3000, function() {
    console.log("Server started on port 3000");
});
