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

//Start the server
app.listen(3000, () => console.log(`Example app listening on port 3000`));

/*
DATABASE CODE
*/

//Server to database connection
MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	if(!err) 
	{
		console.log("We are connected");
	}
	else
	{
		console.log("ERROR: " + err);
	}

	//Basic DB Operations 
	//db.createCollection('Profiles', {strict:true}, function(err,collection) {});
	var test = db.db('test');
	test.createCollection('Profiles', {strict:true}, function(err,collection) {});

	var profiles = test.collection('Profiles');
	var prof1 = {'Name' : 'Andrew Gaut', 'Projects' : 'n/a'};

	//insert into database
	profiles.insertOne(prof1, {w:1}, function(err,result) {});

	//query database
	//if no error, print the property on the databasetest page file
	profiles.findOne({"Name" : "Andrew Gaut"}, function(err,queryItem) {
		if (err) { console.log("NOT FOUND ERROR"); }
		else
		{
			app.get('/databasetest',function(req,res) { res.send(queryItem.Projects)} );
		}
	});
	
});


