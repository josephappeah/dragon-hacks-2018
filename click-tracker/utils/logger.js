//==============================
//	author 	: josephappeah
//==============================

var log4js 		= require('log4js');
var logger 		= log4js.getLogger();
logger.level 	= 'debug';


module.exports.getLogger = function() {
	return logger;
}

module.exports.setLevel = function(level='debug') {
	logger.level = level;
}

module.exports.log = function(message) {
	logger.debug(message);
}

module.exports.info = function(message) {
	logger.info(message);
}

module.exports.warn = function(message) {
	logger.warn(message);
}

module.exports.error = function(message) {
	logger.error(message);
}