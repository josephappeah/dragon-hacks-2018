//======================================================
//	AUTHOR 	: JOSEPH APPEAH
// 	DESC	: CLIENT SIDE UTILS FOR CLICK TRACKER
//======================================================

//
function injectContentToDivById( id, content ) {
	$('#' + id).innerHTML = content;
}


//
function getWebsiteThumbnails (websites) {

}

//
function navigateTo(page) {
	if (page == "home") {
		window.location.href = "home.html";
	} else if (page == "index") {
		window.location.href = "index.html";
	} else if (page == "about") {
		window.location.href = "about.html";
	} else if (page == "legal") {
		window.location.href = "legal.html";
	} else if (page == "contact") {
		window.location.href = "contact.html";
	}
}