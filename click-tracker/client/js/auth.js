//======================================================
//	AUTHOR 	: JOSEPH APPEAH
// 	DESC	: CLIENT SIDE UTILS FOR CLICK TRACKER
//======================================================

//
function logIn () {
	//
    var url = server + "/login";

    //
    axios.post(url,
      { 
        email 	 : $("#login-email").val(),
        password : $("#login-password").val()
      }
    ).then(function (response) 
      { 
          //
          console.log(response.data)
          updateToken(response.data.token);
          updateUser(response.data.user);

          //
          navigateTo("home");
      }
    ).catch(function (error) {
          console.log(error);
    }); 
}

//
function logOut () {
	//
    var url = server + "/logout";

    //
    axios.post(url,
      { 
        user 	 : getUser(),
        uid 	 : getUser().uid
      }
    ).then(function (response) 
      { 
          //
          updateToken("");
          updateUser({});

          //
          navigateTo("index");
      }
    ).catch(function (error){
          console.log(error);  
    }); 
}

function signUp () {
	//
    var url = server + "/signup";

    //
    axios.post(url,
      { 
        email 	 	: $("#signup-email").val(),
        password 	: $("#signup-password").val(),
        phoneNumber	: $("#phone").val(),
        displayName	: $("#full-name").val()
      }
    ).then(function (response) 
      {
          //
          updateToken(response.data.token);
          updateUser(response.data.user);

          //
          navigateTo("home");
      }
    ).catch(function (error) {
          console.log(error);   
    }); 
}

