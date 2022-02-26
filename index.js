const express = require('express');
const mongoose = require('mongoose');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session'); 
var MemoryStore = require('memorystore')(expressSession)
const passport = require('passport');
const flash = require('connect-flash');

const app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views',);

app.use(express.urlencoded({ extended: true }));

const mongoURI = require('./config/mongoDB');
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, },).then(() => console.log("Connected !"),);

app.use(cookieParser('random'));

app.use(expressSession({
    secret: "Its a secret you will never know ",
    resave: true,  //anu thing happend in the session save it 
    saveUninitialized: true,   // a session between the user and server 
    // setting the max age to longer duration
    expires: 1000 * 60 * 60 * 24 * 30,
    store: new MemoryStore(), //store the data
    cookie:{
        secure:false,
        httpOnly:false
    } 
}));

app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.error = req.flash('error');
    next();
});

app.use(require('./controller/routes.js'));

const PORT =  8080;

app.listen(PORT, () => console.log("Server Started At PORT :" + PORT));