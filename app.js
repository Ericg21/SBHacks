var profileSchema = require('./models/ProfileSchema.js');
var projectSchema = require('./models/ProjectSchema.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//Start the server
app.listen(3000, () => console.log(`Example app listening on port 3000`));


//Set up mongoose connection
var mongoDB = "mongodb://localhost:27017/test";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; //make sure using correct library
var db = mongoose.connection;

//get Profiles collection
var Profile = mongoose.model('Profile', ProfileSchema);

//Register form inputs on login page
app.post('/login', function(req,res)
{
	var uname = req.body.username;
	var pword = req.body.password;

	//check that user exists and verify login is correct
	var query = Profile.findOne({username: uname}, function(err, profile)
	{
		if (err) 
		{
			console.log("Huston, we have a problem", err);
		}
		else if(!profile){
			res.redirect('/login.html#wrong_password');
		}
		else
		{
			profile.comparePassword(pword, function(err, match){
				if (!match || err) 
				{
					res.redirect('/login.html#wrong_password');
				}
				else
				{
					res.redirect('/index.html');

				}
			});
		}
	}); 
});


//Register account creation
app.post('/account_creation.html', function(req,res)
{
	console.log("start");
	var newUser = new Profile(
	{
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email
	});
	console.log("done");

	newUser.setPassword(req.body.password);
	console.log("pword done");
	newUser.save();
});




























