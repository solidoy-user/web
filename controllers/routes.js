module.exports = function(app){

    link = function (req, res) {
        res.render('link', {title: 'Link'});
    };

    app.get('/', function (req, res) {
        res.render('main',{title: 'Solidoy - Main page'});
    });

    app.get('/link', link);
};