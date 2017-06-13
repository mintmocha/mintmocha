import urllib2

def callAPI(_url, _method, _id, _params):
	data = makeRequestDataString(_method,_params,_id)
	request = urllib2.Request(_url, data,{"Content-Type":"application/json"})
	response = urllib2.urlopen(request)
	print(_method, _params)

def makeRequestDataString(_method, _params, _id):
	data = '{"jsonrpc":"2.0","method":"'+_method+'","params":['+_params+'],"id":"'+str(_id)+'"}'
	return data

def writeLog(_url, _title, _log):
	params = '1, "'+_title+'", "'+_log+'"'
	callAPI(_url,"logging", "1003", params)

def pushGPS(_url, _lat, _lng, _alt, _status_device, _status_gps, _gps_mode):
	params = '1, "'+_lat+'", "'+ _lng +'" ,"'+ _alt +'", "' + _status_device +'", "'+ _status_gps +'", "'+ _gps_mode +'"'
	callAPI(_url, "push", "1002", params)

url="http://192.168.0.149:3001/api"
pushGPS(url, '12222','3333', '111', 'rasp', 'tst', '3d')
#data= '{"jsonrpc":"2.0","method":"push","params":[1,"1234","2341","111","test3","test1","test2"],"id":"1002"}'
#callAPI(url, 'logging', 1003, '1,"asdfasdf", "asdfasdf"')
#writeLog(url, "gg","1234")

