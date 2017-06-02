/*note:gps 등록*/
var push = function(params, callback) {
	console.log('JSON-RPC push 호출됨.');
	//console.dir(params);
	console.log(params);
	callback(null, "good");
};


module.exports = push;
