$(function(){
	var add_text,goods;
	var object = {};
	var moringObject = {};
	var nightObject = {};
	$('.choose_button').on('tap',function(){
		var mainDom = $(this);
		add_text = $(this).find(".popup_hide");
		$(".choose").find("div").removeClass("choose_button_hover");
		$(".choose").find("div").find("p").removeClass("font_discolor");
		$(this).addClass('choose_button_hover');
		$(this).find('.choose_texts').addClass('font_discolor');
//获取值放到object里面
//判断早上还是晚上
		var parentBox = $(this).parent();

		if(parentBox.hasClass('night')){
			$(".popup_choose_butn").on("tap",function(){
				add_text.html($(this).text());
				add_text.show();
				var value = $(this).attr('value');
				goods = mainDom.find('a').find('.font_discolor').attr('carelist');
				if(goods != undefined){
					nightObject[goods] = value;
					object.nightObject = nightObject;
				}
			})
		}else if(parentBox.hasClass('moring')){
			$(".popup_choose_butn").on('tap',function(){
				add_text.html($(this).text());
				add_text.show();
				var value = $(this).attr('value');
				goods = mainDom.find('a').find('.font_discolor').attr('carelist');
				if(goods != undefined){
					moringObject[goods] = value;
					object.moringObject = moringObject;
				}
			})
		}
		
	})

	
	
//	提交
	$('.submit').on('tap',function(){
		console.log(object)
		
		
	})

})