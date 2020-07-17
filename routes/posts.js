const express = require("express");
const router = express.Router();
const passport = require('passport');

const post_controller = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,post_controller.create);

module.exports = router;



//I downloaded sir code, I am not able to run it. How can run it 
//Sample folder 
//tyr to run that