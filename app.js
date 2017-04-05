var express = require("express"),
    bodyParser = require('body-parser'),
    http = require('http');

//Instanciem l'objecte express
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//optional , el motor de renderitzar per defecte es jade
//app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

require("./controllers/routes")(app);

app.listen(80, function(){
    console.log("Node server running on localhost:80");
});