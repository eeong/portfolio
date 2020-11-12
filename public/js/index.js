/************ COMMON ***********/ 

var pagerLast = $(".side-navi .side-btn").length-1; //sidePager
var pagerNow; 
var wheeling; //wheel event settimeout 
var winHei;
var slideWid; //front-slide animation width 
var frontNow; 
var frontLast = $(".front-slide").length ;
var $frontSlides = []; //front-slide json clone array(j-query)
var $frontSlide; // $(".front-slide")
/************ FUNCTION ***********/ 

function docInit(){
	pagerNow = 0;
	frontNow = 1;
	onResizeWindow()
	pagerAni(0);
	$("html").stop().animate({scrollTop: 0},500);
	$(".front-slide-wrap").stop().css({left: -slideWid*frontNow+"px"});
}

function onResizeWindow(){
	winHei = $(window).height();
	slideWid = $(".slide-left").outerWidth();
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
					setTimeout(function(){return false},600);
			}
				else if (delta  < 0){
					pagerNow = pagerNow == pagerLast ? 4 : pagerNow + 1;
					pagerAni(pagerNow);
					setTimeout(function(){return false},600);
				}
		}, 250);
}

function frontAni(){
	$(".front-slide-wrap").stop().animate({left: -slideWid*frontNow+"px"});
	frontInit();
}


function frontInit(){
	frontNow = 1;
	$frontSlide = $(".front-slide")
//	$($frontSlides[frontNow == 0 ? 2 : frontNow - 1]).clone().appendTo($(".front-slide-wrap").eq(0).remove());
//	$($frontSlides[frontNow == 2 ? 0 : frontNow + 1]).clone().prependTo($(".front-slide-wrap").eq(4).remove());
	$frontSlide.eq(1).addClass("slide-left");
	$frontSlide.eq(2).addClass("slide-center");
	$frontSlide.eq(3).addClass("slide-right");
	
}
	

function onFrontClickLeft(){
	frontNow = frontNow == 0 ? 2 : frontNow - 1; 
	frontAni()
}

function onFrontClickRight(){
	frontNow = frontNow == 2 ? 0 : frontNow + 1; 
	frontAni()
}

function onGetSlide(r){
	var html = "";
	for (var i in r.slides ){
		html =  '<div class="front-slide ">';
		html += '<div class="slide-image">'+r.slides[i].id+'<img src="'+r.slides[i].src+'" alt="slide" class="w-100">';
		html += '<div class="slide-title">'+r.slides[i].title+'</div>';
		html += '</div>';
		html += '<div class="slide-desc">'+r.slides[i].desc+'</div>';
		html += '</div>';
		$frontSlides.push($($(html).appendTo($(".front-slide-wrap"))));
	}
	$($frontSlides[frontNow == 0 ? 2 : frontNow - 1]).clone().appendTo($(".front-slide-wrap"));
	$($frontSlides[frontNow == 2 ? 0 : frontNow + 1]).clone().prependTo($(".front-slide-wrap"));
	frontInit();
}

/************ EXECUTE ***********/ 
$(".navi-icon").on("click",onNaviIconClick);
$(".navi li").on("click",onNaviClick)
$(".side-btn").on("click",onSideClick);
$("section").on("mousewheel",onSectionWheel);
$(".front-end .bt-left").on("click",onFrontClickLeft);
$(".front-end .bt-right").on("click",onFrontClickRight);
$.get('../json/slide.json', onGetSlide);

$(window).one("load", docInit);
$(window).on("resize", onResizeWindow).trigger("resize");