var express = require("express"),
    bodyParser = require('body-parser'),
    routes = require('./routes/routes'),
    config = require('./config'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    passport = require('passport');

// We instantiate express and other modules
var app = express();

// Cors Middleware
app.use(cors());

// Set static folder
app.use(express.static(__dirname + '/public'));

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the view engine
app.set('view engine', 'jade');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport')(passport);

// Run the routes
routes(app);

// Connect to the database
mongoose.connect(config.db);
mongoose.connection.on("open", function() {
    console.log(`Connected to ${config.db}`);
});

mongoose.connection.on("error", function(err) {
    console.log(`Could not connect to ${config.db}`);
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