var Basemongo = require('../basemongo');
var basemongo = new Basemongo();

var rowInfo = {
	'name' : 'mongo444',
	'test_url' : 'http://blog.lovedan.cn', 
	'download_book' : 'http://download.lovedan.cn',
	'create_time' : new Date()
};

/* test for more insert more than one rowinfo */
basemongo.save('book', rowInfo, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});