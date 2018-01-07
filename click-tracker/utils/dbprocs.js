//======================================================
//	AUTHOR 	: JOSEPH APPEAH
// 	DESC	: CONTAINS ALL DB RELATED PROCESSES	
//======================================================

//  UTILS & GLOBAL VARS ================================

var config		= require('../config/config.js');
var logger 		= require('./logger.js');
var mysql 		= require('mysql');
var con 		= mysql.createPool ({
  	host	 : "localhost",
  	database : "click_tracker",
    user 	 : config.dbUser,
    password : config.dbPassword
});

//
module.exports.addUser = function (user) {
	//
	var query = "INSERT INTO users (uid, email,  email_verified, phone_number, display_name, photo_url, disabled) VALUES ('"+ user.uid + "','" + user.email +"',"  + user.emailVerified +",'" + user.phoneNumber + "','" +user.displayName + "','" + user.photoURL + "'," + user.disabled + ")";

	//
	return new Promise (function (resolve, reject) {
		con.getConnection(function(err, conn) {
	  		if (err) {
	  			logger.error(err);
	  		}
			conn.query(query, function(err, rows, fields) {
	  			if (err) {
	  				logger.error(err);
	  			}
			    //resolve(JSON.parse(JSON.stringify(rows))[0].status);
			    conn.release();
			});
		});
	});
}

//
module.exports.getUser = function (user) {
	//
	var query = "SELECT * FROM users WHERE uid = '" + user.uid + "'";

	//
	return new Promise (function (resolve, reject) {
		con.getConnection(function(err, conn) {
	  		if (err) {
	  			logger.error(err);
	  		}
			conn.query(query, function(err, rows, fields) {
	  		if (err) {
	  			logger.error(err);
	  		}
			    //resolve(JSON.parse(JSON.stringify(rows))[0].status);
			    conn.release();
			});
		});
	});
}

//
module.exports.deleteUser = function (user) {
	//
	var query = "DELETE FROM users WHERE uid = '" + user.uid + "'";

	//
	return new Promise (function (resolve, reject) {
		con.getConnection(function(err, conn) {
	  		if (err) {
	  			logger.error(err);
	  		}
			conn.query(query, function(err, rows, fields) {
	  		if (err) {
	  			logger.error(err);
	  		}
			    //resolve(JSON.parse(JSON.stringify(rows))[0].status);
			    conn.release();
			});
		});
	});
}

//
module.exports.addWebsite = function (website, user) {
	//
	var query = "INSERT INTO websites (name, owner , owner_uid, tracking, active) VALUES ('"+ website +"', '"+ user.id +"', '"+ user.uid+"', null, true)";

	//
	return new Promise (function (resolve, reject) {
		con.getConnection(function(err, conn) {
	  		if (err) {
	  			logger.error(err);
	  		}
			conn.query(query, function(err, rows, fields) {
	  		if (err) {
	  			logger.error(err);
	  		}
			    //resolve(JSON.parse(JSON.stringify(rows))[0].status);
			    conn.release();
			});
		});
	});
}


//
module.exports.getWebsite = function (website) {
	//
	var query = "SELECT * FROM websites WHERE name = '"  + website + "'";

	//
	return new Promise (function (resolve, reject) {
		con.getConnection(function(err, conn) {
	  		if (err) {
	  			logger.error(err);
	  		}
			conn.query(query, function(err, rows, fields) {
	  		if (err) {
	  			logger.error(err);
	  		}
			    //resolve(JSON.parse(JSON.stringify(rows))[0].status);
			    conn.release();
			});
		});
	});
}

//
module.exports.deleteWebsite = function (website, user) {
	//
	var query = "DELETE FROM websites WHERE name = '"  + website + "' LEFT JOIN users WHERE uid = '" + user.uid + "'";

	//
	return new Promise (function (resolve, reject) {
		con.getConnection(function(err, conn) {
	  		if (err) {
	  			logger.error(err);
	  		}
			conn.query(query, function(err, rows, fields) {
	  		if (err) {
	  			logger.error(err);
	  		}
			    //resolve(JSON.parse(JSON.stringify(rows))[0].status);
			    conn.release();
			});
		});
	});
}

//
module.exports.updateWebsiteTracking = function (website, data) {

	//
	var query = "INSERT into websites (tracking) VALUES (" + data + ") WHERE name = '" + website +"'";

	//
	return new Promise (function (resolve, reject) {
		con.getConnection(function(err, conn) {
	  		if (err) {
	  			logger.error(err);
	  		}
			conn.query(query, function(err, rows, fields) {
	  		if (err) {
	  			logger.error(err);
	  		}
			    //resolve(JSON.parse(JSON.stringify(rows))[0].status);
			    conn.release();
			});
		});
	});
}
