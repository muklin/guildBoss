// app/models/division.js
var mongoose = require('mongoose');

// define the schema for our user model
var divisionSchema = mongoose.Schema({
	name  : String,
	gold  : String,
	guildID: Number	
});
// methods ======================
divisionSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};
divisionSchema.statics.findByID = function (id, cb) {
  return this.find({ 'id': id }, cb);
};
divisionSchema.statics.insert = function (data, cb) {
  var division = new this(data);
  return division.save();  
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Division', divisionSchema);