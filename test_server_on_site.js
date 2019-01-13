var imports = require('./export_m.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

//Set up mongoose connection
var mongoDB = "mongodb://localhost:27017/test";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; //make sure using correct library

//get the database instance
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));






/*
SCHEMAS
*/
Schema = imports.Schema;
ProfileSchema = imports.ProfileSchema;

//define a function for all profile objects
ProfileSchema.statics.findByFullName = function(name) {
	return this.find({ fullname: new RegExp(name, 'i') });
};

//define a function for all profile objects
ProfileSchema.statics.findById = function(id) {
	return this.findOne( { _id: id} ); 
};


/*
MODELS (these are collections in the mongoDB database)
*/
//PROFILES
var Profile = mongoose.model('Profile', ProfileSchema);


/*
WEBSITE COMMUNICATION
*/
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',function(req,res)
{
	res.send("MAIN PAGE");
});

app.get('/signin',function(req,res)
{
	res.send("SIGNIN");
});

app.get('/databasetests',function(req,res)
{
	var brent_query = Profile.findOne( {firstname: "brent"} );
	//brent_query.select("firstname").limit(1);


	brent_query.exec(function (err, person) {
		if (err) return handleError(err);
	 	res.send(person.lastname);
	});
});

app.get('/postreqs',function(req,res)
{
	res.sendFile('/Users/agaut/SBHacks-MABAE-/form_test.html');
});

//test processing post requests
app.post('/postreqs',function(req,res)
{
	//process post request
	//NOTE: bodyparser uses name attribute ONLY (req.body.nameAttrib) to 
	//find particular HTML objects
	var prof = new Profile( { firstname: req.body.firstname,
				   lastname: req.body.lastname } );

	console.log("NAME: " + prof.fullname);


});

//Start the server
app.listen(3000, () => console.log(`Example app listening on port 3000`));

















