var ProductModel = require('../models/product');
var newPro = new ProductModel(
    {'codPro': 1, 'title': "Hola mundo"}
);
function _insertUser(req,res) {
    newPro.save(function (err, list) {
        if (err) throw err;
        console.log(list);
        res.json(list);
        //
        // return list;
    });
}


module.exports = {
    insertUser: _insertUser
};