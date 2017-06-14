#! /usr/bin/python
# Written by Dan Mandle http://dan.mandle.me September 2012
# License: GPL 2.0

import os
from gps import *
from time import *
import time
import threading
import datetime
import urllib2

url="http://192.168.0.149:3001/api"
gpsd = None #seting the global variable

os.system('clear') #clear the terminal (optional)

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

def getGpsStatus(_mode):
    print(type(_mode))
    if _mode ==1 :
      mode = "Unvalid Data"
    elif _mode == 2:
      mode = "2D Fix"
    elif _mode == 3:
      mode = "3D Fix"
    else :
      mode = "Undefined Status"
    return mode


class GpsPoller(threading.Thread):
  def __init__(self):
    threading.Thread.__init__(self)
    global gpsd #bring it in scope
    gpsd = gps(mode=WATCH_ENABLE) #starting the stream of info
    self.current_value = None
    self.running = True #setting the thread running to true
    writeLog(url, "[INFO] GPS Poller Start", "GPS initialized successfully")

  def run(self):
    global gpsd
    while gpsp.running:
      gpsd.next() #this will continue to loop and grab EACH set of gpsd info to clear the buffer

if __name__ == '__main__':
  gpsp = GpsPoller() # create the thread
  try:
    gpsp.start() # start it up
    while True:
      #It may take a second or two to get good data
      #print gpsd.fix.latitude,', ',gpsd.fix.longitude,'  Time: ',gpsd.utc

      os.system('clear')

      print
      print ' GPS reading'
      print '----------------------------------------'
      print 'latitude    ' , gpsd.fix.latitude
      print 'longitude   ' , gpsd.fix.longitude
      print 'time utc    ' , gpsd.utc,' + ', gpsd.fix.time
      print 'system time ' , datetime.datetime.now()
      print 'altitude (m)' , gpsd.fix.altitude
      print 'eps         ' , gpsd.fix.eps
      print 'epx         ' , gpsd.fix.epx
      print 'epv         ' , gpsd.fix.epv
      print 'ept         ' , gpsd.fix.ept
      print 'speed (m/s) ' , gpsd.fix.speed
      print 'climb       ' , gpsd.fix.climb
      print 'track       ' , gpsd.fix.track
      print 'mode        ' , gpsd.fix.mode
      print '----------------------------------------'
#      print
#      print 'sats        ' , gpsd.satellites

      #check gps status.. if gps is not detected insert log
      if gpsd.fix.mode == 1:
	gps_status = getGpsStatus(gpsd.fix.mode)
        writeLog(url, "[INFO] Check GPS Status: "+str(gpsd.fix.mode), "GPS Status : "+ gps_status)
      elif gpsd.fix.mode == 2 or gpsd.fix.mode == 3:
        writeLog(url, "[INFO] Check GPS Status: ", "GPS Status : "+ gps_status)
        pushGPS(url, gpsd.fix.latitude, gpsd.fix.longitude, gpsd.fix.altitude, "Normal", "Normal", gps_status)
      time.sleep(10) #set to whatever

  except (KeyboardInterrupt, SystemExit): #when you press ctrl+c
    print "\nKilling Thread..."
    gpsp.running = False
    gpsp.join() # wait for the thread to finish what it's doing
  print "Done.\nExiting."
  writeLog(url, "[INFO] Agent Shutdown","Agent shutdown successfully")
