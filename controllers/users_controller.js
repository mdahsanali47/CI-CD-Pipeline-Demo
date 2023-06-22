const { models } = require('mongoose');
const User = require('../models/users');
const fast2sms = require('fast-two-sms');

module.exports.profile = function(req,res){
    return res.render('profile');
}

module.exports.signin = function(req,res){
    return res.render('signin');
}

module.exports.signup = function(req,res){
    return res.render('signup');
}

module.exports.create = (req,res) =>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confim_password;
    console.log(name,email,password,confirm_password);

    if(password == confirm_password){
        // create new entry in the database
        User.create({
            name:name,
            email:email,
            password:password,
         },
       // ).then((user)=> console.log(user))
        // .catch((err) => {console.error(err);});
        function(err,user){
            if(err){ 
                console.log('error in creating new user:',err);
                 return;
            }
            console.log(user);
        });
        return res.render('signin');
    }else{
        console.log('password and confirm password are not same')
        return res.redirect('back');
    }

}

module.exports.createSession = (req,res) =>{
    // var email = req.body.email;
    // var password = req.body.password;
    // User.findOne({email:email},(err,user)=>{
    //     if(err){console.log("error in finding user in create session",err); return ;}
    //     if(password== confirm_password){
    //         return res.render('/users/profile');
    //     }else{
    //         console.log("password");
    //         return res.redirect('back');
    //     }
    // })
    return res.render('profile');
}

module.exports.logout = function(req,res){
    req.logout(function(err) {
        return res.redirect('/users/signin');
    });
    
}

// fastsms Api key = 7IanZUqREJtcVrlbwDjiXG0M1d8kLQshfg2vWom3eSYpxzAyOFxko5Whdsnau71NMqrwSX39YDVb0Iy8

module.exports.sendOtp = async function(req,res){
    
    const user_id = req.user.id;
    const  mobile_number = req.params.mobile_number;
    var otp = Math.floor(1000 + Math.random() * 9000);
    
   
    // if (Array.isArray(mobile_number)) {
    //     mobile_number = mobile_number.join(',');
    //   }
    console.log(mobile_number);
    const options = {
    authorization :'7IanZUqREJtcVrlbwDjiXG0M1d8kLQshfg2vWom3eSYpxzAyOFxko5Whdsnau71NMqrwSX39YDVb0Iy8',
     message : `Your OTP for sahiNotes.com is ${otp}` ,
     numbers :[mobile_number]
    } 
  try {
    const output = await fast2sms.sendMessage(options); //Asynchronous Function.
  if(output){
    console.log("message sent successfuly");
    return res.json({message:'msg  send'});


  }
  } catch (error) {
    
     console.log('Error in sending sms',error);
     return res.json({message:'msg not send'});   
  }
  
        

}

module.exports.verifyMobile = function(req,res){
    return res.render('verifyMobile');
}
