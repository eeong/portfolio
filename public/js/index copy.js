/************ COMMON ***********/ 

var pagerNow = 0;
var pagerLast = $(".side-navi .side-btn").length-1;
var winHei = $(window).height();
var slideWid = $(".slide-left").outerWidth();
var frontNow = 1;
var frontLast = $(".front-slide").length ;
var wheeling; //wheel event settimeout
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
}

function onSideClick(){
	pagerNow = $(this).index();
	pagerAni(pagerNow);	
}

function pagerAni(pagerNow){
	var $sideBtn = $(".side-navi .side-btn");
	$sideBtn.removeClass("on");
	$sideBtn.eq(pagerNow).addClass("on");
	$(".section-wrapper").stop().css({top: -( winHei*pagerNow)+"px"},500)
}

function onSectionWheel(e){
	clearTimeout(wheeling);
		wheeling = setTimeout(function() {
		delta = e.originalEvent.wheelDeltaY;
			if (delta  > 0){
					pagerNow = pagerNow == 0 ? 0 : pagerNow -1;
					pagerAni(pagerNow);
					setTimeout(function(){return false},700);
			}
				else if (delta  < 0){
					pagerNow = pagerNow == pagerLast ? 4 : pagerNow + 1;
					pagerAni(pagerNow);
					setTimeout(function(){return false},700);
				}
		}, 250);
}

function frontAni(){
	$(".front-slide-wrap").stop().animate({left: -slideWid*frontNow+"px"});
}

function frontInit(direc){
	var $slideLeft = $(".front-slide").eq(0).clone();
	var $slideCenter = $(".front-slide").eq(1).clone();
	var $slideRight = $(".front-slide").eq(2).clone();
	var frontSlide = [$slideLeft, $slideCenter, $slideRight];
	if (direc == "left"){
		$(".front-slide").eq(2).remove();
		$(frontSlide[2]).prependTo(".front-slide-wrap");
	}
	else if(direc == "right"){
		$(".front-slide").eq(0).remove();
		$(frontSlide[0]).appendTo(".front-slide-wrap");
	}
	frontNow=1;
	$(".front-slide-wrap").css({left: 0+"px"});
}

function onFrontClickLeft(){
	frontNow = frontNow == 0 ? 2 : frontNow - 1; 
	frontAni()
	$(".front-slide").eq(1).css({"flex":"33.3333% 0 0"}).children(".slide-image").css({"transform": "rotateY(0) scaleX(1) translateY(-60px)"});
	$(".front-slide").eq(2).css("flex","16.6666% 0 0").children(".slide-image").css({"transform": "rotateY(20deg) scaleX(0.6) translateY(0)"});
	frontInit('left')
}

function onFrontClickRight(){
	frontNow = frontNow == 2 ? 0 : frontNow + 1; 
	frontAni()
	$(".front-slide").eq(2).css("flex","16.6666% 0 0").children(".slide-image").css({"transform": "rotateY(-20deg) scaleX(0.6) translateY(0)"});
	$(".front-slide").eq(3).css({"flex":"33.3333% 0 0"}).children(".slide-image").css({"transform": "rotateY(0) scaleX(1) translateY(-60px)"});
	frontInit('right')
}


/************ EXECUTE ***********/ 
$(".navi-icon").on("click",onNaviIconClick);
$(".navi li").on("click",onNaviClick)
$(".side-btn").on("click",onSideClick);
$("section").on("mousewheel",onSectionWheel);
$(window).one("load", docInit());
$(".front-end .bt-left").on("click",onFrontClickLeft);
$(".front-end .bt-right").on("click",onFrontClickRight);
