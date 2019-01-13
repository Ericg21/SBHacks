var profileSchema = require('./models/ProfileSchema.js');
var projectSchema = require('./models/ProjectSchema.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var session  = require('express-session');
var multer = require('multer');
var morgan = require('morgan');

var app = express();
app.use(session({ secret: 'WESHOULDCHANGETHISINTOSOMETHINGIFTHISISFORREAL', cookie: {maxAge: 60000}}));
app.use(morgan('dev'));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//Start the server
app.listen(3000, () => console.log(`Example app listening on port 3000`));


//Set up mongoose connection
var mongoDB = "mongodb://localhost:27017/test";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; //make sure using correct library
var db = mongoose.connection;

//Bind connection to error event (so get notification of connetion errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//get Profiles collection
var Profile = mongoose.model('Profile', ProfileSchema);

//Register form login page
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
					res.redirect('/login#wrong_password');
				}
				else
				{
                    req.session.user = profile;
					res.redirect('/index.html');

				}
			});
		}
	}); 
});


//Register account creation
app.post('/account_creation.html', function(req,res)
{
	var newUser = new Profile(
	{
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email
	});
	newUser.setPassword(req.body.password, function(err){
		if(err) console.log("ERRORRRR setting passhash");
		newUser.save(function(err)
		{
			if(err) console.log("SAVE ERROR: " + err);
			else
			{
				res.redirect('/');
			}
		});
	});

	//check if username or password is taken
	//DO THISSSSS -- use queries

});


//Multer setup
var storage = multer.diskStorage
({
 	destination: './public/assets/images',
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
var upload = multer({ storage: storage })

app.post('/project_create.html', upload.single('pic'), function(req,res)
{
	//get image		
	if (!req.file) {
	    console.log("No file received");
        } 
	else {
		console.log('file received');
	}




});

























// images: make sure no slashes; use multer
