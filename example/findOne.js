var Basemongo = require('../basemongo');
var basemongo = new Basemongo();

/* condition fields */
var condition = {'test_url' : 'http://blog.lovedan.cn'};
var fields    = {"create_time":0};

basemongo.findOne('book', condition, function(result){
	if(false === result){
		console.log('find error');
	} else {
		console.log(result);
	}
}, fields);