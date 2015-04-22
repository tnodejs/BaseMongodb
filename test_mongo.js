var Basemongo = require('./basemongo');
var basemongo = new Basemongo();

var rowInfo = {
	'name' : 'mongo',
	'test_url' : 'http://blog.lovedan.cn', 
	'download_book' : 'http://download.lovedan.cn',
	'create_time' : new Date()
};

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

basemongo.initConnecnt();

/* test for more insert more than one rowinfo */
/*basemongo.insert('book', rowInfos, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});
*/
/* test for insert one rowinfo */
/*
basemongo.save('book', rowInfo, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});
*/
/* condition fields */
var condition = {'test_url' : 'http://blog.lovedan.cn'};
var fields    = {"create_time":0};

/* test for find rowinfo */
/*
basemongo.find('book', condition, function(result){
	if(false === result){
		console.log('find error');
	} else {
		console.log(result);
	}
}, fields);
*/

/* test for find one rowinfo */
/*
basemongo.findOne('book', condition, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
}, fields);
*/
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

var updateCondition = {'test_url' : 'http://blog.lovedan.cn'};
var updateInfo = {'other_things' : 'test by update all'};
/* test for update all rowinfo */
/*
basemongo.updateAll('book', updateCondition, updateInfo, true, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});
*/
/* test for find the condition count */
/* 
var countCondition = {'test_url' : 'http://blog.lovedan.cn'};
basemongo.count('book', countCondition, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});
*/
var removeCondition = {'name' : 'mongo3'};
/* test for find one rowinfo */
/*
basemongo.remove('book', removeCondition, false, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});
*/

var findCondition = {'test_url' : 'http://blog.lovedan.cn'};
var updateInfo = {'other_things' : 'test by find and modify'};
/*
basemongo.findAndModify('book', findCondition, updateInfo, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});
*/













