const Post = require('../models/post');
// const user = require('../models/user');

module.exports.home = function(req,res){ //u didntrequire user?
    // console.log(req.cookies);
    // res.cookie('Shaik',100);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:'Codial | Home',
    //         posts: posts
    //     });
    // });


    //popualte the user of each post. It can be populated with only id's
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:'Codial | Home',
            posts: posts
        });
    });

    // where is your comment 
    // when I replace above code with below one I am getting error


    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
            //all_users: users
        });
    })


}