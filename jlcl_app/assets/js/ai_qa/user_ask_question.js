(function(){
//上传照片
var imgIndex;
function toFixed2(num) {
    return parseFloat(+num.toFixed(2));
}

$('#cancleBtn').on('click', function() {
    $("#showEdit").fadeOut();
//  $('#showResult').fadeIn();
});

function cutImg() {
//  $('#showResult').fadeOut();
    $("#showEdit").fadeIn();
    var $image = $('.report > img');
    $image.cropper({
        aspectRatio: 1 / 1.2,
        autoCropArea: 0.7,
        strict: true,
        guides: false,
        center: true,
        highlight: false,
        dragCrop: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        zoom: -0.2,
        checkImageOrigin: true,
        background: false,
        minContainerHeight: 400,
        minContainerWidth: 300
    });
}

function doFinish(startTimestamp, sSize, rst) {
    var finishTimestamp = (new Date()).valueOf();
    var elapsedTime = (finishTimestamp - startTimestamp);

    var sourceSize = toFixed2(sSize / 1024),
        resultSize = toFixed2(rst.base64Len / 1024),
        scale = parseInt(100 - (resultSize / sourceSize * 100));
        //把img放到裁剪里面
    $("#report").html('<img src="' + rst.base64 + '" style="width: 100%;height:100%">');
    cutImg();
    
}
var ua = navigator.userAgent.toLowerCase();//判断移动端类型
if(ua.match(/Android/i)=="android"){
	$('.changeAvatar input').attr("capture","camera");
}else if(ua.match(/iPhone/i)=="iphone"){
	$('.changeAvatar input').attr("multiple","multiple");
};

$(document).on('change','.image', function() {
    var startTimestamp = (new Date()).valueOf();
    var topSum = $(this).offset().top - $('.uploadPictures').offset().top - 20 + 'px';
	$('#showEdit').css('top',topSum);
    var that = this;
    lrz(this.files[0], {
            width: 800,
            height: 800,
            quality: 1.0
       })
        .then(function(rst) {
            doFinish(startTimestamp, that.files[0].size, rst); 
        })  
});

/*-------------------------------------------------------------------------*/

//判断页面是否有没填写的
function Caution () {
	if($('.askQuestion textarea').val()==''){
		$('#caution').show();
		$('.hint_information').text('您还没有提问问题');
	};
	if($("#image").val()==''||$("#image2").val()==''||$("#image3").val()=='') {
	   	$('#caution').show();
		$('.hint_information').text('请上传三张图片');
	};
};
$('#caution_confirm').on('click',function(){
	$('#caution').hide();
});
//	textarea获取焦点的时候
function Focus (cla,text){
	$(cla).bind('focus',function(){
		$(this).prop('placeholder','');
	}).bind('blur',function(){
		if(!$(this).val()){
			$(this).prop('placeholder',text);
		}else{
			$(this).prop('placeholder','');
		}
	});
};
Focus('.askQuestion textarea','请填写提问问题');
Focus('.supplementaryQuestion textarea','补充问题');

//点击添加标签出现弹框
	$('#addLabel').click(function(){
		$('.pop_box').show();	
	});
	
//按钮选中或取消时的变化
	var listBtn = $('.top_list').find('li');
	listBtn.click(function(){
		$(this).toggleClass('top_list_hover');
	});
	
//点击弹框确定键
	$('#pop_affirm').click(function(){
		var btnArr=[];
		for(var i = 0; i < listBtn.length; i++){
			var everyBtn = listBtn.eq(i);
			if(everyBtn.hasClass('top_list_hover')){
				var btnHtml = everyBtn.html();
				if(!btnArr[btnHtml]){
					btnArr.push(btnHtml);
				}
			}
		};
		//往页面填充选中的按钮
		for(var j = 0; j < btnArr.length; j++){
			var everyEle = btnArr[j];
			var $span = "<span>" + everyEle + "</span>"
			$('.userProblem').append($span)
		}
		listBtn.removeClass('top_list_hover');
		$('.pop_box').hide();
	});
	//点击弹框取消键
	$('#pop_off').click(function(){
		listBtn.removeClass('top_list_hover');
		$('.pop_box').hide();
	});
	
/*-------------------------------------------------------------------------*/	

//获取图片	
	var currentImgDom;
	$('.image').click(function(){
		currentImgDom = this;
	});
	$('#confirmBtn').click(function(){
		$("#showEdit").fadeOut();
	    var $image = $('#report > img');
	    var dataURL = $image.cropper("getCroppedCanvas");
	    //获取图片的base64
	    var imageBase = dataURL.toDataURL("image/jpeg", 0.5);
	    $('#showResult').fadeIn();
	    layer.open({
		    type: 2,
		    content: '图片上传中'
		 });
	    $.ajax({
			type:"get",
			url:"data.json",
			data:imageBase,
			async:true,
			success:function(){
				$(currentImgDom).prev().attr('src',imageBase);
				layer.closeAll();
			},
			error:function(){
				console.log('失败');
			}
		});
		
	});
	//点击确认键提交页面数据
	var submitBtn = $('#submitBtn');
	submitBtn.click(function () {
		Caution ();
		var ask_quest = $('.askQuestion textarea').val();
		var supplementary_quest = $('.supplementaryQuestion textarea').val();
		var userProblemLable = $('.userProblem span');
		var lable = [];
		for(var i =0;i<userProblemLable.length;i++){
			var span_html = userProblemLable.eq(i).html();
			lable.push(span_html);
		};
	//获取照片
	var pictures = $('#showResult').find('.changeAvatar');
		var imgArr = [];
		for(var k = 0; k < pictures.length; k++){
			var item = pictures[k].getElementsByTagName('img');
			var pic_src = item[0].getAttribute('src');
			imgArr.push(pic_src);
		};
		console.log(imgArr);
		$.ajax({
			type:"get",
			url:"data.json",
			data:{
				ques1:ask_quest,
				ques2:supplementary_quest,
				lable:lable.toString(),
				imgArr:imgArr.toString(),
			},
			async:true,
			success:function(){
				
			},
			error:function(){
				console.log('失败');
			}
		});
	});
	
	
	
})();