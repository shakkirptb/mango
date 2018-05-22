/**
 * @author shakkirptb@gmail.com
 * */
var MongoClient = require('mongodb').MongoClient;

var MangoAliyan = function (url,dbs,dbLoadedCallBack){
	this.url = url ||   "mongodb://localhost:27017/";
	this.db;
	if(dbs){
		this.db = connect(dbs,dbLoadedCallBack).db;
	}
}
function connect(myDb,dbLoadedCallBack){
	var dbos={};
	this.db=dbos;
	dbLoadedCallBack = dbLoadedCallBack || function(){};
	MongoClient.connect(this.url, function(err, client) {
	    if (err) {
	    	console.error("ERROR",err);
	    	if(dbLoadedCallBack(err) == false) throw err;
	    }
	    
	    for (dbName in myDb) {
	        var dbo = client.db(dbName);
	        dbos[dbName] = dbo;
	        for (collectionName of myDb[dbName]) {
	        	dbos[dbName][collectionName] = dbo.collection(collectionName);
	            console.log(dbName + "." + collectionName + " connected..");
	        }
	    }	    
	    dbLoadedCallBack(null,dbos);
	});
	
	return this;
}
function getList(res, collection, query, callBack) {
    //console.log("getList(" + res + "," + collection + "," + query + ",callBack)");
	if(collection==null){
		 callBack(res, collection, {err:"Bad collection." + collection});
		 return undefined;
	}
    collection.find(query).toArray(function(err, result) {
        if (err) throw err;
        if (typeof callBack == "function") {
            callBack(res, collection, result);
        }
    });
}

function getDistinct(res, collection, query, callBack) {
	if(collection==null){
		 callBack(res, collection, {err:"Bad collection." + collection});
		 return undefined;
	}
    collection.distinct(query, function(err, result) {
        if (err) throw err;
        if (typeof callBack == "function") {
            callBack(res, collection, result);
        }
    });
}

function getOne(res, collection, query, callBack) {
	if(collection==null){
		 callBack(res, collection, {err:"Bad collection." + collection});
		 return undefined;
	}
    collection.findOne(query, function(err, result) {
        if (err) throw err;
        if (typeof callBack == "function") {
            callBack(res, collection, result);
        }
    });
}

function insert(res, collection, doc, callBack) {
	if(collection==null){
		 callBack(res, collection, {err:"Bad collection." + collection});
		 return undefined;
	}
    collection.insert(doc, function(err, result) {
        if (err) {
            if (err.code == 11000) {
                console.log("E11000:insertion with duplicate _id...");
            } else {
                console.log(err.errmsg);
            }
            if (typeof callBack == "function") {
                callBack(res, collection, false);
            }
            return false;
        }
        if (typeof callBack == "function") {
            callBack(res, collection, result);
        }
    });
}


//enablers
MangoAliyan.prototype.connect=connect;
MangoAliyan.prototype.getList=getList;
MangoAliyan.prototype.getDistinct=getDistinct;
MangoAliyan.prototype.getOne=getOne;
MangoAliyan.prototype.insert=insert;
//export
module.exports = MangoAliyan;