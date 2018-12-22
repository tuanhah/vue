
var express = require('express');
var path = require('path');
var connection = require('./connection'); 
var ROOT_URL = "/home/tuan/Desktop/Workspace/teneocto/lab01";
var app = express();

var bodyParser = require("body-parser");
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/public')));


try {
    connection.con.connect();
    console.log("database success");
}
catch(err){
    throw err;

}

function select_all(res){
    connection.con.query('SELECT * from lab01', function (err, rows, fields) {
        if (err) throw err;
        // console.log(rows);
        res.send(rows);

    })
}
app.get("/",function(req,res){
    

    // connection.con.query('SELECT * from lab01', function (err, rows, fields) {
        // if (err) throw err;
      
        // console.log('The solution is: ', rows[0]);
      // })
    res.sendFile(path.join(ROOT_URL+"/frontend/public/page/upload.html"));
    
});
app.post("/get-data",function(req,res){
    select_all(res);
})
app.post("/upload",function(req,res){
    var post_data = req.body;
    
    
    var insert_sql = "INSERT INTO lab01 (name,category,description,price, image) VALUES ('"+post_data.name +"','"+post_data.category+"','"+post_data.description+"','"+post_data.price+"','"+post_data.image+"');";
    // console.log(insert_sql);
    connection.con.query(insert_sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    select_all(res);
    // res.send({"result":true});
    
    
});


app.post("/update",function(req,res){
    var post_data = req.body;
    var update_sql="update lab01 set name ='"+post_data.name+"',price ='"+
                    post_data.price+"',category ='"+ post_data.category
                    +"',description ='" +post_data.description+"' where id =" +post_data.id+";";
    connection.con.query(update_sql, function (err, result) {
        if (err) throw err;
        console.log("1 record update");
    });
    select_all(res);
})

app.post("/delete",function(req,res){
    var post_data = req.body;
    var delete_sql ="DELETE FROM lab01 where id ="+post_data.id+";";
    connection.con.query(delete_sql, function (err, result) {
        if (err) throw err;
        console.log("1 record deleted");
    });
    select_all(res);
})

app.listen(6021, function () {
    console.log('running at 6021 !');
});
