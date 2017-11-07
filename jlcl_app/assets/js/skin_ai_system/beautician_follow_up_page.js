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
	
	var topSum = $(this).offset().top - $('.upload_photo').offset().top - 190 + 'px';
	$('#showEdit').css('top',topSum);
	
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
//                    console.log(rst);
            doFinish(startTimestamp, that.files[0].size, rst);
            
        })
      
});


//跟进动态创建
var imgI = 3,face = 3,comt=1,time=1,project=1,matter=1;
var remarkBtn=1,user_remark=1,add_follow_up=1,confirms=1,add_the_case=1;
var addfollow =  function () {
var ofollow_up_box = document.createElement('div');
var template_1 = 
   '<div class="module_box add_follow_up" data-fol="'+ (add_follow_up++) +'">'
      	+'<p class="questionnaire upload_pictures">肌肤跟进'+ (comt++) +'</p>'
		+'<div class="use_time">使用时间：<input type="text" name="text" questList = "time' + (time++) +'"></div>'
		+'<div class="use_time">产品方案：<textarea name="text" class="input_text" placeholder="1.赫伯洁面" questList="remarks' + (project++) +'"></textarea></div>'
		+'<div class="use_time">注意事项：<textarea name="text" class="input_text matter" placeholder="面膜周期：3天一次。洗澡周期：4天一次" questList="remark'+ (matter++) +'"></textarea></div>'
		+'<div class="use_time">客户照片：</div>'
		+'<section class="upload_photo module_context">'
			+'<div id="showResult" >';
    var template_2 = "";
    for(var i = 0;i<3;i++){
        template_2+="<div id='changeAvatar"+imgI+"' class='changeAvatar'> " +
            "<img class='blow_up' src='../../assets/img/skin_system_user_page_offside.jpg'>" +
            "<input id='image"+imgI+"' class='image'  type='file' accept='image/*' capture='camera' questList = 'front" + face +"'/>" +
            "</div>";
        imgI++;
        face++;
    }

    var template_3 =
      '</div>'
      +'<p class="note" id="note_first">*注：请在光线充足且不化妆，不使用美颜相机环境下拍摄，以便美容师准确判断肌肤问题</p>'
	  +'<p class="note">*/上传成功后，在示范处自动更换成客户照片</p>'
		+'</section>'
		+'<div class="amend_follow_up dynamic_follow_up">'
			+'<div id="confirm" class="follow_up confirms" data-fol="'+ (confirms++) +'">确定</div>'
		+'</div>'
    	+'</div>';
var template = template_1 + template_2 + template_3;
$(ofollow_up_box).append(template);
$('#container').prepend(ofollow_up_box);
};
//点击跟进添加新的
$('.follow_up_add').on('click',function(){
	$('#amend_follow_up').hide();
	$(this).hide();
	addfollow();
	
});
//修改里面的跟进
$('#amend_follow_up').on('click',function(){
	$('.follow_up_add').hide();
	$(this).hide();
	addfollow();
});
$(function(){
//点击修改获取值
function FirstcaseLibrary(){
	$('.amend').click(function(){
		Picture()
		var pict_text={};
		$('.remind_case').hide();
		//获取照片
		var pictures = $('.container').find('.first_skin_picture').find('.changeAvatar');
		var imgArr = [];
			for(var i = 0; i < pictures.length; i++){
				var item = pictures[i].getElementsByTagName('img');
				var pic_src = item[0].getAttribute('src');
				imgArr.push(pic_src);
			}
			pict_text['imges'] = imgArr;
//			console.log(pict_text);
		//此处打印

	});

};
FirstcaseLibrary();

//点击X删除照片
$('.changeAvatar strong').on('click',function(){
	var parentEl = $(this).parent();
	parentEl.find('img').attr('src','../../assets/img/skin_system_user_page_left_side.jpg')
	parentEl.find('.image').val('');
});
//点击确定键获取值
$('#container').on('click','.confirms',function(){
	var add_text,userinfo,add_value;
	var object = {};
	var dataFol = $(this).attr('data-fol'),
	moduleBox = $('.add_follow_up');
	for(var i=0;i<moduleBox.length;i++){
		if($(moduleBox[i]).attr('data-fol')==dataFol){
			//获取input填写的内容值
			add_text = $(moduleBox[i]).find($('[name="text"]'));
			for(var j = 0; j < add_text.length; j++){
				var item = $(add_text[j]);
				add_value = add_text[j].value;
				userinfo = item.attr('questList');
				object[userinfo] = add_value;
			};
			//获取照片
			var pictures = $(moduleBox[i]).find('.changeAvatar');
			var imgArr = [];
			for(var k = 0; k < pictures.length; k++){
				var item = pictures[k].getElementsByTagName('img');
				var pic_src = item[0].getAttribute('src');
				imgArr.push(pic_src);
			}
			FollowUpPicture($(moduleBox[i]));
			object['imges'] = imgArr;
			
		}
	}
	//此处打印
})

//利用假数据返回页面

	$(document).on('click','.changeAvatar',function(){
		$('#confirmBtn').attr('imgIndex',$(this).attr('id'))
	});
	
	$('#confirmBtn').click(function(){
		$("#showEdit").fadeOut();
	    var $image = $('#report > img');
	    var dataURL = $image.cropper("getCroppedCanvas");
	    var imageBase = dataURL.toDataURL("image/jpeg", 1);//第二个参数为图片质量参数
	    $('#showResult').fadeIn();
		var name = $(this).attr('imgIndex'); 
		$('#confirmBtn').attr('imgIndex','');
		 var option = {
		 		url: '后端给的URL',
		 		type: 'POST',
		 		data: imageBase,
		 		processData: false,
		 		contentType: false,
		 		success: function (result) {
		 			var resultObj = JSON.parse(result);
		 			
		 			//成功回调更改图片src
		 			 $('#' + resultObj.name+'>img').attr('src',resultObj.src)
		 			//此时图片src已经更改成了后端传的src了
		 		},
		 		error: function (result) {
		 			
		 		}
		 	}
		 $.ajax(option);
		 $('#' + name+'>img').attr('src',imageBase);
	});
	
//判断修改里面的照片是否上传
function Picture (){
	var inputEle = $('.first_skin_picture').find('.image');
	for(var i = 0; i < inputEle.length; i++){
		if($(inputEle[i]).val() ==''){
			$('#hint_case').show();
			$('.hint_information').text('请上传三张图片');
		}
	}
};
//判断跟进里面的照片是否上传
function FollowUpPicture (parentEl) {
	var inputEle = parentEl.find('.image');
	for(var i = 0; i < inputEle.length; i++){
		if($(inputEle[i]).val() ==''){
			$('#hint_case').show();
			$('.hint_information').text('请上传三张图片');
		}
	}	
};



});	


