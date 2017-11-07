(function(){
//	textarea获取焦点的时候
	$('#answerContent').bind('focus',function(){
		$(this).prop('placeholder','');
	}).bind('blur',function(){
		if(!$(this).val()){
			$(this).prop('placeholder','解答');
		}else{
			$(this).prop('placeholder','');
		}
	});
//	点击提交获取数据,发送ajax
	$('#submitBtn').click(function(){
		var add_val = $('#answerContent').val();
		$.ajax({
			type:"get",
			url:"data.json",
			data:{
				val:add_val
			},
			async:true,
			success:function(msg){
			},
			error:function(){
				console.log('出错了')
			}
		});
	})
	
})();
