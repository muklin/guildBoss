module.exports = function(app, mongoose){
	app.get('/', function(req, res) {
		res.sendfile('./public/views/index.html');
	});
	
	
};