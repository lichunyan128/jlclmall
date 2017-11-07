
$(function(){
//上传照片
var imgIndex;
function toFixed2(num) {
    return parseFloat(+num.toFixed(2));
}
$('#cancleBtn').on('click', function() {
    $("#showEdit").fadeOut();
    $('#showResult').fadeIn();
});


function cutImg() {
    $('#showResult').fadeOut();
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
	$('.maskLayer').show();
    var finishTimestamp = (new Date()).valueOf();
    var elapsedTime = (finishTimestamp - startTimestamp);
    //$('#elapsedTime').text('压缩耗时： ' + elapsedTime + 'ms');
    var sourceSize = toFixed2(sSize / 1024),
        resultSize = toFixed2(rst.base64Len / 1024),
        scale = parseInt(100 - (resultSize / sourceSize * 100));
    $("#report").html('<img src="' + rst.base64 + '" style="width: 100%;height:100%">');
   cutImg();
   $('.maskLayer').hide();
}

$(document).on('change','.image', function() {
    var startTimestamp = (new Date()).valueOf();
    var imgEle = $('.image');
	var tempId = this.id;
    imgEle.each(function(index, el) {
        if (tempId == el.id) {
            imgIndex = index;
        }  
    });
    var that = this;
    lrz(this.files[0], {
            width: 800,
            height: 800,
            quality: 1
       })
        .then(function(rst) {
            doFinish(startTimestamp, that.files[0].size, rst);
        })
        
});

//点击评语弹出评语框
function Remarkbounced(){
	$('#container').on('tap','.click_remark',function(){
		var dataId = $(this).attr('data-id'),
		userRemarkBox = $('.user_remark');
		for(var i=0;i<userRemarkBox.length;i++){
			if($(userRemarkBox[i]).attr('data-id')==dataId){
                if($(userRemarkBox[i]).css('display')=='none'){
                    $(userRemarkBox[i]).css('display','block')
                }else{
                    $(userRemarkBox[i]).css('display','none')
                }
            }
		}
	});
}Remarkbounced();
//点击发布获取弹框的数据
$('#container').on('tap','.click_publish',function(){
	var object = {};
	var add_text;
	var userinfo,add_value;
	var dataId = $(this).attr('data-id');
	var moduleBox = $('.user_remark');
	for(var i=0;i<moduleBox.length;i++){
		if($(moduleBox[i]).attr('data-id')==dataId){
			//获取input填写的内容值
			add_text = $(moduleBox[i]).find($('.input_text'));
				for(var j = 0; j < add_text.length; j++){
					var item = $(add_text[j]);
					add_value = add_text[j].value;
					userinfo = item.attr('questList');
					object[userinfo] = add_value;
				};
			};
		//获取照片
		if($(moduleBox[i]).attr('data-id')==dataId){
			var pictures = $(moduleBox[i]).find('.changeAvatar');
			var imgArr = [];
			for(var k = 0; k < pictures.length; k++){
				var item = pictures[k].getElementsByTagName('img');
				var pic_src = item[0].getAttribute('src');
				imgArr.push(pic_src);
				
			}
			Picture ($(moduleBox[i]));
			object['imges'] = imgArr;	
		}
	}
	//此处打印
});
	var currentImgDom;
	$('#container').on('tap','.image',function(){
		currentImgDom = this;
	})
	$('#confirmBtn').click(function(){
		$("#showEdit").fadeOut();
	    var $image = $('#report > img');
	    var dataURL = $image.cropper("getCroppedCanvas");
	    var imageBase = dataURL.toDataURL("image/jpeg", 1);
	    $('#showResult').fadeIn();
	    
		// var option = {
		// 		url: '后端给的URL',
		// 		type: 'POST',
		// 		data: imageBase,
		// 		processData: false,
		// 		contentType: false,
		// 		success: function (result) {
		// 			var resultObj = JSON.parse(result);
		// 			//成功回调更改图片src
		// 			$(currentImgDom).prev().attr('src',result.resultObj);
		// 			//此时图片src已经更改成了后端传的src了
		// 		},
		// 		error: function (result) {
		// 			console.log(result);
		// 		}
		// 	}
		// $.ajax(option)
		$(currentImgDom).prev().attr('src',imageBase)
	})		

//判断评语里面的照片有没有上传
function Picture (parentEl){
	var inputEle = parentEl.find('input');
	for(var m = 0; m < inputEle.length; m++){
		if(!inputEle.eq(m).val()){
			$('#remind_case').show();
			$('.hint_information').text('请上传三张图片');
		}
	};			
};
$('#remind_confirm').on('click',function(){
	$('#remind_case').hide();
})
})


