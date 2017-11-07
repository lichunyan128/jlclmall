$(function(){
	var rightPic = $('.zixun_pic img');
	//左侧列表hover变化
	$('.container_left li').hover(function(){
		$(this).css({'background':'#000','border': 'none'})
				.find('.title').attr('class','titleHover');
		$(this).find('.intro').attr('class','introHover');
		for(var i = 0; i < rightPic.length; i++){
			var picIndex = $(rightPic[i]).index();
			if($(this).attr('data-li')==picIndex){
				$(rightPic[i]).removeClass('picShow');
			}else{
				$(rightPic[i]).addClass('picShow');
			}
		}
	},function(){
		$(this).css({'background':'#eee','color':'#555'})
				.find('.titleHover').attr('class','title');
		$(this).find('.introHover').attr('class','intro');
	})

});
