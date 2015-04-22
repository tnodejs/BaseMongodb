var Basemongo = require('../basemongo');
var basemongo = new Basemongo();

var rowInfos = [
	{
		'name' : 'mongo2',
		'test_url' : 'http://blog.lovedan.cn', 
		'download_book' : 'http://download.lovedan.cn',
		'create_time' : new Date()
	},
	{
		'name' : 'mongo3',
		'test_url' : 'http://blog.lovedan.cn', 
		'download_book' : 'http://download.lovedan.cn',
		'create_time' : new Date()
	}
];

basemongo.insert('book', rowInfos, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});

