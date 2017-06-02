var express = require('express');
var router = express.Router();

var Product = require('../model/product');

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find({}, function(err, product) {
  		res.render('shop/index', { products: product });
	});
});

module.exports = router;
