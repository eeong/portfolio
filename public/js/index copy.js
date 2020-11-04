/************ COMMON ***********/ 

var pagerNow = 0;
var pagerLast = $(".side-navi .side-btn").length-1;
var winHei = $(window).height();

/************ FUNCTION ***********/ 

function docInit(){
	pagerAni(0);	
	$("html").stop().animate({scrollTop: 0},500);
}

/************ CALLBACK ***********/ 
function onNaviIconClick(){
	$(this).siblings("ul").toggleClass("on");
}

function onNaviClick(){
	pagerNow = $(this).index();
	pagerAni(pagerNow);
	$("html").stop().animate({scrollTop: winHei*pagerNow},500);
}

function onSideClick(){
	pagerNow = $(this).index();
	pagerAni(pagerNow);	
	$("html").stop().animate({scrollTop: winHei*pagerNow},500);
}

function pagerAni(pagerNow){
	var $sideBtn = $(".side-navi .side-btn");
	$sideBtn.removeClass("on");
	$sideBtn.eq(pagerNow).addClass("on");
}

function onSectionWheel(e){
	e.preventDefault();
	e.stopPropagation();
	$("section").each(function(i){
	$(this).attr("section-hei",i*winHei);
	});
	var nowPos = parseInt($(this).attr("section-hei"));
	if (e.originalEvent.wheelDelta > 0){
		$("html").stop().animate({scrollTop: nowPos-winHei},500,function(){
		pagerNow = pagerNow == 0 ? 0 : pagerNow -1;
		pagerAni(pagerNow);
		});
		return false;
	}
		else if (e.originalEvent.wheelDelta < 0){
		$("html").stop().animate({scrollTop: nowPos+winHei},500,function(){
		pagerNow = pagerNow == pagerLast ? 4 : pagerNow + 1;
		pagerAni(pagerNow);
		});
		return false;
		}
}


/************ EXECUTE ***********/ 
$(".navi-icon").on("click",onNaviIconClick);
$(".navi li").on("click",onNaviClick)
$(".side-btn").on("click",onSideClick);
$("section").on("mousewheel",onSectionWheel);
$(window).one("load", docInit());

