var mongoose=require('mongoose');
var config=require('../config/database');
var bcrypt=require('bcryptjs');

var userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        require:true
    }
});

var User=module.exports=mongoose.model('User',userSchema);

module.exports.getUserById=function(id,cb){
    User.findById(id,cb);
};
module.exports.getUserByEmail=function(email,cb){
    User.findOne({email},cb);
};
module.exports.createUser=function(newUser,cb){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,function(err,hash){
            if (err) {
                throw err;
            } else {
                newUser.password=hash;
                newUser.save(cb);
            }
        });
    });
};
module.exports.comparePass=function(myPass,hashPass,cb){
    console.log(arguments);
    bcrypt.compare(myPass,hashPass,function(err,isMatch){
        if (err) {
            throw err;
        } else {
            cb(null,isMatch);
        }
    })
}