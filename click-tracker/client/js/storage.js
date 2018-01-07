//======================================================
//	AUTHOR 	: JOSEPH APPEAH
// 	DESC	: CLIENT SIDE STORAGE
//======================================================

//
function getToken() {
	if (typeof(Storage) !== "undefined" && localStorage.token) {
	    return localStorage.token;
	} else {
		return null;
	}
}

//
function updateToken(token) {
	if (typeof(Storage) !== "undefined") {
	    localStorage.token = token;
	    return true;
	} else {
		return false;
	}
}

//
function getUser() {
	if (typeof(Storage) !== "undefined" && localStorage.user) {
	    return localStorage.user;
	} else {
		return null;
	}
}

//
function updateUser(user) {
	if (typeof(Storage) !== "undefined") {
	    localStorage.user = user;
	    return true;
	} else {
		return false;
	}
}
