//====================================================
// AUTHOR : JOSEPH APPEAH
// DESC   : DB CREATION SCRIPT
//====================================================

//====================================================
// AUTHOR : JOSEPH APPEAH
// DESC   : DEFINES A NEW CUSIP CLASS
//====================================================

var SQL 	= require("node-sql-db");
var config	= require('../config/config.js');


var db = new SQL.Db({
    platform 	: "MySQL",
    host	 	: "localhost",
    user 		: config.dbUser,
    password 	: config.dbPassword,
    database 	: "click_tracker",
    schema 		: 
	    [{
	        name: "click_tracker",
	        sql : [
	                "create table if not exists websites (id integer primary key auto_increment, name varchar(256), page_url varchar(256), owner integer, owner_uid varchar(256), tracking varchar(5000), active boolean, entry_time timestamp)",
	                "create table if not exists users (id integer primary key auto_increment, uid varchar(256), email varchar(256), email_verified boolean, phone_number varchar(30), display_name varchar(256), photo_url varchar(256), disabled boolean)",
	        	]
	    }]
});


db.execute("SELECT * FROM websites;");
db.execute("SELECT * FROM users;");
db.close();