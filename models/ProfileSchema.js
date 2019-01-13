var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
module.exports = {} 

Schema = mongoose.Schema;

module.exports.ProfileSchema = new Schema
({
	username: {type:String, required:true, minlength:4, maxlength:20},
	firstname: {type:String, required:true, minlength:1, maxlength:20},
	lastname: {type:String, required:true, minlength:1, maxlength:20},
	email: {type:String, required:true, minlength:1, maxlength:30},
	passhash: String,
	projects: [ { _id: Schema.Types.ObjectId, name: String} ] 
});
ProfileSchema = module.exports.ProfileSchema

//define a virtul property for the schema (don't have to concatenate name every time
module.exports.ProfileSchema.virtual('fullname').get(function() {
	return this.firstname + " " + this.lastname;
});

//define a virtual to hash the password
ProfileSchema.methods.setPassword = function(password, cb)
{
	var theObj = this;
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash){
			if(err) return cb(err);
			theObj.passhash = hash;
			cb(err, hash);
		});
	});
	
};

ProfileSchema.methods.comparePassword = function(password, cb)
{
	console.log(password, this.passhash);
	bcrypt.compare(password, this.passhash, cb);
};



/*
USAGE EXAMPLE:

//adding an instance to the db
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





*/





















