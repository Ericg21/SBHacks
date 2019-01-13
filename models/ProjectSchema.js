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
	deadlineDate: String, //format: year-month-day,
	currentFundraising: Number, //current fundraising sum
	creator: String //creator of project
});

module.exports.virtual('formattedFinalDeadline').get(function()
{
    var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December']
    var year = this.deadlineDate.substring(0,4);
    var month = parseInt(this.deadlineDate.substring(5,7));
    var day = this.deadlineDate.substring(8,10);

    console.log("year: " + year + ", month: " + month + "day: " + day);

    return months[month] + " " + day + ", " + year;
});

/*
USAGE EXAMPLE:
*/



