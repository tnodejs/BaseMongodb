var Basemongo = require('../basemongo');
var basemongo = new Basemongo();

var updateCondition = {'name' : 'mongo4'};
var updateInfo = {'other_things' : 'test', 'name' : 'mongo4', 'test_url' : 'http://blog.lovedan.cn'};

/* test for update one rowinfo */

basemongo.update('book', updateCondition, updateInfo, true, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});