var url = "https://api.bevol.cn/php_user/WX/index";
var link = location.href;
if(link.indexOf("#")) {
	link = link.split("#")[0];
}
link = encodeURIComponent(link);
var data = {
	url: link
};
link = location.href;
$.ajax({
	url: url,
	data: data,
	dataType: "jsonp",
	jsonp: "callback",
	success: function(json) {
		json = json.data;
		// 微信配置
		wx.config({
			debug: false,
			appId: json.appId,
			timestamp: json.timestamp,
			nonceStr: json.nonceStr,
			signature: json.signature,
			jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
		});
		wxload();
	}
});

function wxload() {
	wx.ready(function() {

		// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		var title = "美丽修行－我竟然是这样的肤质星人？！";
		var desc = "耐磨金刚皮还是高原红小宝贝儿？！戳进来就知道～";
		var imgUrl = "https://img2.bevol.cn/public/images/minilogo.png";
		var type = "link";
		wx.onMenuShareTimeline({
			title: title, // 分享标题
			link: link,
			imgUrl: imgUrl // 分享图标
		});
		// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
		wx.onMenuShareAppMessage({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link,
			imgUrl: imgUrl, // 分享图标
			type: type // 分享类型,music、video或link，不填默认为link
		});

		//分享到qq
		wx.onMenuShareQQ({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl
		});

		//分享到腾讯微博
		wx.onMenuShareWeibo({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl
		});

		//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
		wx.onMenuShareQZone({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl
		});

	});

	wx.error(function(res) {
		alert(JSON.stringify(res));
		$.wxfx();
	});
}

$(function() {


})

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}