var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	"productId": {type: String},
	"productName": String,
	"prodcutPrice": Number,
	"prodcutImg": String,
	"productNum": Number,
	"checked": String
});

module.exports = mongoose.model('Good', productSchema);

