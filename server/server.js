var express = require('express'),
	path = require('path'),
	app = express(),
    router = require('./router');;


//Resolves memory leak detection error
process.setMaxListeners(0);
//Set the view location directory, which will be shared to client browser
app.use('/node_modules', express.static('node_modules'));
app.use(express.static(path.join(__dirname,'../client')));


app.use('/',router);

//Creates an express server
var port = 9000,
	server = app.listen(port,function () {
		var os = require('os'),
			host = os.hostname(),
			port = server.address().port;
	});