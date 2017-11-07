(function(){
//	获取头部的标签导航
	var navList = $('.top_list');
	$.ajax({
		type:"get",
		url:"data.json",
		async:true,
		success:function(msg){
			if(msg.code == 0){
				msg.data.forEach(function(ele,idx) {
					var a = $('<a id="'+ ele.id +'">'+ ele.labalName +'</a>');
					navList.append(a);
				});	
			navList.find('a:first').addClass('top_list_hover');
			};
		},
		error:function(){
			console.log('失败')
		}
	});

//根据标签id获取相应内容
	var qa_container = $('#qa_container');
	var probList;
	var skipIco = "../../../assets/img/ai_qa/user_qa_homepage_more_arrows.png";
	function getContent (id){
		$.ajax({
			type:"get",
			url:"data.json",
			data:{
				id:id
			},
			async:true,
			success:function(msg){
				if(msg.code==0) {
					msg.data.forEach(function(ele) {
						probList = $(
							'<div class="probList">'+
								'<ul class="mui-clearfix" id="'+ ele.id +'">'+
									'<li class="userPortrai">'+
										'<img src="'+ ele.headUrl +'"/>'+
									'</li>'+
									'<li class="userQuestion">'+
										'<p>'+ ele.name +'</p>'+
										'<p>'+ ele.detail +'</p>'+
									'</li>'+
									'<li class="arrows">'+
										'<img src=' + skipIco + ' />'+
									'</li>'+
								'</ul>'+
							'</div>'
						);
						qa_container.append(probList);
					});
				};
			
			},
			error:function(){
				console.log('失败')
			}
		});
	};
	
	var listId;
	$('.top_list').on('click','a',function(){
		$(this).addClass('top_list_hover').siblings().removeClass('top_list_hover');
		qa_container.html('');
		listId = $(this).attr('id')
		getContent(listId);
	});
	
//下拉刷新
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	
	var count = 0;
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
			getContent(listId);
		}, 1500);
	}
	if (mui.os.plus) {
		mui.plusReady(function() {
			setTimeout(function() {
				mui('#pullrefresh').pullRefresh().pullupLoading();
			}, 1000);

		});
	} else {
		mui.ready(function() {
			mui('#pullrefresh').pullRefresh().pullupLoading();
		});
	}
	//跳转
	mui("#qa_container").on('tap','.probList ul',function(){
	// 获取id
	    var id = this.getAttribute("id");
	    mui.openWindow({
	        id:id,
	//      url:'{{ url_for('jl_ai.health_history_skin_solution') }}?user_skin_id=' + id
			url:'user_check_answers.html'
	    });
	})	
	
	
	
})();
