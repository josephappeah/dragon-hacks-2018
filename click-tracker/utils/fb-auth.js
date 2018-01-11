//===================================================
//	AUTHOR 	: JOSEPH APPEAH
//  DESC    : FIREBASE AUTHENTICATION FOR USERS
//===================================================

// UTILS & GLOBAL VARS
var firebase    	= require('firebase');
var fb_admin    	= require("firebase-admin");
var config			= require('../config/fb-config.js');
var fb_admin_config	= require('../config/fb-admin-config.json');
var logger          = require('./logger.js');
var self            = require('./fb-auth.js');
var dbprocs         = require('./dbprocs.js');
var fb_config       = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId
};

//
firebase.initializeApp(fb_config);
fb_admin.initializeApp({
    credential  : fb_admin.credential.cert(fb_admin_config),
    databaseURL : config.databaseURL
});

// LOGIN A USER
module.exports.login = function(email,password) {
    
    //
    logger.info("logging in user : " + email );

    // HANDLE USER LOGIN
	return new Promise(function(resolve,reject) {

		firebase.auth().signInWithEmailAndPassword(email,password)

            .catch(function(error) {
                logger.error("failed to log in user : " + email + " with error : " + error.message);
                resolve(JSON.stringify({ status : false, message : error.message}));
            })

            .then(function() {
		        firebase.auth().currentUser.getIdToken(true)

                    .then(function(idToken) {
		                resolve(JSON.stringify({
		                    status : true,
		                    message : "log in successful",
		                    user : firebase.auth().currentUser,  
		                    uid : firebase.auth().currentUser.uid,
		                    token : idToken
		                }));
		            })

                    .catch(function(error) {
                        logger.error("failed to obtain token for user : " + email + " with error : " + error.message);
                        self.logout(firebase.auth().currentUser.uid);
                        resolve(JSON.stringify({ status : false, message : error.message}));
		            });
    	    });
	});

}


// LOGOUT A USER
module.exports.logout = function(uid) {
    //
    logger.info("logging out user " + uid);

    // HANDLE LOGOUT
	return new Promise( function(resolve, reject) {

		fb_admin.auth().getUser(uid)
      		.then(function(userRecord) {
                logger.error("successfully logged out user : " + uid)
        		resolve(true);
    		}).catch( function(error) {
                logger.error("failed to logout user : " + uid + " with error : " + error.message);
        		resolve(false);
    		});	
	});

}


// AUTHENTICATE A USER
module.exports.auth = function (token) {
    //
    logger.info("authenticating token")

    // HANDLE TOKEN AUTHRNTICATION
	return new Promise (function(resolve, reject) {

		fb_admin.auth().verifyIdToken(token)
      		.then(function(decodedToken) {
                logger.info("token successfully authenticated")
        		resolve(true);
    		})
            .catch(function(error) {
                logger.error("failed to authenticate token with error : " + error.message)
        		resolve(false);
    		});
	});
}


// SIGNUP USER
module.exports.signup = function(new_user_object) {
    //
    logger.info("signing up user : " + new_user_object.email)

    // HANDLE USER SIGN UP
	return new Promise (function(resolve, reject) {
		fb_admin.auth().createUser({
	  		email: new_user_object.email,
	 		emailVerified: false,
	  		phoneNumber: new_user_object.phoneNumber,
	  		password: new_user_object.password,
	  		displayName: new_user_object.displayName,
	  		photoURL: new_user_object.photoURL,
	  		disabled: false
		})
  		.then(function(userRecord) {
            logger.info("successfully signed up user : " + new_user_object.email);
            dbprocs.addUser(userRecord)
    		    .then(function(success){
                    logger.info("adding user to db: " + new_user_object.email)
                    resolve(userRecord);
                })
                .catch(function(err){
                    logger.error(err);
                })
            resolve(userRecord);
  		})
  		.catch(function(error) {
            logger.error("failed to sign up user : " + new_user_object.email + " with error : " + error.message)
    		resolve(error);
  		});
	});
}