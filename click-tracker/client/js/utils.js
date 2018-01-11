//======================================================
//	AUTHOR 	: JOSEPH APPEAH
// 	DESC	: CLIENT SIDE UTILS FOR CLICK TRACKER
//======================================================

//
 function cleanWebsite(website) {
	return website.replace("https://", "");
}

//
function injectContentToDivById( id, content ) {
	$('#' + id).innerHTML = content;
}

function getOneWebsiteThumbnail (website) {
    return '<div class="col-sm-4 website-card-container"> \
				        <div class="card website-card" onclick="toggleWebMetricDisplayOpen(\''+website.name+'\')" > \
				            <div class="website-card-image-div no-padding">\
				               	<img class="card-img-top website-card-image no-padding" src="./imgs/img.jpeg">\
				            </div>\
				            <div class="card-body website-card-body">\
				                <h5 class="card-title website-card-title">'+cleanWebsite(website.name)+'</h5>\
				            </div>\
				        </div>\
				    </div>'
}

//
function getWebsiteThumbnails(websites) {
	var count 	= 1;
	var rows 	= "";
	var row  	= '<row class="website-thumbnail-row col-sm-12">';
	var temp    = '<row class="website-thumbnail-row col-sm-12">';


	return new Promise(function(resolve, reject){
		for (i = 0; i < websites.length; i++) {

			row += getOneWebsiteThumbnail(websites[i]);
			temp += getOneWebsiteThumbnail(websites[i]);

			if (count == 3) {
				rows += row + '</row>';
				row     = '<row class="website-thumbnail-row col-sm-12">';
				temp    = rows + '<row class="website-thumbnail-row col-sm-12">';
			}

			if (i == websites.length-1 && websites.length%3==0){
				resolve(rows);
			} else if (i == websites.length-1 && websites.length%3 != 0) {
				resolve(temp + '</row>');
			}

			count++;
		}
	});

	
}

//
function renderWebsiteThumbnails(content) {
	document.getElementById('website-listing').innerHTML = content;
}


//
function toggleWebMetricDisplayOpen (website) {

	if($('.website-metric-display').hasClass("hidden")) {
		$('.website-listing').addClass("col-sm-4");
		$('.website-card-container').addClass("margined-card");
		$('.website-card-container').removeClass("col-sm-4");
		$('.website-metric-display').removeClass("hidden");
		$('.website-card-container').addClass('animated slideInLeft');
		$('.website-metric-display').addClass('animated slideInLeft');
	}

}

function toggleWebMetricDisplayClose () {
	$('.website-card-container').removeClass('animated slideInLeft');
	$('.website-metric-display').removeClass('animated slideInLeft');

	if(!$('.website-metric-display').hasClass("hidden")) {
		$('.website-card-container').addClass('animated fadeIn');
		$('.website-metric-display').addClass("hidden");
		$('.website-card-container').addClass("col-sm-4");
		$('.website-card-container').removeClass("margined-card");
		$('.website-listing').removeClass("col-sm-4");
	}
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


