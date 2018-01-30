var jwt=require('jsonwebtoken');
var passport=require('passport');
var User=require('../models/user');
var config=require('../config/database');
var sendConfirmationEmail=require('../mailer');

module.exports=function(app,passport){
    app.get('/',(req,res)=>{
        res.json('Welcome to my website');
    });

    app.post('/api/auth/signup',(req,res)=>{
        var newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        });

        User.getUserByEmail(newUser.email,function(err,user){
            // console.log(arguments);
            if (err) {
                res.json({
                    success:false,
                    message:err
                })
            } else if(user){
                res.json({
                    success:false,
                    message:'Email is already exist. Please log in'
                })
            } else{
                User.createUser(newUser,function(err,user){
                    if (err) {
                        res.json({
                            success:false,
                            message:'Error in registration'
                        });
                    } else{
                        var token=jwt.sign(user.toJSON(),config.secret,{expiresIn:'10m'});
                        newUser.tokenConfirmation='Bearer '+token;
                        newUser.save()
                        .then(()=>{
                            sendConfirmationEmail(newUser);
                            res.json({
                            success:true,
                            message:'Register successfully',
                            token:'Bearer '+token
                        })
                        
                    })
                    .catch(err=>{res.status(400).json({
                        success:false,
                        message:err+''
                    })
                });
                        // console.log(newUser);
                    }
                })
            }
        })
    });
    app.post('/api/auth/login',(req,res)=>{
            var email=req.body.email;
            var password=req.body.password;
            User.getUserByEmail(email,function(err,user){
                console.log(arguments);   
                if (err) {
                    throw err;
                }
                else if (!user) {
                    res.status(400).json({
                        success:false,
                        message:'User cannot be found. Please signup'
                    });
                }
                else{

                    User.comparePass(password,user.password,function(err,isMatch){
                        // console.log('===compare pass=====');
                        // console.log(arguments);
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            var token=jwt.sign(user.toJSON(),config.secret,{expiresIn:'10m'});
                            res.json({
                                success:true,
                                token:'Bearer '+token
                            });
                        } else {
                            return res.json({
                                success:false,
                                message:'Password does not match'
                            })
                        }
                    })
                }
            })
            

    }
        
    );
    app.get('/profile',passport.authenticate('jwt', {session:false}), (req, res, next) => {
        // console.log(req);
        res.json({user: req.user});
        });
    app.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    })
}