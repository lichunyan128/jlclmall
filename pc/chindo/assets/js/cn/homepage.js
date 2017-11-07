$(function(){
var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: 2500,
});
//笔刷轮播
var slideShowOutBox=$(".slideShow_brush");
var slideInnerBox = $('.slideInnerBox'); 
var liList = $('.slideInnerBox li');
var showNumber=$('.slideInnerBox li').size();//li的数量
var firstLi = $('.slideInnerBox li').first().clone();
$('.slideInnerBox').append(firstLi);
var musicIndex=0; 
var slideInnerBoxLi = $('.slideInnerBox li');
var picWidth = $(slideInnerBoxLi).width();
	function autoPlay(){
		musicIndex ++;
		if(musicIndex==showNumber){
			slideInnerBox.css({left:0});
			musicIndex = 1;
		}
		slideInnerBox.stop().animate({left:-musicIndex*picWidth});
	}
	var times=setInterval(function () {
        autoPlay();
    },1000);
    
	liList.hover(function(){
		$('.slideInnerBox a').css("display","block")
		clearInterval(times)
	},function(){
		$('.slideInnerBox a').css("display","none");
		times=setInterval(function () {
	        autoPlay();
	    },1000);
	});
	
});
