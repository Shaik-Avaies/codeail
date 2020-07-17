const express = require("express");
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//It reqs one argument session
const MongoStore = require('connect-mongo')(session);

const sassMiddleWare = require('node-sass-middleware');


app.use(sassMiddleWare({
    src: './assets/Scss',
    dest: './assets/Css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/Css'
}));


app.use(express.urlencoded());
app.use(cookieParser());


//Creating Layouts
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);


//extract style and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.static('./assets'));


//set up view engine
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the sessoin cookie in the db
app.use(session({
    name: 'Codial',
    //ToDo change the secret before deployment in produnction mode
    secret: 'blahsomething',
    saveUnintialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect mongodb-setup ok');
    }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));


app.listen(port,function(err,data){
    if(err){
        console.log(`Error in running the server: ${err} `);
        return ;
    }
    console.log(`Server is running on port: ${port}`);
});

