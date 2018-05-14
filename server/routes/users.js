var express = require('express');
var router = express.Router();
var User = require('./../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function(req, res, next) {
  let param = {
  	userName: req.body.userName,
  	userPwd: req.body.userPwd
  }
  User.findOne(param, (err, doc)=>{
  	if(err){
  		res.json({
  			status: '1',
  			msg: err.message
  		})
  	}else{
  		if(doc){
  			res.cookie('userId', doc.userId, {
  				path: '/',
  				maxAge: 1000*60*60
  			});
//			res.session.user = 
  			res.json({
  				status: '0',
  				msg: '',
  				result: {
  					userName:doc.userName
  				}
  			})
  		}else{
  			res.json({
  				status: '1',
  				msg: '密码错误'
  			})
  		}
  	
  	}
  })
});
module.exports = router;
