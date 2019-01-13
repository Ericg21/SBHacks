var mongoose = require('mongoose');
module.exports = {} 

//make it so we can export this variable
module.exports.Schema = mongoose.Schema;
Schema = module.exports.Schema

module.exports.ProjectSchema = new Schema
({
	title: String, //this represents text in bold at top of entry
	briefDescription: String, //text right below title
	image: String, //text representing name of image file
	creator: String, //name of user who created project
	dateSubmitted: String, //format: year-month-day,
	category: String //category project fits into
});
ProjectSchema = module.exports.ProjectSchema



/*
USAGE EXAMPLE:
*/

















