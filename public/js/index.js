/************ COMMON ***********/ 

var pagerNow = 0;
var pagerLast = $(".side-navi .side-btn").length-1;
var winHei = $(window).height();
var slideWid;
var frontNow = 1;
var frontLast = $(".front-slide").length ;
var wheeling; //wheel event settimeout 
var $frontSlides = [];
var $frontSlide;
/************ FUNCTION ***********/ 

function docInit(){
	pagerAni(0);	
	$("html").stop().animate({scrollTop: 0},500);
	$(".front-slide-wrap").stop().css({left: -slideWid*frontNow+"px"});
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




function frontInit(){
	$frontSlide = $(".front-slide")
	$($frontSlides[frontNow == 0 ? 2 : frontNow - 1].clone()).appendTo($(".front-slide-wrap"));
	$($frontSlides[frontNow == 2 ? 0 : frontNow + 1].clone()).prependTo($(".front-slide-wrap"));
	$frontSlide.eq(1).addClass("slide-left");
	$frontSlide.eq(2).addClass("slide-center");
	$frontSlide.eq(3).addClass("slide-right");

	slideWid = $(".slide-left").outerWidth();
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
		$frontSlides.push($(html).appendTo($(".front-slide-wrap")));
	}
	frontInit();
}

/************ EXECUTE ***********/ 
$(".navi-icon").on("click",onNaviIconClick);
$(".navi li").on("click",onNaviClick)
$(".side-btn").on("click",onSideClick);
$("section").on("mousewheel",onSectionWheel);
$(window).one("load", docInit);
$(".front-end .bt-left").on("click",onFrontClickLeft);
$(".front-end .bt-right").on("click",onFrontClickRight);
$.get('../json/slide.json', onGetSlide);