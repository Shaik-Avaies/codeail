const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "User Profile"
    });
}


//Render the SignUP page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codial | Sign Up"
    });
}




//Render the SignIn page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codial | Sign In"
    });    
}



//get the Sign Up data
module.exports.create = function(req,res){
    // console.log("Hello");
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if(err) {console.log('error in finding user in signin up'); return ;};
        if(user == null){
            User.create(req.body,function(err,user){
                if(err) {console.log('error in finding in creating user'); return ;};
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });

};


//sign in and create a session for user
module.exports.createSession = function(req,res){
    return res.redirect('/');
};


module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
};