var book = require('./model_extended/book');

var rowInfo = {
	'name' : 'Node.js book',
	'author' : 'danhuang',
	'desc' : 'good book',
	'catalogue' : ['1', '2'],
	'content' : 'dasadasdasdasd',
	'cover' : 'http://blog.lovedan.cn',
	'pic_urls' : 'http://download.lovedan.cn',
	'category_ids' : ['1', '2'],
	'pdf_url' : 'http://download.lovedan.cn',
	'download_url' : 'http://download.lovedan.cn',
	'download_tips' : 'dddd',
	'buy_list' : 'http://blog.lovedan.cn'
};
book.addDataInDb(rowInfo, function(ret){
	console.log(ret);
});