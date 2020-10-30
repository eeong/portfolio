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

var winHei = $(window).height();
$("section").each(function(i){
	$(this).attr("section-hei",i*winHei);
});

function onSectionWheel(e){

	var nowPos = parseInt($(this).attr("section-hei"));
	if (e.originalEvent.wheelDelta >= 0){
		$("html, body").stop().animate({scrollTop: nowPos-winHei},800);
		return false;
	}
	else if (e.originalEvent.wheelDelta < 0){
		$("html, body").stop().animate({scrollTop: nowPos+winHei},800);
		return false;
	}
}

/************ EXECUTE ***********/ 
$(".navi-icon").on("click",onNaviClick);
$(".side-btn").on("click",onSideClick);
$("section").on("mousewheel",onSectionWheel);
