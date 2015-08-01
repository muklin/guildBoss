// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var ObjectId = mongoose.Schema.Types.ObjectId;

// define the schema for our user model
var userSchema = mongoose.Schema({
    acctType : {id:0,name:""},
    firstName : String,
    lastName : String,
    campaignCode : String,
    campaignID: ObjectId,
    email        : String,
    password     : String
});


// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.methods.insert = function(){
        
    var user = new this(req.body,cb);
    var passwordHashed = this.generateHash(user.password);
    user.password = passwordHashed;
    user.save(function(err){
        if(err)
            console.log(err);
        cb(err);
    });  
};  

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);