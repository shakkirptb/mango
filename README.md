# Mango Aliyan
easy to use mongodb librabry using mongo driver module

<h2>Install</h2>
<code>npm i mango-aliyan</code>

<h2>Connect</h2>
Connect and get references all your collections across multiple databases.
<code>
const URL = "mongodb://127.0.0.1:27017/";
const collectionStructure ={
  "schooldb":["studentCollection","staffCollection"]
};

const mongo = new MangoAliyan(URL,collectionStructure,onceDBIsReady);
function onceDBIsReady(err, mongo){
    console.info("connected..");  
    //any db operations to be performed after establishing the connectivity
    //mongo.schooldb.studentCollection.[insert/distinct/findOne etc](..)
}
</code>
<h2>How to Use?</h2>
following code has be executed only after the db is connected.
<code>
 mongo.schooldb.studentCollection.[insert/distinct/findOne etc](..)
 </code>
 <h3>Or use the below cool way</h3>

    mongo.getList(someThingToBePassedOrNull,
      mongo.schooldb.studentCollection,
      {age:{$gt:13}},
      function(thatThingOrNull,collection,resultAsArray){
        console.log(resultAsArray);
      }
    );


