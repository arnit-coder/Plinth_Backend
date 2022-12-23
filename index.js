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

// const usersSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });

// const User = mongoose.model('User',usersSchema);

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
    res.render("/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/competition');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


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

app.listen(3000, function() {
    console.log("Server started on port 3000");
});