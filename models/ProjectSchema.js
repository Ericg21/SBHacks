var mongoose = require('mongoose');
module.exports = {} 

//make it so we can export this variable
Schema = mongoose.Schema;

module.exports = new Schema
({
	title: String, //this represents text in bold at top of entry
	briefDescription: String, //text right below title
	image: String, //text representing name of image file
	creator: String, //name of user who created project
	dateSubmitted: String, //format: year-month-day,
	category: String //category project fits into
});



/*
USAGE EXAMPLE:
*/

















