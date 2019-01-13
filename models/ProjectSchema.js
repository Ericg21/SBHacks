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
	category: String, //category project fits into
	fundraisingGoal: Number,
	percentPayout1: Number, //percent paid out at completion of milestone 1
	milestoneDeadline1: String,
	milestoneDescr1:String,
	percentPayout2: Number, 
	milestoneDeadline2: String,
	milestoneDescr2:String,
	percentPayout3: Number, 
	milestoneDeadline3: String,
	milestoneDescr3:String,
	percentPayout4: Number, 
	milestoneDeadline4: String,
	milestoneDescr4:String,
	finalDeadline: String //format: year-month-day,
});



/*
USAGE EXAMPLE:
*/

















