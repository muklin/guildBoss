module.exports = function(app, mongoose){
	app.get('/guild/:guildID"', function(req, res) {
		var guildID = req.params.guildID;
		var Guild = mongoose.model("Guild");
		Guild.findByID({id:guildID}, function(data){
			res.jsonp(data);
		});
	});
	app.post('/guild"', function(req, res) {
		var Guild = mongoose.model("Guild");
		Guild.insert(req.data, function(err,data){
			res.send(err);
		});
	});
	
	
};