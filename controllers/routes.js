module.exports = function(app){
    var productController = require('./productController');

    link = function (req, res) {
        res.render('link', {title: 'Link'});
    };

    app.get('/', function (req, res) {
        res.render('main',{title: 'Solidoy - Main page'});
    });

    app.get('/insert',function (req,res) {
        productController.insertUser(req,res);
    });

    app.get('/link', link);
};