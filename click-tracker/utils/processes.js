//======================================================
//	AUTHOR 	: JOSEPH APPEAH
// 	DESC	: CONTAINS ALL FUNCTIONS
//======================================================

var dbprocs    	= require('./dbprocs.js');
var utils    	= require('./utils.js');

//
module.exports.updateTrackingData = function (payload) {
	
	//
	return new Promise (function (resolve, reject) {
		dbprocs.getWebsite (payload.website)
			.then(function (website) {
				if(website != null) {
					dbprocs.updateWebsiteTracking(
							payload.website, 
							utils.updateTrackingOnWebsite(website, payload.data)
						).then( function(success) {
							resolve(true)
						})
						.catch( function(err){
							logger.error(err);
						})
				}
			})
			.catch(function (err) {
				logger.error(err);
			});
	});
}

//
module.exports.startWebsiteTracking = function(website, user) {

	//
	return new Promise( function(resolve, reject){
		dbprocs.getUser(user)
			.then(function(db_user_object) {
				dbprocs.addWebsite(website, db_user_object) 
					.then(function(success) {
						resolve(success);
					})
					.catch(function(err) {
						logger.error(err);
					})
			})
			.catch(function(err){
				logger.error(err);
			});
	})
}


//
module.exports.endWebsiteTracking = function(website, user) {

	//
	return new Promise( function(resolve, reject){
		dbprocs.getUser(user)
			.then(function(db_user_object) {
				dbprocs.deleteWebsite(website, db_user_object) 
					.then(function(success) {
						resolve(success);
					})
					.catch(function(err) {
						logger.error(err);
					})
			})
			.catch(function(err){
				logger.error(err);
			});
	})
}