//======================================================
//	AUTHOR 	: JOSEPH APPEAH
// 	DESC	: CONTAINS ALL DB RELATED PROCESSES	
//======================================================

module.exports.cleanWebsite = function(website) {
	return new Promise ( function(resolve, reject) {
		resolve(website.replace("https://", ""));
	});
}


module.exports.updateTrackingOnWebsite = function(current, payload) {
	//
	return new Promise (function(resolve, reject) {
		for (var key in payload) {
    		if (current.hasOwnProperty(key)) {
        		current[key] = parseInt(current[key]) + parseInt(payload[key]);
    		} else {
    			current[key] = payload[key];
    		}
		}
		
		resolve(current);
	});	
}