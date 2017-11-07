(function (){
	mui.init();
			(function($) {
				$('#OA_task_1').on('tap', '.mui-btn', function(event) {
					var elem = this;
					var li = elem.parentNode.parentNode;
					mui.confirm('确认删除该商品？', '', btnArray, function(e) {
						if(e.index == 0) {
							li.parentNode.removeChild(li);
						} else {
							setTimeout(function() {
								$.swipeoutClose(li);
							}, 0);
						}
					});
				});
				var btnArray = ['确认', '取消'];
			})(mui);

			//加
			var num = 2;
			 $('#OA_task_1').on('tap', '#add', function(event){
			 	$('.value').text(num ++);		
			 })
			//点击加减商品
		$('#OA_task_1').on('tap', '#subtract', function(event){
		 	num--
		 	if($('.value').html() > 1) {
		 		$('.value').html(num-1);
		 	}else if($('.value').html()<=1){
		 		 num = 1;
		 		$('.value').html(num);
		 	}
		 })
		
$('#more_address').on('tap',function(){
	if($('.other_adress').css('display')=='none'){
		$('.other_adress').show();
		$('#pull_down_address').hide();
		$('#add_address').show();
	}
});
$('.mui-icon-plus').on('click',function(){
	$('.shade').show();
})

//选择地址
$("input[name='radio']").click(function(){
 	$('.default_address').hide();
 	$('.alone_adress').hide();
 	$(this).parent().show();
 	$('#pull_down_address').show();
 	$('#add_address').hide();
	if($('.default_address').hide()){
		$('#more_address').on('tap',function(){
			$('.default_address').show();
			$('.alone_adress').show();
			$('.other_adress').show();
			$('#pull_down_address').hide();
			$('#add_address').show();
		})
	};
	
 });
//点击默认地址
 $('#default_radio').click(function(){
 	$('.default_address').show();
	$('.other_adress').hide();
 });
//新添加手机号点击取消
$('#cancel').click(function(){
	$('.shade').hide();
	$('.default_address').show();
})

// 	判断手机号码
 $('#address').click(function(){
  var phone = $('#phone').val();
  var flag = false;     
  var myreg = /^1[3-9][0-9]{9}$/;
  if(phone == ''){
  	mui.confirm('手机号不能为空哦！', '亲', btnArray, function(e){});
	var btnArray = ['确认', '取消'];
  }else if(phone.length !=11){
  	mui.confirm('手机号输入不能少于11位哦！', '亲', btnArray, function(e){});
	var btnArray = ['确认', '取消'];
  }else if(!myreg.test(phone)){
  	mui.confirm('手机号输入不正确哦！', '亲', btnArray, function(e){});
	var btnArray = ['确认', '取消'];
  }else{
      flag = true;
  };
});
////判断地址
//$('#leave').click(function(){
//var id = $('#address').val();
//	var flag = false;
//	if(id == ''){
//	mui.confirm('您的地址还没有填写哦！', '亲', btnArray, function(e){});
//	var btnArray = ['确认', '取消'];
//	}else{
//		flag = true;
//	};
//});			
			
})();
