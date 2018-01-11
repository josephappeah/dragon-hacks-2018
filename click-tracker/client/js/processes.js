//======================================================
//	AUTHOR 	: JOSEPH APPEAH
// 	DESC	: CLIENT SIDE UTILS FOR CLICK TRACKER
//======================================================

function getWebsitesForAUser() {

  //
    var url = server + "/get-websites-for-user";
    
    //
    axios.post(url,
      { 
        token    : getToken(),
        user     : JSON.parse(getUser())
      }
    ).then(function (response) 
      { 
          //
          getWebsiteThumbnails(response.data)
            .then(function(success){
              renderWebsiteThumbnails(success);
            });

      }
    ).catch(function (error) {
          console.log(error);
    }); 

}


function addNewWebsiteForTracking() {
	//
    var url = server + "/start-website-tracking";
    
    //
    axios.post(url,
      { 
      	token 	 : getToken(),
        website  : "https://lanceapplicationsd.com",
        user 	   : JSON.parse(getUser())
      }
    ).then(function (response) 
      { 
      }
    ).catch(function (error) {
          console.log(error);
    }); 

}

//
function endTrackingOfAWebsite() {

}