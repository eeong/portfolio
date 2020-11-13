/************ COMMON ***********/ 

var pagerLast = $(".side-navi .side-btn").length-1; //sidePager
var pagerNow; 
var wheeling; //wheel event settimeout 
var winHei;
var slideWid; //front-slide animation width 
var frontNow; 
var $frontSlides = []; //front-slide json clone array(j-query)
var $frontSlide; // $(".front-slide")
/************ FUNCTION ***********/ 

function docInit(){
	pagerNow = 0;
	frontNow = 1;
	onResizeWindow()
	pagerAni(0);
	$("html").stop().animate({scrollTop: 0},500);
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
	$frontSlide.eq(1).addClass("slide-left");
	$frontSlide.eq(2).addClass("slide-center");
	$frontSlide.eq(3).addClass("slide-right");
	$(".front-slide-wrap").stop().animate({left: -slideWid*frontNow+"px"}, 500);
	frontInit()

}


function frontInit(direc){
	$frontSlide = $(".front-slide")
	$(".front-slide-wrap").css({left: -slideWid+"px"});
	
	if(direc == "right") {
		$frontSlide.eq(0).remove();
		$($frontSlides[frontNow == 0 ? 2 : frontNow - 1]).clone().addClass('1').appendTo($(".front-slide-wrap"));
	}
	else if(direc == "left") {
		$frontSlide.eq(4).remove();
			$($frontSlides[frontNow == 2 ? 0 : frontNow + 1]).clone().addClass("2").prependTo($(".front-slide-wrap"));
	}
	slideWid = 254;//$(".slide-left").outerWidth();
	console.log(frontNow)
	

	
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
	frontNow = 1;
	var html = "";
	for (var i in r.slides ){
		html =  '<div class="front-slide">';
		html += '<div class="slide-image">'+r.slides[i].id+'<img src="'+r.slides[i].src+'" alt="slide" class="w-100">';
		html += '<div class="slide-title">'+r.slides[i].title+'</div>';
		html += '</div>';
		html += '<div class="slide-desc">'+r.slides[i].desc+'</div>';
		html += '</div>';
		$frontSlides.push($($(html).appendTo($(".front-slide-wrap"))));
	}
	$($frontSlides[0]).clone().appendTo($(".front-slide-wrap"));
	$($frontSlides[2]).clone().prependTo($(".front-slide-wrap"));
	frontInit();
}

function onClickLang(){
	$("html").stop().animate({'opacity':0.5},500,function(){
		$("[id |= lang]").toggleClass("active");
		$("html").stop().animate({'opacity':1},500,function(){	
	});
	});
	}

/************ EXECUTE ***********/ 
$(".navi-icon").on("click",onNaviIconClick);
$(".navi li").on("click",onNaviClick)
$(".side-btn").on("click",onSideClick);
$("section").on("mousewheel",onSectionWheel);
$(".front-end .bt-left").on("click",onFrontClickLeft);
$(".front-end .bt-right").on("click",onFrontClickRight);
$.get('../json/slide.json', onGetSlide);
$(".lang-bt").on("click", onClickLang);

$(window).one("load", docInit);
$(window).on("resize", onResizeWindow).trigger("resize");