var Basemongo = require('../basemongo');
var basemongo = new Basemongo();

var updateCondition = {'test_url' : 'http://blog.lovedan.cn'};
var updateInfo = {'other_things' : 'test by update all'};

/* test for update one rowinfo */

basemongo.updateAll('book', updateCondition, updateInfo, true, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});