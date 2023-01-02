const dotenv = require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose= require('mongoose');
const passport = require('passport');
const cors = require('cors')
const cookieSession = require('cookie-session')
const Register = require('./models/registrationModel')
const userModel = require('./models/userModel')
const Team = require('./models/teamModel')
const session = require('express-session')

require('./passport-setup');

const app = express();

function isLoggedIn(req, res, next) {
    console.log(req.user)
    console.log(req.user.picture)
    console.log(req.user.name.givenName)
    req.user ? next() : res.sendStatus(401);
  }


app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());  

app.use(
	cors({
		origin: "http://localhost:3001",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.set('view engine', 'ejs');



// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public"));
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



    const db = 'mongodb://localhost:27017/auth'
    mongoose.connect(
      db,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,

      },
      (error) => {
        if (error) console.log(error)
      }
    )




//register
app.get('/', (req, res) => {
    res.send('<a href="/auth/google"><h1>Authenticate with Google</h1></a>');
  });


app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
  ));



    app.post('/send-user-data', async(req, res)=>{
        const ID = req.user.id;
        const EMAIL = req.user.email;
        const FIRSTNAME = req.user.name.givenName;
        const LASTNAME = req.user.name.familyName;
        const PROFILEPHOTO = req.user.picture;
        
        const user1 = new userModel({
            id : ID,
            email : EMAIL,
            firstName : FIRSTNAME,
            lastName : LASTNAME,
            profilePhoto : PROFILEPHOTO,
        })
        const emailExists = await userModel.findOne({email : EMAIL})
        if(!emailExists)
        {
            console.log(user1);
            user1.save();
        }
        else{
            console.log("EMAIL ALREADY EXISTS")
            res.send('details saved')
        }
            
    })




  app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });
  





app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: 'http://localhost:3001/competitions',
    failureRedirect: '/auth/google/failure'
  })
);



app.get('/protected', isLoggedIn, (req, res) => {
    // let username=req.user.given_name+" "+req.user.family_name
    // let useremail=req.user.sub
    res.send(req.user)
    // res.redirect(`http://localhost:3001/competitions/${username}/${useremail}`)
  });


app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect(`http://localhost:3001/`)
 });




app.get('/create-team', (req, res) => {
    res.send('Create a team')
})



app.post('/create-team', urlencodedParser,async (req,res) => {
    try{
        const TEAMNAME = req.body.teamName;
        const EMAIL1 = req.body.email1;
        const EMAIL2 = req.body.email2;
        const EMAIL3 = req.body.email3;
        const EMAIL4 = req.body.email4;
        const EMAIL5 = req.body.email5;
        const EMAIL6 = req.body.email6;
        const EMAIL7 = req.body.email7;
        const EMAIL8 = req.body.email8;
        const EMAIL9 = req.body.email9;
        const EMAIL10 = req.body.email10;
    
        const team1 = new Team ({
            teamName : TEAMNAME,
            email1 : EMAIL1,
            email2 : EMAIL2,
            email3 : EMAIL3,
            email4 : EMAIL4,
            email5 : EMAIL5,
            email6 : EMAIL6,
            email7 : EMAIL7,
            email8 : EMAIL8,
            email9 : EMAIL9,
            email10 : EMAIL10,
        })
    
        const teamNameExists = await Team.findOne({teamName:TEAMNAME})
        if(!teamNameExists)
        {
            const email1Existsss = await Register.findOne({email:EMAIL1});
            const email2Existsss = await Register.findOne({email:EMAIL2});
            const email3Existsss = await Register.findOne({email:EMAIL3});
            const email4Existsss = await Register.findOne({email:EMAIL4});
            const email5Existsss = await Register.findOne({email:EMAIL5});
            const email6Existsss = await Register.findOne({email:EMAIL6});
            const email7Existsss = await Register.findOne({email:EMAIL7});
            const email8Existsss = await Register.findOne({email:EMAIL8});
            const email9Existsss = await Register.findOne({email:EMAIL9});
            const email10Existsss = await Register.findOne({email:EMAIL10});
            const email1Exists =await Team.findOne({email1:EMAIL1});
            const email2Exists =await Team.findOne({email2:EMAIL2});
            const email3Exists =await Team.findOne({email3:EMAIL3});
            const email4Exists =await Team.findOne({email4:EMAIL4});
            const email5Exists =await Team.findOne({email5:EMAIL5});
            const email6Exists =await Team.findOne({email6:EMAIL6});
            const email7Exists =await Team.findOne({email7:EMAIL7});
            const email8Exists =await Team.findOne({email8:EMAIL8});
            const email9Exists =await Team.findOne({email9:EMAIL9});
            const email10Exists =await Team.findOne({email10:EMAIL10});
            if(email1Existsss&&email2Existsss&&email3Existsss&&email4Existsss&&email5Existsss&&email6Existsss&&email7Existsss&&email8Existsss&&email9Existsss&&email10Existsss)
            {
                if(email1Exists && email2Exists && email3Exists && email4Exists && email5Exists && email6Exists && email7Exists && email8Exists)
                {
                    console.log("Emails verified");
                    team1.save();
                }
                else if(email1Exists && email2Exists && email3Exists && email4Exists && email5Exists && email6Exists && email7Exists)
                {
                    console.log("Team consists 7 members. All emails verified")
                    team1.save();
                }
                else if(email1Exists && email2Exists && email3Exists && email4Exists && email5Exists && email6Exists)
                {
                    console.log("Team consists 6 members. All emails verified")
                    team1.save();
                }
    
                else if(email1Exists && email2Exists && email3Exists && email4Exists && email5Exists)
                {
                    console.log("Team consists 5 members. All emails verified")
                    team1.save();
                }
    
                else if(email1Exists && email2Exists && email3Exists && email4Exists)
                {
                    console.log("Team consists 4 members. All emails verified")
                    team1.save();
                }
    
                else if(email1Exists && email2Exists && email3Exists)
                {
                    console.log("Team consists 3 members. All emails verified")
                    team1.save();
                }
    
                else if(email1Exists && email2Exists)
                {
                    console.log("Team consists 2 members. All emails verified")
                    team1.save();
                }
    
                else if(email1Exists)
                {
                    console.log("Only you are registered.Email verified")
                    team1.save();
                }
                
                else
                {
                    console.log('One or more emails from your team are not registered')
                }
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

app.post('/registration',urlencodedParser, async (req, res) => {
    // console.log(req.body)
    const NAME = req.body.fullName;
    const EMAIL = req.body.email;
    const PHONENO = req.body.phone;
    const COUNTRY = req.body.country;
    const CITY = req.body.city;
    const RESIDENTIALADDRESS = req.body.residentialAddress;
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
        residentialAddress : RESIDENTIALADDRESS,
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
            res.send('Succesfully registered')
            // res.redirect('/competitions')
        }
    }

})



app.listen(3000, function() {
    console.log("Server started on port 3000");
});