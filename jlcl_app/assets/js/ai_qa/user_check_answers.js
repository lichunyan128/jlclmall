(function(){
	var checkAnswers = $('.Btn button');
	checkAnswers.click(function(){
		var getVal = $(this).prop('value');
		$.ajax({
			type:"get",
			url:"data.json",
			data:{
				getVal:getVal
			},
			async:true,
			success:function(msg){
				console.log(msg)
				if(msg.code==0){
					if(getVal==1){
						location.href=''
					}else{
						location.href=''
					};
				};	
			},error:function(){
				console.log('出错了')
			}
		});
		
	});
	

		

	
	
	
	
	
})();
