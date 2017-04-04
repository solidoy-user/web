var http = require("http");
var express = require("express");
var app = express();
app.get("/",function(req,res) {
	res.send("<h1>Welcome to Solidoy</h1>");
});

app.listen(80);
console.log("Magic on port 80");
