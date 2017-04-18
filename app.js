const express = require('express'),
      bodyParser = require('body-parser'),
      routes = require('./routes/routes'),
      config = require('./config'),
      mongoose = require('mongoose');

// We instantiate express and other modules
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'jade');

routes(app);

// Connect to the database
mongoose.connect(config.db);
mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});
//require("./.env");

app.listen(config.port,function () {
    console.log(`Node Server running on port ${config.port}`);
})
/*
if(ENVIRONMENT == "TESTING"){
    app.listen(8080, function(){
        console.log("Node server running on localhost:8080");
    });
} else {
    app.listen(80, function(){
        console.log("Node server in PRODUCTION running on solidoy.com");
    });
}
    */
