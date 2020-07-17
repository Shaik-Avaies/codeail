const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = function(req,res){
    console.log("came untill here");
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                if(err){ console.log("Error in creating comment"); return ;}
                //handle error
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
}

