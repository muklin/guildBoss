module.exports = function(app, passport, mongoose){
	app.get('/', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

	app.post('/login', passport.authenticate('local-login', 
		function(req, res) {
			// If this function gets called, authentication was successful.
			// `req.user` contains the authenticated user.
			//  res.redirect('/users/' + req.user.username);
			res.sendStatus(200);
		}
	));

    // process the signup form
    app.post('/createAcct', function(req, res){
		var User = mongoose.model("User");
		User.insert(req.data, function(err){
			if(err)	{
	            console.log(err);
	            res.sendStatus=500;
	            res.send(err);  
	        }else{
	            res.sendStatus=200;
	            res.send(user);
	        }
		});
	});
	/*
	//passport.authenticate('local-signup', 
		function(req, res) {
			console.log(req);
			console.log(res);
			// If this function gets called, authentication was successful.
			res.statusCode = 200;
			res.send(req.user);
		}
	));*/
};