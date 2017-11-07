(function (){
		//点击跳转页面
			document.getElementById('mall_page').addEventListener('tap', function(){
			  //打开关于页面
			  var id = this.getAttribute("id");
			  mui.openWindow({
			    url: './homepage.html', 
			    id:id
			  });
			});
			document.getElementById('market_cart').addEventListener('tap', function() {
			  //打开关于页面
			  var id = this.getAttribute("id");
			  mui.openWindow({
			  	url: './jl_shop_car_old_user.html',
			    id:id
			  });
			});
			document.getElementById('my_order').addEventListener('tap', function() {
			  //打开关于页面
			  var id = this.getAttribute("id");
			  mui.openWindow({
			    url: '',
			    id:id
			  });
			});
			document.getElementById('personal_center').addEventListener('tap', function() {
			  //打开关于页面
			  var id = this.getAttribute("id");
			  mui.openWindow({
			  	url: './personal_center.html',
			    id:id
			  });
			});





//底部图标转换
$('.footer_nav li').attr('click', 'img', function() {
	var n = $(".footer_nav li").index($(this))
		if($(this).index() == n) {
			for(var i = 0; i < 4; i++) {
				$($(".footer_nav li")[i]).find('img').attr("src", "../../assets/img/jlcl_homepage_footer_" + (i + 1) + ".svg");

			}
			$(this).find("img").attr("src", "../../assets/img/jlcl_homepage_footer_red" + (n + 1) + ".svg");
		}			
	});
})();
