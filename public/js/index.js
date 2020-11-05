/************ COMMON ***********/ 

var pagerNow = 0;
var pagerLast = $(".side-navi .side-btn").length-1;
var winHei = $(window).height();
var slideWid = $(".slide-left").outerWidth();
var now = 1;
var last = $(".front-slide-wrap").length - 1;
/************ FUNCTION ***********/ 

function docInit(){
	pagerAni(0);	
	$("html").stop().animate({scrollTop: 0},500);
	$(".front-slide-wrap").stop().css({left: -slideWid*now+"px"});
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
	console.log(e);
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
		$("section").removeClass("stopEvent");
		});
		return false;
		}
}
function frontAni(now){
	console.log(now);
	$(".front-slide-wrap").stop().animate({left: slideWid*now+"px"});
}

function onFrontClickLeft(){
	now = now == 0 ? last : now - 1; 
	frontAni(now)
	
}

function onFrontClickRight(){
	now = last == last ? 0 : now + 1; 
	frontAni(-now)
	
}


/************ EXECUTE ***********/ 
$(".navi-icon").on("click",onNaviIconClick);
$(".navi li").on("click",onNaviClick)
$(".side-btn").on("click",onSideClick);
$("section").on("mousewheel",onSectionWheel);
$(window).one("load", docInit());
$(".front-end .bt-left").on("click",onFrontClickLeft);
$(".front-end .bt-right").on("click",onFrontClickRight);
