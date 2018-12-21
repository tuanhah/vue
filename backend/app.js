
var express = require('express');
var path = require('path');
var connection = require('./connection'); 
var ROOT_URL = "/home/tuan/Desktop/Workspace/teneocto/lab01";
var app = express();

// var bodyParser = require("body-parser");
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/public')));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.bodyParser());
try {
    connection.con.connect();
    console.log("database success");
}
catch(err){
    throw err;
    // console.log("have some error when connection with database");
}



app.get("/",function(req,res){
    
    connection.con.query('SELECT * from lab01', function (err, rows, fields) {
        if (err) throw err;
      
        console.log('The solution is: ', rows[0]);
      })
    res.sendFile(path.join(ROOT_URL+"/frontend/public/page/upload.html"));
    
});
app.post("/upload",function(req,res){
    // var post_data = req.body;
    
    console.log(req);
    res.send({"dt" : true});
    
});

app.listen(3000, function () {
    console.log('running at 3000 !');
});
