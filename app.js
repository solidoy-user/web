var express = require('express'),
    bodyParser = require('body-parser'),
    mongoDatabase = require('./config/database'),
    controller = require('./controllers/routes'),
    mongoose = require('mongoose');

// We instantiate express and other modules
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'jade');

mongoose.connect(mongoDatabase.database);
controller(app);

require("./.env");

if(ENVIRONMENT == "TESTING"){
    app.listen(8080, function(){
        console.log("Node server running on localhost:8080");
    });
} else {
    app.listen(80, function(){
        console.log("Node server in PRODUCTION running on solidoy.com");
    });
}