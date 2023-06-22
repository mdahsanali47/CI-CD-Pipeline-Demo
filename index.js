const express = require('express');
const app = express();

const expressEjsLayouts = require('express-ejs-layouts'); // require library and call for use layouts
require('./config/mongoose');
// const passport = require('passport');
require('./config/passport-local-strategy');
const expressSession = require('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongo');

app.use(express.urlencoded());// help to extract the data form body
app.use(expressEjsLayouts);
app.use(expressSession({
    name:'sahinotes',
    secret:'sahinotes_dev',
    cookie:{
        maxAge:24*60*60*1000
    },
    store:mongoStore.create({
        mongoUrl:"mongodb://127.0.0.1:27017/sahinotes_devlopment"
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




app.set('view engine','ejs');
app.set('views','./views');
// access for public folder
app.use(express.static('./assets'));



app.listen(8000,function(err){
    if(err){
        console.log('error in the running  surver ',err); return
    }
    console.log("surver is running in the port number 8000");
})