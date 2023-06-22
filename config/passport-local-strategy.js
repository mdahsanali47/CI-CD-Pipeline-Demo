const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');


passport.use(new LocalStrategy({
    usernameField:'email',
 },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {console.log("Error in passport local strategy",err); return done(err); }
        if (!user) {console.log("user is not found",err); return done(null, false); }
        if (password!= user.password) {console.log("wrong password",err); return done(null, false); }
        return done(null, user);
      });
    }
));

// passport.use(new LocalStrategy({
//     usernameField: 'email'
// },
// function(email, password, done){
//     // find a user and establish the identity
//     User.findOne({email: email}, function(err, user)  {
//         if (err){
//             console.log('Error in finding user --> Passport');
//             return done(err);
//         }

//         if (!user || user.password != password){
//             console.log('Invalid Username/Password');
//             return done(null, false);
//         }

//         return done(null, user);
//     });
// }


// ));


passport.serializeUser(function(user, done) {// responce go
    done(null, user.email);
}); 


passport.deserializeUser(function(email, done) {// responce come
    
    User.findOne({email:email}, function(err, user) {
       done(err, user);
    });            
});


passport.checkAuthentication = function(req,res,next){ // specefic Api middlieware
    if(req.isAuthenticated()){
        return next;
    }else{
        return res.redirect('/users/signin');
    }
}

passport.setAuthenticatedUser = function(req,res,next){ // globle api middleware
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        return next();
    }else{
        return next();
    }
}

module.exports = passport;