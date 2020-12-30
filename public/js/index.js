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
	onClickLang();
	onResizeWindow()
	pagerAni(0);
	$("html").stop().animate({scrollTop: 0},500);
}

function onResizeWindow(){
	winHei = $(window).height();
	slideWid = ((($(window).outerWidth())*0.75)*1.5)*0.16666;
	$(".front-slide-wrap").css({"left": -slideWid*frontNow+"px"});
}

/************ CALLBACK ***********/ 
function onNaviIconClick(){
	$(".navi-icon").toggleClass("on").toggleClass("aniNavi");
	$(this).siblings("ul").toggleClass("on");
	$(".navi li").eq(pagerNow).siblings().removeClass("on");
	$(".navi li").eq(pagerNow).addClass('on');
}

function onNaviClick(){
	pagerNow = $(this).index();
	$(this).siblings().removeClass("on");
	$(this).addClass('on');
	//$(this).css("background",'transparent');
	pagerAni(pagerNow);
}


function onSideClick(){
	pagerNow = $(this).index();
	$(".navi-icon").removeClass("on").addClass("aniNavi");
	$(".header-right ul").removeClass("on");
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
				$(".navi-icon").removeClass("on").addClass("aniNavi");
				$(".header-right ul").removeClass("on");	
		}, 200);
}

function onSectionClick(){
	$(".navi-icon").removeClass("on").addClass("aniNavi");
	$(".header-right ul").removeClass("on");
}

function frontAni(direc){
	let n = direc == "right" ? 2 : 0;
	setTimeout(function(){
	$frontSlide.eq(n).removeClass("slide-center slide-right").addClass("slide-left");
	$frontSlide.eq(n+1).removeClass("slide-right slide-left").addClass("slide-center");
	$frontSlide.eq(n+2).removeClass("slide-center slide-left").addClass("slide-right");
	$(".front-slide-wrap").animate({"left": -frontNow*slideWid +"px"}, 500, frontInit(direc));
	},0);
	
}

function front3d(direc){
	let n = direc == "right" ? 2 : direc == "left" ? 0 : 1;
	
	$frontSlide.eq(n).removeClass("slide-center slide-right").addClass("slide-left");
	$frontSlide.eq(n+1).removeClass("slide-right slide-left").addClass("slide-center");
	$frontSlide.eq(n+2).removeClass("slide-center slide-left").addClass("slide-right");
	frontBool = false;
	setTimeout(function(){frontBool=true},600);
}

function frontInit(direc){
	var frontBool;
	$frontSlide = $(".front-slide")
	frontNow = direc == "right" ? 2 : direc == "left" ? 0 : 1;;	
	$frontSlide.removeClass("slide-center").addClass(direc == "left" ? "slide-left" : "slide-right");
	if(direc == "right") {
		$frontSlide.eq(0).remove();
		$($frontSlide.eq(2)).clone().appendTo($(".front-slide-wrap"));
	}
	else if(direc == "left") {
		$frontSlide.eq(4).remove();
		$($frontSlide.eq(2)).clone().prependTo($(".front-slide-wrap"));
	}
	front3d(direc);
	slideWid = ((($(window).outerWidth())*0.75)*1.5)*0.16666;
	$(".front-slide-wrap").css("left");
	$(".front-slide-wrap").css({"left": -slideWid*frontNow+"px"});
}
	
function onFrontClickLeft(){
	if(frontBool){
		frontNow = 1; 
		frontAni("left");
	}
}

function onFrontClickRight(){
	if(frontBool){
		frontNow = 1; 
		frontAni("right");
	}
}

function onGetSlide(r){
	var html, html2, result = "";
	result = r;
	for (var i in r.slides ){
		html =  '<div class="front-slide ' + r.slides[i].class+'">';
		html += '<div class="slide-image"><img src="'+r.slides[i].src+'" alt="slide" class="w-100">';
		html += '<div class="slide-title">'+r.slides[i].title+'</div>';
		html += '</div>';
		html += '<div class="slide-desc">'+r.slides[i].desc+'</div>';
		html += '</div>';
		$frontSlides.push($($(html).appendTo($(".front-slide-wrap"))));
	}
	$($frontSlides[0]).clone().appendTo($(".front-slide-wrap"));
	$($frontSlides[2]).clone().prependTo($(".front-slide-wrap"));

	function onDetailClick(){
		let id;
		if( $(this).hasClass("web1") ) id = 0;
		else if ( $(this).hasClass("web2") ) id = 1;
		else if ( $(this).hasClass("web2") )id = 2;
		html2 = '<div class="video">'
		html2 += '<iframe src='+result.slides[id].vsrc +'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>'
		html2 += '<div class="fence"></div>'
		html2 += '</div>'
		html2 += '<div class="detail-desc">'
		html2 += '<h3>'+result.slides[id].detailTitle+'</h3>'
		html2 += '<p>'+result.slides[id].detailDesc+'</p>'
		html2 += '</div>'
		$(html2).appendTo($(".detail").empty());
		$(".detail-wrap").show().animate({"left" : 0 } , 500);
		$("iframe").css("transform","scale(1)");
		$(".fence").css("background","transparent");
	}

	$(".front-slide").on("click", onDetailClick);

	frontInit();
}

function onEmailClick(){
	$(".email-wrap").show();
}

function onClickLang(){
	$("html").stop().animate({'opacity':0.5},500,function(){
		$("[id |= lang]").toggleClass("active");
		$("html").stop().animate({'opacity':1},500,function(){	
	});
	});
	}

function onEmailClose(){
	$(".email-wrap").hide();
}


function mailSend(x){
	x.contact_number.value = Math.random() * 100000 | 0;
	emailjs.sendForm('service_fur1cuq', 'template_a5s4ize', x);
	$(".email-wrap").hide();
	return false;
	
}

function onDetailClose(){
	$(".detail-wrap").animate({"left" : "40%" } , 500, function(){
		$(".detail-wrap").hide();
	});
}


/************ EXECUTE ***********/ 
$.get('../json/slide.json', onGetSlide);
$(".navi-icon").on("click",onNaviIconClick);

$(".navi li").on("click",onNaviClick)
$(".side-btn").on("click",onSideClick);
$("section").on("mousewheel",onSectionWheel);
$("section").on("click", onSectionClick);
$(".front-end .bt-left").on("click",onFrontClickLeft);
$(".front-end .bt-right").on("click",onFrontClickRight);
$(".fa-envelope").on("click",onEmailClick);
$(".fa-close").on("click",onEmailClose);
$(".detail-close").on("click", onDetailClose);

$(".lang-bt").on("click", onClickLang);


emailjs.init("user_OQNTTJmx8nuO6apvJPh5b");

$(window).one("load", docInit);
$(window).on("resize", onResizeWindow).trigger("resize");