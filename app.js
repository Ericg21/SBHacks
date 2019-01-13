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

var ObjectId = mongoose.Types.ObjectId;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//Start the server
app.listen(8080, () => console.log(`Example app listening on port 3000`));


//Set up mongoose connection
var mongoDB = "mongodb://gclouduser:WtHrbJcbF2iJ65DU@hackathoncluster-shard-00-00-btz7k.gcp.mongodb.net:27017,hackathoncluster-shard-00-01-btz7k.gcp.mongodb.net:27017,hackathoncluster-shard-00-02-btz7k.gcp.mongodb.net:27017/test?ssl=true&replicaSet=HackathonCluster-shard-0&authSource=admin&retryWrites=true";
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
			res.redirect('/login#wrong_password');
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


app.get("/projects/:id", function(req, res, cb){
	var id = ObjectId(req.params.id);
	
	var query = Project.findOne({_id:id}, function(err, project)
	{
		if(err) return cb(err);

		//if no error, then we know project

		res.render("single.ejs", {title: project.title, description: project.briefDescription, imageName: "/images/" + project.image}); 

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
		filetypes = {"image/gif": ".gif", "image/jpeg" : ".jpg", "image/x-citrix-jpeg": ".jpg", "image/png": ".png", "image/x-citrix-png": ".png", "image/x-png": ".png"}
		if(!(file.mimetype in filetypes)) {
			return cb(new Error("Mimetype not supported"));
		}
		
		cb(null, file.fieldname + '-' + Date.now() + filetypes[file.mimetype]);
	}
});
var upload = multer({ storage: storage })

//load project schema and collection
var Project = mongoose.model('projects', projectSchema);


app.post('/project_create.html', upload.single('pic'), function(req,res)
{
	//get image		
	if (!req.file) {
	    console.log("No file received");
        } 
	else {
		console.log('file received');
		//multer has automatically saved it
	}

	//create new project
	var newProj = new Project(
	{
		title: req.body.projectname,
		briefDescription: req.body.description,
		deadlineDate: req.body.deadline,
		image: req.file.filename,
		category: req.body.Category,
		percentPayout1: req.body.payout1,
		milestoneDeadline1: req.body.deadline1,
		milestoneDescr1: req.body.description1,
		percentPayout2: req.body.payout2,
		milestoneDeadline2: req.body.deadline2,
		milestoneDescr2: req.body.description2,
		percentPayout3: req.body.payout3,
		milestoneDeadline3: req.body.deadline3,
		milestoneDescr3: req.body.description3,
		percentPayout4: req.body.payout4,
		milestoneDeadline4: req.body.deadline4,
		milestoneDescr4: req.body.description4,

	});
	newProj.save();

	

});























// images: make sure no slashes; use multer
