var jwt=require('jsonwebtoken');
var passport=require('passport');
var User=require('../models/user');
var config=require('../config/database');

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
        User.createUser(newUser,function(err,user){
            if (err) {
                res.json({
                    success:false,
                    message:'Error in registration'
                });
            } else{
                res.json({
                    success:true,
                    message:'Register successfully'
                })
            }
        })
    });
    app.post('/api/auth/login',(req,res)=>{
            var email=req.body.email;
            var password=req.body.password;
            User.getUserByEmail(email,function(err,user){   
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
                        console.log('===compare pass=====');
                        console.log(arguments);
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