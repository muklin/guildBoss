// app/models/hireling.js
var mongoose = require('mongoose');

// define the schema for our user model
var hirelingSchema = mongoose.Schema({
	name  			: String,
	characterPoints	: Number,
	role			: String,
	divisionID		: Number,
	priAttribs		: [{
						name:String, 
						value:Number, 
						type:String
					}],
	secAttribs		: [{
						name:String, 
						value:Number, 
						type:String
					}]
});
// methods ======================
divisionSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};
divisionSchema.statics.findByID = function (id, cb) {
  return this.find({ 'id': id }, cb);
};
divisionSchema.statics.findByDivisionID = function (divisionID, cb) {
  return this.find({ 'divisionID': divisionID }, cb);
};

divisionSchema.statics.insert = function (data, cb) {
  var division = new this(data);
  return division.save();  
};



// create the model for users and expose it to our app
module.exports = mongoose.model('Hireling', hirelingSchema);