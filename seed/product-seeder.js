var mongoose = require('mongoose');
var Product = require('../model/product');

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/cartex');

var products = [
	new Product({
		imagePath: 'http://www.laptopmag.com/images/uploads/4989/g/apple-macbook-pro-13-2016-nw-g02.jpg',
		name: 'MacBook Pro 2016',
		description: 'Should we really call this a pro?',
		price: 1299
	}),
	new Product({
		imagePath: 'https://ss7.vzw.com/is/image/VerizonWireless/pdp-feature4-d-iphone7-bn-v2?&scl=1&bgc=ffffff&scl=1&scl=2',
		name: 'iPhone 7 Plus',
		description: 'iPhone with no headphone jack. Lmao',
		price: 899
	}),
	new Product({
		imagePath: 'https://www.extremetech.com/wp-content/uploads/2014/02/nokia-x-range.jpg',
		name: 'Nokia X',
		description: 'Failed Nokia Normandy project',
		price: 99
	}),
	new Product({
		imagePath: 'http://cdn2.gsmarena.com/vv/pics/nokia/nokia-n9-all-1.jpg',
		name: 'Nokia N9',
		description: 'Dead on arrival Meego OS powered smartphone',
		price: 56
	}),
	new Product({
		imagePath: 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macbook/air/macbook-air-gallery2-2014?wid=1292&hei=766&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1476297407703',
		name: 'MacBook Air',
		description: 'Most portable notebook from Apple',
		price: 999
	})
];

var done = 0;

for(var i=0; i < products.length; i++ ) {
	var saved = products[i].save();

	saved.then(function() {
		done++;

		if(done === products.length) {
			disconnect();
		}
	});
}

function disconnect() {
	mongoose.disconnect();
	console.log("Product seeding done!! Inserted " + products.length + " items.");
}