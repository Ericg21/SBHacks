var mongoose = require('mongoose');

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
Schema = mongoose.Schema;

var ProfileSchema = new Schema
({
	username: String,
	firstname: String,
	lastname: String,
	password: String,
	projects: [ { _id: Schema.Types.ObjectId, name: String} ] 
});

//define a virtul property for the schema (don't have to concatenate name every time
ProfileSchema.virtual('fullname').get(function() {
	return this.firstname + " " + this.lastname;
});

//define a virtual to hash the password
ProfileSchema.virtual('passhash').get(function()
{
	//LATER: DOWNLOAD BCRYPT TO HASH FUNCTION
	return this.password;
});


/*
MODELS (these are collections in the mongoDB database)
*/
//PROFILES
var Profile = mongoose.model('Profile', ProfileSchema);

var user1 = new Profile(
{
	username: "GOAT_squad6969",
	firstname: "Swag",
	lastname: "Daddy",
	password: "yes",
	projects: []
});
user1.save(); //this saves your instance to the db

var user2 = new Profile(
{
	username: "mason",
	firstname: "mason",
	lastname: "corey",
	password: "no",
	projects: []
});
user2.save();

var user3 = new Profile(
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

app.get('/databasetests',function(req,res)
{
	var brent_query = Profile.find( {firstname: "brent"} );
	brent_query.select("firstname").limit(1);
	console.log(brent.fullname);
	res.send(brent.lastname);
});

//Start the server
app.listen(3000, () => console.log(`Example app listening on port 3000`));


















