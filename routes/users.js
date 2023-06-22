const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/signin',usersController.signin);
router.get('/signup',usersController.signup);
router.post('/create',usersController.create);
router.post('/create_session',passport.authenticate('local',{ failureRedirect:'/users/singin'}), usersController.createSession);
router.get('/logout',usersController.logout);
router.get('/verify_mobile',usersController.verifyMobile);
router.get('/sendotp/:mobile_number',usersController.sendOtp);



module.exports = router;