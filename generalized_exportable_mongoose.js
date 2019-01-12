module.exports = { 
	exports.mongoose = require('mongoose');
	//Set up mongoose connection
	exports.mongoDB = "mongodb://localhost:27017/test";
	mongoose.connect(mongoDB);
	mongoose.Promise = global.Promise; //make sure using correct library

	//get the database instance
	exports.db = mongoose.connection;

	//Bind connection to error event (to get notification of connection errors)
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));






	/*
	SCHEMAS
	*/
	Schema = mongoose.Schema;

	exports.ProfileSchema = new Schema
	({
		username: String,
		firstname: String,
		lastname: String,
		password: String,
		projects: [ { _id: Schema.Types.ObjectId, name: String} ] 
	});

	//define a virtul property for the schema (don't have to concatenate name every time
	ProfileSchema.virtual('fullname').get(function() {
		return exports.firstname + " " + exports.lastname;
	});

	//define a virtual to hash the password
	ProfileSchema.virtual('passhash').get(function()
	{
		//LATER: DOWNLOAD BCRYPT TO HASH FUNCTION
		return exports.password;
	});


	/*
	MODELS (these are collections in the mongoDB database)
	*/
	//PROFILES
	exports.Profile = mongoose.model('Profile', ProfileSchema);

	exports.user1 = new Profile(
	{
		username: "GOAT_squad6969",
		firstname: "Swag",
		lastname: "Daddy",
		password: "yes",
		projects: []
	});
	user1.save(); //exports saves your instance to the db

	exports.user2 = new Profile(
	{
		username: "mason",
		firstname: "mason",
		lastname: "corey",
		password: "no",
		projects: []
	});
	user2.save();

	exports.user3 = new Profile(
	{
		username: "bmoney",
		firstname: "brent",
		lastname: "luker",
		password: "a",
		projects: []
	});

	user3.save();


	/*
	WEBSITE COMMUNICATION
	*/
	exports.express = require('express');
	exports.app = express();
	exports.MongoClient = require('mongodb').MongoClient;


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
		var brent_query = Profile.find( {firstname: "brent"} );
		brent_query.select("firstname").limit(1);
		console.log(brent.fullname);
		res.send(brent.lastname);
	});

	//Start the server
	app.listen(3000, () => console.log(`Example app listening on port 3000`));
}

















