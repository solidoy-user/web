var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser');
    http = require('http');

    require("./routes/controller")(app);


//Instanciem l'objecte express
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//optional , el motor de renderitzar per defecte es jade
//app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.listen(80, function(){
    console.log("Node server running on localhost:3000");
});