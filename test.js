var MangoAliyan = require("./index.js");

var mangoA = new MangoAliyan("mongodb://localhost:27017/");

var myDb = mangoA.connect(
	{
		db1: ["collection1","collection2"],
		db2: ["collection1"]
	},
dbLoadedCallBack).db;


function dbLoadedCallBack(err) {
	if(err)throw err;
	console.log("Mongo client connection success..");
    mangoA.getList(null, myDb.db1.collection1, {},function(err,dbDataArray){
		console.log("collection has " + dbDataArray.length + " docs");
	});
}