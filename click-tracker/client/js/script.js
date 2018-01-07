//===========================================
//	author 	: josephappeah
//	desc	  : client js for sport trader
//===========================================

const server   = "http://localhost:5555/v1";

//
function signUpLoginSwap() {
    if ($(".signup-fields").hasClass("hidden")) 
    {
        $(".login-fields").addClass("hidden");
        $(".signup-fields").removeClass("hidden");
    } else {
        $(".signup-fields").addClass("hidden");
        $(".login-fields").removeClass("hidden");
    }
}