(function () {
	var conditionsData = {};
	var add_value;
	var condition;
	$('.popup_choose_butn').click(function(){
		$('#picture1').hide();
		$('#picture2').hide();
		$('#picture3').hide();
		$('#picture4').hide();
		$('#picture5').hide();
		$('.mui-backdrop-action.mui-backdrop, .mui-bar-backdrop.mui-backdrop').css({'opacity':0})
		that = $(this);
		//判断年龄选项
		if(that.prop('id')=='twelveUnder'){
			$('.pimple_red').hide();
			$('.pimple_grey').show();
			$('.water_grey').show();
			$('.water_red').hide();
			$('.care_grey').show();
			$('.care_red').hide();
			$('.analyze_btn_core').hide();
			$('.analyze_btn_core_red').show();
			
		}else if(that.prop('id')=='twelveToTwenty'){
			$('.analyze_btn_core').show();
			$('.analyze_btn_core_red').hide();
			$('.water_grey').show();
			$('.water_red').hide();
			$('.pimple_grey').hide();
			$('.pimple_red').show();
			$('.care_grey').show();
			$('.care_red').hide();
		}else if(that.prop('id')=='twentyToFifty'){
			$('.analyze_btn_core').show();
			$('.analyze_btn_core_red').hide();
			$('.pimple_grey').show();
			$('.pimple_red').hide();
			$('.water_grey').hide();
			$('.water_red').show();
			$('.care_grey').show();
			$('.care_red').hide();
			
		}else if(that.prop('id')=='havePimple'||that.prop('id')=='nonePimple'){//判断有无痘痘选项
			$('.care_grey').hide();
			$('.care_red').show();
		}else if(that.prop('id')=='unusedSkinCareProduct'||that.prop('id')=='usedSkinCareProduct'){//判断护肤选项
			$('.analyze_btn_core').hide();
			$('.analyze_btn_core_red').show();
		}else if(that.prop('id')=='skinNoDry'||that.prop('id')=='skinDry'){//判断肌肤水分选项
			$('.pimple_grey').hide();
			$('.pimple_red_5').show();
		}
		else if(that.prop('id')=='hasPimple'||that.prop('id')=='hasNoPimple'){//判断有未长过选项
			$('.care_grey').hide();
			$('.care_red').show();
		}
	});
//点分析获取数据
$('#analyze').click(function () {
	//获取年龄
	var popup_choose_butn = $('.popup_choose_butn');
	for(var i = 0; i < popup_choose_butn.length; i++){
		var item = popup_choose_butn[i];
		add_value = item.innerHTML;
		condition = popup_choose_butn[i].getAttribute('conditionsButton');
		conditionsData[condition] = add_value;
	}
	console.log(conditionsData);
	
	
})
	
	
})();
