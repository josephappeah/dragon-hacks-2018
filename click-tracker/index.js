//===================================================================
//	AUTHOR 	: JOSEPH APPEAH, AGASTYA SINHA
//	DESC 	: CLICK TRACKER SERVER
//===================================================================

var express 	= require('express');
var bodyParser 	= require('body-parser')
var service     = express();

// UTILS ============================================================
var config	    = require('./config/config.js');
var auth 		= require('./utils/fb-auth.js');
var processes 	= require('./utils/processes.js');
var structs 	= require('./storage/structs.js');
var logger      = require('./utils/logger.js');

service.use(bodyParser.json());

// SERVE A CLIENT ====================================================
service.use(express.static('./client/bower_components'));
service.use(express.static('client'));

// ENDPOINTS =========================================================

// LOG IN
service.post(config.version + '/login', (req,res,next) => {
	//
	logger.info("logging in user...")

	// PULL PAYLOAD
	var payload 		= req.body;

	// AUTHENTICATE
	auth.login(payload.email, payload.password)
		.then(function(success){
			res.send(success);
		});	
});

// SIGN UP
service.post(config.version + '/signup', (req,res,next) => {
	//
	logger.info("signing up user...")

	// PULL PAYLOAD
	var payload 		= req.body;
	var user   			= structs.user;

	user.email 			= payload.email;
	user.phoneNumber 	= payload.phoneNumber;
	user.password 		= payload.password;
	user.displayName 	= payload.displayName;
	user.photoURL 		= payload.photoURL;

	auth.signup(user)
		.then( function(success) {
			res.send(success);
		});
});

// LOG OUT
service.post(config.version + '/logout', (req,res,next) => {
	//
	logger.info("logging out user...")

	// PULL PAYLOAD
	var payload 		= req.body;

	res.send(auth.logout(payload.uid));
});

// UPDATE DATA FOR AN EXISTING WEBSITE
service.post(config.version + '/update-tracking-data', (req,res,next) => {

	//
	processes.updateTrackingData(req.body)
		.then(function(resolve, reject) {
			res.json(JSON.strigify({status: true}))
		})
		.catch(function(err) {
			res.json(JSON.strigify({status: false}))
		})
});


// CHECK TOKEN VALIDITY
service.post(config.version + '/validate-token', (req,res,next) => {
	//
	auth.auth(req.body.token)
		.then(function(status) { 
			if (!status) {
				res.json(JSON.strigify({status: false}))
			} else {
				res.json(JSON.strigify({status: true}))
			}
		});
});

// START TRACKING A NEW WEBSITE
service.post(config.version + '/start-website-tracking', (req,res,next) => {
	//
	auth.auth(req.body.token)
		.then(function(status) { 
			if (!status) {
				res.send("invalid token");
			} else {
				//
				processes.startWebsiteTracking(req.body.website, req.body.user)
					.then(function(success) {
						res.json(success);
					});
			}
		});
});

// END TRACKING A NEW WEBSITE
service.post(config.version + '/end-website-tracking', (req,res,next) => {
	//
	auth.auth(req.body.token)
		.then(function(status) { 
			if (!status) {
				res.send("invalid token");
			} else {
				//
				processes.endWebsiteTracking(req.body.website, req.body.user)
					.then(function(success) {
						res.json(success);
					});
			}
		});
});


// LAUNCH ============================================================
service.listen(config.port);
console.log("=========================================================")
console.log("====================STARTING SERVER======================")
console.log("=========================================================")
console.log("               LISTENING ON PORT : '" + config.port + "'");
console.log("=========================================================")
console.log("=========================================================")