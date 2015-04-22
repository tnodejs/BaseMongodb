/**
 *
 * @type class
 * @author danhuang
 * @time 2015-04-07
 * @desc 主要用于新增book数据
 */
var Model = require('../../basemongo');
var SYS   = require('util');
function Book(){
 	var _self = this;
	
	var _tableName = 't_book';
	var _fields    = [
		'id',
		'name',
		'author',
		'desc',
		'catalogue',
		'content',
		'cover',
		'pic_urls',
		'category_ids',
		'pdf_url',
		'download_url',
		'download_tips',
		'buy_list'// [{'shop_name':'','desc':'','url':''}]
	];
	Model.call(_self);
	
	SYS.inherits(_self, Model);

	this.addDataInDb = function(rowInfo, callback){
		_self.save(_tableName, rowInfo, function(ret){
			if(ret){
				callback(ret);
			} else {
				callback(false);
			}
		});
	};
}

var book = new Book();
exports.addDataInDb = book.addDataInDb;
