/**
 * @desc mongodb base class 
 * @author danhuang
 * @time 20150408
 */
var DB_TMP = {};
var mongodb = require('mongodb');

module.exports = function(){
	var configure_file = arguments[0] ? arguments[0] : '';
	var timeout        = arguments[1] ? arguments[1] : 3;
	
	var self = this;
	
	var Db      = mongodb.Db,
    MongoClient = mongodb.MongoClient,
    Server      = mongodb.Server;
	
	// 初始化部分对象
    this.ReplSetServers = mongodb.ReplSetServers;
    this.ObjectID       = mongodb.ObjectID;
    this.Binary         = mongodb.Binary;
    this.GridStore 		= mongodb.GridStore;
    this.Grid 			= mongodb.Grid;
    this.Code 			= mongodb.Code;
	this.mongo          = mongodb;
	
	/**
	 * @desc 数据库连接
	 * 回调函数返回连接的DB对象
	 *
	 */
	function connection(tableName, callback){
		var connect_url = get_db_connect_url();
		if(DB_TMP['db']){
			DB_TMP['db'].collection(tableName, function(err, collection){
				if(err){
					console.log('basemongo can not connection with db table error');
					process.exit(1);
				}
				callback(collection);
			});
			return;
		}
		MongoClient.connect(connect_url, {native_parser:true}, function(err, db) {
			if(err){
				console.log('basemongo can not connection with db');
				process.exit(1);
			} 
			DB_TMP['db'] = db;
			if(!tableName){
				return;
			}
			db.collection(tableName, function(err, collection){
				if(err){
					console.log('basemongo can not connection with db table error');
					process.exit(1);
				}
				callback(collection);
			});
		});
	}
	
	/**
	 * @desc 初始化mongodb的连接对象
	 *
	 */
	this.initConnecnt = function(){
		connection(false, function(db){
			DB_TMP['db'] = db;
		});
	}
	
	/**
	 * @desc 查询单条数据记录
	 * @params condition json {'name':'danhuang'}
	 * @params fields json such as {'_id':-1, 'name':1}
	 * @params callback function 
	 */
	this.findOne = function(){
		var tableName = arguments[0] ? arguments[0] : null;
		var condition = arguments[1] ? arguments[1] : null;
		var callback  = arguments[2] ? arguments[2] : 0;
		var fields    = arguments[3] ? arguments[3] : null;
		connection(tableName, function(db){
			var options = filter_options(fields);
			db.findOne(condition, options, function(err, result){
				if(err){
					callback(false);
				} else {
					callback(result);
				}
			});
		})
	}
	
	/**
	 * @desc 查询多条数据记录
	 * @params condition json {'name':'danhuang'}
	 * @params fields json such as {'_id':-1, 'name':1}
	 * @params limit int such as 5
	 * @params skip int such as 5
	 * @params sort json such as {'name':1}
	 * @params callback function 
	 */
	this.find = function(tableName){
		var tableName = arguments[0] ? arguments[0] : null;
		var condition = arguments[1] ? arguments[1] : null;
		var callback  = arguments[2] ? arguments[2] : 0;
		var fields    = arguments[3] ? arguments[3] : null;
		var limit     = arguments[4] ? arguments[4] : 0;
		var skip      = arguments[5] ? arguments[5] : 0;
		var sort      = arguments[6] ? arguments[6] : null;
		
		connection(tableName, function(db){
			var options = filter_options(fields, limit, sort, skip);
			console.log(options);
			db.find(condition, options).toArray(function(err, result){
				if(err){
					console.log(err);
					callback(false);
				} else {
					callback(result);
				}
			});
		})
	}
	
	/**
	 * @desc 插入多条数据
	 * @params rowInfo json {'name':'danhuang'}
	 * @params callback function 
	 */
	this.insert = function(tableName, rowInfos, callback){
		connection(tableName, function(db){
			db.insert(rowInfos, function(err, result){
				if(err){
					callback(false);
				} else {
					callback(result['ops']);
				}
			});
		})
	}
	
	/**
	 * @desc 删除单条数据
	 * @params condition json {'name':'danhuang'}
	 * @params callback function 
	 */
	this.remove = function(tableName, condition, callback){
		connection(tableName, function(db){
			db.remove(condition, function(err, result){
				if(err){
					callback(false);
				} else {
					callback(get_result(result));
				}
			});
		})
	}
	
	/**
	 * @desc 插入单条数据
	 * @params rowInfo json {'name':'danhuang'}
	 * @params callback function 
	 */
	this.save = function(tableName, rowInfo, callback){
		connection(tableName, function(db){
			db.insert(rowInfo, function(err, result){
				if(err){
					callback(false);
				} else {
					callback(result['ops'][0]['_id']);
				}
			});
		})
	}
	
	/**
	 * @desc 更新单条数据
	 * @params condition json {'name':'danhuang'}
	 * @params rowInfo json {'name':'danhuang'}
	 * @params callback function 
	 */
	this.update = function(tableName, condition, rowInfo, update_set, callback){
		var rowInfo = update_set ? {'$set' : rowInfo} : rowInfo;
		connection(tableName, function(db){
			db.update(condition, rowInfo, function(err, result){
				if(err){
					callback(false);
				} else {
					callback(get_result(result));
				}
			});
		})	
	}
	
	/**
	 * @desc 更新所有数据
	 * @params condition json {'name':'danhuang'}
	 * @params rowInfo json {'name':'danhuang'}
	 * @params callback function 
	 */
	this.updateAll = function(tableName, condition, rowInfo, update_set, callback){
		var rowInfo = update_set ? {'$set' : rowInfo} : rowInfo;
		connection(tableName, function(db){
			options = {'multi' : true};
			db.update(condition, rowInfo, options, function(err, result){
				if(err){
					callback(false);
				} else {
					callback(get_result(result));
				}
			});
		})	
	}
	
	/**
	 * @desc 删除单条数据
	 * @params condition json {'name':'danhuang'}
	 * @params callback function 
	 */
	this.count = function(tableName, condition, callback){
		connection(tableName, function(db){
			db.count(condition, function(err, count){
				if(err){
					callback(false);
				} else {
					callback(count);
				}
			});
		})	
	}
	
	/**
	 * @desc The distinct command returns returns a list of distinct values for the given key across a collection.
	 * @params key string the distinct key
	 * @params condition json {'name':'danhuang'}
	 * @params callback function 
	 */
	this.distinct = function(tableName, key, condition, callback){
		connection(tableName, function(db){
			db.distinct(key, condition, function(err, docs){
				if(err){
					callback(false);
				} else {
					callback(docs);
				}
			});
		})	
	}
	
	/**
	 * @desc Find and update a document.
	 * @params condition json {'name':'danhuang'}
	 * @params rowInfo json {'name':'danhuang'}
	 * @params callback function 
	 */
	this.findAndModify = function(tableName, condition, rowInfo, callback){
		var updates = {'$set': rowInfo};
		connection(tableName, function(db){
			db.findAndModify(condition, updates, {new:true}, function(err, result){
				if(err){
					callback(false);
				} else {
					callback(get_result(result));
				}
			});
		})	
	}
	
	/**
	 * @desc Find and remove a document.
	 * @params condition json {'name':'danhuang'}
	 * @params callback function 
	 */
	this.findAndRemove = function(tableName, condition, callback){
		connection(tableName, function(db){
			db.findAndRemove(condition, function(err, result){
				if(err){
					callback(false);
				} else {
					callback(get_result(result));
				}
			});
		})	
	}
	
	/**
	 * @desc 对option参数进行处理，添加默认值
	 * 
	 */
	function filter_options(){
		var fields = arguments[0] ? arguments[0] : null;
		var limit  = arguments[1] ? arguments[1] : 0;
		var sort   = arguments[2] ? arguments[2] : null;
		var skip   = arguments[3] ? arguments[3] : 0;
		
		var options = {};
		
		if(limit !== 0){
			options.limit   = limit;
		}
		if(skip !== 0){
			options.skip    = skip;
		}
		if(fields){
			options.fields  = fields;
		}
		if(sort){
			options.sort    = sort;
		}
		options.timeout = timeout ;
		return options;
	}
	
	function get_db_connect_url(){
		/*var dbConfig = LIBRARY.getConfig('mongodb', 'db');
		var host = dbConfig['host']
		  , port = dbConfig['port']
		  , dbName = dbConfig['db_name']
		  , user = dbConfig['user']
		  , password = dbConfig['password'];
		*/
		var host = 'localhost';
		var port = '27017';
		var user = '';
		var password = '';
		var dbName = 'test_book';
		
		if(!user && !password){
			return "mongodb://" + host + ":" + port + "/" + dbName;
		}
		return "mongodb://" + user + ":" + password + "@" + host + ":" + port + "/" + dbName;
	}
	
	/**
	 * @desc 对mongodb库返回做filter
	 *
	 */
	function get_result(result){
		if(!result['result']){
			return false;
		}
		if(result['result']['ok'] != 1){
			return false;
		}
		if(result['result']['n'] < 1){
			return false;
		}
		return true;
	}
}