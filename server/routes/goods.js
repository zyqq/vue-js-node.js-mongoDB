var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/imooc');

mongoose.connection.on("connected", function() {
	console.log('MongoDB connected success')
})

mongoose.connection.on("error", function() {
	console.log('MongoDB connected error')
})

mongoose.connection.on("disconnected", function() {
	console.log('MongoDB connected disconnected')
})
// 商品数据查询
router.get('/', function(req, res, next) {
	let page = parseInt(req.param('page'));
	let pageSize = parseInt(req.param('pageSize'));
	let skip = (page - 1) * pageSize;
	let sort = req.param('sort');
	let priceLevel = req.param('priceLevel');
	var priceGt = '',
		priceLte = '';
	let params = {}
	if(priceLevel != 'all') {
		switch(priceLevel) {
			case '0':
				priceGt = 0;
				priceLte = 100;
				break;
			case '1':
				priceGt = 100;
				priceLte = 500;
				break;
			case '2':
				priceGt = 500;
				priceLte = 1000;
				break;
			case '3':
				priceGt = 1000;
				priceLte = 5000;
				break;
		}
		params = {
			productPrice: {
				$gt: priceGt,
				$lte: priceLte
			}
		}
		//		console.log(params)
	}

	let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
	goodsModel.sort({
		'productPrice': sort
	});

	goodsModel.exec((err, doc) => {
		if(err) {
			res.json({
				status: '1',
				msg: err.message
			});
		} else {
			res.json({
				status: '0',
				msg: '',
				result: {
					count: doc.length,
					list: doc
				}
			})
		}
	})
})

// 加入购物车
router.post('/addCart', (req, res, next) => {
	let userId = '1',
		productId = req.body.productId;
	let User = require('../modules/user');
	User.findOne({
		userId: userId
	}, (err, userDoc) => {
		if(err) {
			res.json({
				status: '1',
				msg: err.message
			})
		} else {
			console.log("userDoc:" + userDoc);
			if(userDoc) {
				let goodsItem = '';
				userDoc.cartList.forEach((item) => {
					if(item.productId == productId) {
						goodsItem = item;
						item.productNum++;
					}
				})
				// 如果购物车中已存在添加的商品
				if(goodsItem) {
					userDoc.save((err2, doc2) => {
						if(err2) {
							res.json({
								status: '1',
								msg: err2.message
							})
						} else {
							res.json({
								status: '0',
								msg: '',
								result: 'success'
							})
						}
					})
				} else {
					Goods.findOne({
						productId: productId
					}, (err1, doc) => {
						if(err) {
							res.json({
								status: '1',
								msg: err1.message
							})
						} else {
							if(doc) {
								doc.productNum = 1;
								doc.checked = 1;
								userDoc.cartList.push(doc);
								userDoc.save((err2, doc2) => {
									if(err2) {
										res.json({
											status: '1',
											msg: err2.message
										})
									} else {
										res.json({
											status: '0',
											msg: '',
											result: 'success'
										})
									}
								})
							}
						}
					})
				}
			}
		}
	})
})

module.exports = router;