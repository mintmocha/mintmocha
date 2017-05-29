/*note:gps 등록*/
var push = function(params, callback) {
	console.log('JSON-RPC push 호출됨.');
	console.dir(params);
	
	// 파라미터 체크
	if (params.length < 2) {  // 파라미터 부족
		callback({
            code: 400,
            message: 'Insufficient parameters'
        }, null);
		
		return;
	}
	
};


module.exports = push;