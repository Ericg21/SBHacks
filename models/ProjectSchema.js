var mongoose = require('mongoose');
module.exports = {} 

//make it so we can export this variable
module.exports.Schema = mongoose.Schema;
Schema = module.exports.Schema

module.exports.ProjectSchema = new Schema
({
	title: String, //this represents text in bold at top of entry
	shortDescription: String, //text right below title
	longDescription: String, //text at bottom of entry
	image: String, //text representing name of image file
	creator: String, //name of user who created project
	dateSubmitted: int 
});
ProjectSchema = module.exports.ProjectSchema



/*
USAGE EXAMPLE:
*/

















