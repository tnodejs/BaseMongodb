var Basemongo = require('../basemongo');
var basemongo = new Basemongo();

/* condition fields */
var removeCondition = {'name' : 'mongo4'};

basemongo.remove('book', removeCondition, false, function(result){
	if(false === result){
		console.log('insert error');
	} else {
		console.log(result);
	}
});