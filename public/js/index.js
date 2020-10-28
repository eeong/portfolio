/************ COMMON ***********/ 




/************ FUNCTION ***********/ 


/************ CALLBACK ***********/ 
function onNaviClick(){
	$(this).siblings("ul").toggleClass("on");
}

function onSideClick(){
	$(this).siblings().removeClass("on");
	$(this).addClass("on");
}

/************ EXECUTE ***********/ 
$(".navi-icon").on("click",onNaviClick);
$(".side-btn").on("click",onSideClick);