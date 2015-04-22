var Basemongo = require('../basemongo');
var basemongo = new Basemongo();

/* condition fields */
var countCondition = {'test_url' : 'http://blog.lovedan.cn'};

basemongo.count('book', countCondition, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});