var mongoose = require('mongoose');
var imports = require("./models/ProfileSchema.js");

//Set up mongoose connection
var mongoDB = "mongodb://localhost:27017/test";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; //make sure using correct library

//get the database instance
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/*
MODELS (these are collections in the mongoDB database)
*/
//PROFILES
var Profile = mongoose.model('profiles', imports.ProfileSchema);

var user1 = new Profile(
{
	username: "Shaq",
	firstname: "Shaq",
	lastname: "Oneal",
	projects: []
});

user1.setPassword("worddssss", function(err){
	if(err) console.log("We failed" + err);
	user1.save();
});


/*
WEBSITE COMMUNICATION
*/
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;


app.get('/',function(req,res)
{
	res.send("MAIN PAGE");
});

app.get('/signin',function(req,res)
{
	res.send("SIGNIN");
});
app.get('/viewtest', function(req, res){
    res.render("helloworld.ejs", {fname: "Andrew", lname: "Gaut"});
});

app.get('/databasetests',function(req,res)
{
	var hash_query = Profile.findOne( {firstname: "Shaq"}, function(err, profile)
	{
		if(err) console.log("ERROR finding profile");
		//console.log(profile.passhash);
		//console.log(profile.firstname + ", " + profile.lastname + ", " + profile.username + ", " + profile.password + ", " + profile.projects);
		console.log("HASHED: " + profile.passhash);
		res.send(profile.passhash);

	});
	/*
	hash_query.exec(function(err, profile)
	{
		if(err) console.log("ERROR finding profile");
		//console.log(profile.passhash);
		console.log(profile.firstname);
		console.log(profile.password);
		res.send(profile.passhash);
	});
	*/
});

//Start the server
app.listen(3000, () => console.log(`Example app listening on port 3000`));


















