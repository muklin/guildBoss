// app/models/guild.js
var mongoose = require('mongoose');

// define the schema for our user model
var guildSchema = mongoose.Schema({
	name  : String,
	motto : String,
	active: { type: Boolean, default: true } ,
	createdOn: 	{ type: Date, default: Date.now } 
});
// methods ======================
guildSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};
guildSchema.statics.findByID = function (id, cb) {
  return this.find({ 'id': id }, cb);
};
guildSchema.statics.insert = function (data, cb) {
	var guild = new this(data);
	guild.save(function(err){
		if(err)
			console.log(err);
		cb(err);
	});  
};


// create the model for users and expose it to our app
module.exports = mongoose.model('Guild', guildSchema);