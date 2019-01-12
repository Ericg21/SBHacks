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
	passhash: "yes",
	projects: []
});
user1.save(); //this saves your instance to the db

var user2 = new Profile(
{
	username: "mason",
	firstname: "mason",
	lastname: "corey",
	passhash: "no",
	projects: []
});
user2.save();

var user3 = new Profile(
{
	username: "bmoney",
	firstname: "brent",
	lastname: "luker",
	passhash: "a",
	projects: []
});

user3.save();


/*
DATABASE MANIPULATION	
*/

















