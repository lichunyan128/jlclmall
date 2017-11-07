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
    var finishTimestamp = (new Date()).valueOf();
    var elapsedTime = (finishTimestamp - startTimestamp);
    //$('#elapsedTime').text('压缩耗时： ' + elapsedTime + 'ms');

    var sourceSize = toFixed2(sSize / 1024),
        resultSize = toFixed2(rst.base64Len / 1024),
        scale = parseInt(100 - (resultSize / sourceSize * 100));
        //把img放到裁剪里面
    $("#report").html('<img src="' + rst.base64 + '" style="width: 100%;height:100%">');
    cutImg();
    
}

$(document).on('change','.image', function() {
    var startTimestamp = (new Date()).valueOf();
//  var imgEle = $('.image');
//	var tempId = this.id;
//  imgEle.each(function(index, el) {
//      if (tempId == el.id) {
//          imgIndex = index;
//      }  
//  });
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
	//点击是出现弹框
	$('.symptom_yes').click(function(){
		Radio_color ($('.symptom_yes'));
		$('.subjectiveSymptom').show();
	});
	$('.symptom_no').click(function(){
		Radio_color ($('.symptom_no'));
		$('.subjectiveSymptom').hide();
		$('input[name=checkbox2]').prop('checked',false).removeClass("checked_color").addClass('checkbox_acquiescent');
	});
	
	$('.beauty_yes').click(function(){
		Radio_color ($('.beauty_yes'));
		$('.beauty_item').show();
	});
	$('.beauty_no').click(function(){
		Radio_color ($('.beauty_no'));
		$('.beauty_item').hide();
		$('.beauty_item').val('');
	});
	
	$('.mask_yes').click(function(){
		Radio_color ($('.mask_yes'));
		$('.useMaskFrequency').show();
	});
	$('.mask_no').click(function(){
		Radio_color ($('.mask_no'));
		$('.useMaskFrequency').hide();
		$('input[name=mask1]').prop('checked',false).removeClass("checked_color");
	});
	
	$('.unguent_yes').click(function(){
		Radio_color ($('.unguent_yes'));
	});
	$('.unguent_no').click(function(){
		Radio_color ($('.unguent_no'));
	});
	
	$('.pregnancy_yes').click(function(){
		Radio_color ($('.pregnancy_yes'));
		$('.pregnancyTime').show();
	});
	$('.pregnancy_no').click(function(){
		Radio_color ($('.pregnancy_no'));
		$('.pregnancyTime').hide();
		$('input[name=pregnancyTime]').prop('checked',false).removeClass("checked_color");
		
	});
	//是否有美容师接待
	$('.reception_yes').click(function(){
		Radio_color ($('.reception_yes'));
		$('.numbers').show();
		$('.writeWechat').hide();
		$('.writeWechat').find('input').val('');
	});
	$('.reception_no').click(function(){
		Radio_color ($('.reception_no'));
		$('.writeWechat').show();
		$('.numbers').hide();
		$('.numbers').find('input').val('');
	});
//多选框变色
$('input[type="checkbox"]').click(function(){
	if($(this).hasClass('checkbox_acquiescent')){
		$(this).removeClass('checkbox_acquiescent');
		$(this).addClass('checked_color');
	}else{
		$(this).removeClass('checked_color');
		$(this).addClass('checkbox_acquiescent');
	}
});
//单选框变色
function Radio_color (ele){
	ele.addClass('checked_color').siblings().removeClass("checked_color");
}
//是否使用面膜(选择变色)
var radioele = $('input[name="mask1"]');
for(var i = 0; i < radioele.length; i++){
	radioele[i].onclick = function(){
		$(this).addClass('checked_color').siblings().removeClass("checked_color");
	}	
}

//是否怀孕期间(选择变色)
var radioele = $('input[name="pregnancyTime"]');
for(var i = 0; i < radioele.length; i++){
	radioele[i].onclick = function(){
		$(this).addClass('checked_color').siblings().removeClass("checked_color");
	}	
}	

//点击添加步骤晚上
nignum=4;
niglis=4;
$('.nightBtn').click(function(){
	var  p = $('<p>步骤'+ (nignum++) +'<input type="text" questList = "nig_step'+ (niglis++) +'" /><p/>');
	$('.night').append(p);
})
//点击添加步骤早上
mornum=4;
morlis=4;
$('.morningBtn').click(function(){
	var  p = $('<p>步骤'+ (mornum++) +'<input type="text" questList = "mor_step'+ (morlis++) +'" /><p/>');
	$('.morning').append(p);
})
//肌肤自觉症状为是的选择
var symptom = false;	
	$('input[name="symptom"]').click(function(){
		var that = $(this);
		if(that.is('.symptom_yes')){
			symptom = true;
		}else{
			symptom = false;
		}
	});
//是否使用面膜(是否选时间段)
var mask = false;	
	$('input[name="mask"]').click(function(){
		var that = $(this);
		if(that.is('.mask_yes')){
			mask = true;
		}else{
			mask = false;
		}
	});
//是否在怀孕期间(是否选择)
var pregnancy = false;	
	$('input[name="pregnancy"]').click(function(){
		var that = $(this);
		if(that.is('.pregnancy_yes')){
			pregnancy = true;
		}else{
			pregnancy = false;
		}
	});


//确定提交获取数值
var add_text,userinfo,add_value
var object = {};
var skin_symptom = $('input[name="checkbox2"]');
var	skin_mask = $('input[name="mask1"]');
var	skin_pregnancy = $('input[name="pregnancyTime"]');
	$('#confirm').on('tap',function(){
		Message ();
		//获取两个下拉菜单对象（省市）
		var prov = $(".province").find("option:selected");
		var prov_val = prov.text();
		var city = $(".city").find("option:selected");
		var city_val = city.text();
		//获取input填写的内容值
		add_text = $('input[type="text"]');
		for(var i = 0; i < add_text.length; i++){
			var item = $(add_text[i]);
			add_value = add_text[i].value;
			userinfo = item.attr('questList');
			object[userinfo] = add_value;
		};
		
		//获取单选按钮值
		var radioButton = $('input[type="radio"]');
		for(var i = 0; i < radioButton.length; i++){
			var item = radioButton[i];
			if(item.checked){
				add_value = item.value;
				parentNode = item.parentNode;
				userinfo = parentNode.getAttribute("questList");
				object[userinfo] = add_value;
			}
		}
		//获取多选按钮值
		var checkboxButton = $('input[name="checkbox1"]');
		for(var i = 0; i < checkboxButton.length; i++){
			var item = $(checkboxButton[i]);
			if(item.is(':checked')){
				add_value = item.val();
				userinfo = item.attr('questList');
				object[userinfo] = add_value;
			}
		}
	//肌肤是否有自觉症状？
		if(symptom){
			for(var i = 0; i < skin_symptom.length; i++){
				var item = $(skin_symptom[i]);
				if(item.is(':checked')){
					add_value = item.val();
					userinfo = item.attr('questList');
					object[userinfo] = add_value;
				}
			}	
		}else{
			for(var i = 0; i < skin_symptom.length; i++){
				var item = $(skin_symptom[i]);
				if(item.is(':checked')){
					userinfo = item.attr('questList');
					delete object[userinfo];
				}
			}
		};

		//是否使用面膜
		if(mask){
			for(var i = 0; i < skin_mask.length; i++){
				var item = skin_mask[i];
				if(item.checked){
					add_value = item.value;
					parentNode = item.parentNode;
					userinfo = parentNode.getAttribute("questList");
					object[userinfo] = add_value;
				}
			}	
		}else{
			for(var i = 0; i < skin_mask.length; i++){
				var item = skin_mask[i];
				if(item.checked){
					add_value = item.value;
					parentNode = item.parentNode;
					userinfo = parentNode.getAttribute("questList");
					delete object[userinfo];
				}
			}
		};	
		//是否在怀孕期间
		if(pregnancy){
			for(var i = 0; i < skin_pregnancy.length; i++){
				var item = skin_pregnancy[i];
				if(item.checked){
					add_value = item.value;
					parentNode = item.parentNode;
					userinfo = parentNode.getAttribute("questList");
					object[userinfo] = add_value;
				}
			}	
		}else{
			for(var i = 0; i < skin_pregnancy.length; i++){
				var item = skin_pregnancy[i];
				if(item.checked){
					add_value = item.value;
					parentNode = item.parentNode;
					userinfo = parentNode.getAttribute("questList");
					delete object[userinfo];
				}
			}
		};	
		
	
		//获取图片
		var pictures = document.getElementsByClassName('changeAvatar');
			var imgArr = [];
			for(var i = 0; i < pictures.length; i++){
				var item = pictures[i].getElementsByTagName('img');
				var pic_src = item[0].getAttribute('src')
				imgArr.push(pic_src);
			}
			object['imges'] = imgArr;
		//此处打印
	});
	
		
//利用假数据返回页面

	//定义临时变量,存储点击上传的input节点
	var currentImgDom;
	$('.image').click(function(){
		//将this发给临时变量
		currentImgDom = this;
	})
	$('#confirmBtn').click(function(){
		layer.open({
		    type: 2,
		    content: '加载中'
		  });
		$("#showEdit").fadeOut();
	    var $image = $('#report > img');
	    var dataURL = $image.cropper("getCroppedCanvas");
	    //获取图片的base64
	    var imageBase = dataURL.toDataURL("image/jpeg", 0.5);
	    $('#showResult').fadeIn();
		
		
		
		// var option = {
		// 		url: '后端给的URL',
		// 		type: 'POST',
		// 		data: formData,
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
		$(currentImgDom).prev().attr('src',imageBase);
		layer.open({
		    type: 2
		    ,content: '加载完成'
		     ,time: 1
		  });
	})

	
//判断用户信息是否全部填写完成
	function Message (){
			if($('#name').val()==''){
				$('#remind_case').show();
				$('.hint_information').text('姓名没有填写');
			};
			if($('#age').val()==''){
				$('#remind_case').show();
				$('.hint_information').text('年龄没有填写');
			};
			if($('.province').val()==''||$('.city').val()==''){
				$('#remind_case').show();
				$('.hint_information').text('地址没有填写');
			};
			if($("input[name='checkbox1']").is(":checked")<1) {
			   	$('#remind_case').show();
				$('.hint_information').text('肌肤问题多选没有填写');
			};
			if($('.write_month').val()==''){
				$('#remind_case').show();
				$('.hint_information').text('肌肤出现问题多久了?没有填写');
			};
			if($("input[name='symptom']").is(":checked")<1) {
			   	$('#remind_case').show();
				$('.hint_information').text('肌肤是否有自觉症状？没有填写');
			};
			if($(".symptom_yes").is(":checked")) {
				if($("input[name='checkbox2']").is(":checked")<1) {
				   	$('#remind_case').show();
					$('.hint_information').text('肌肤是否有自觉症状？选择是后的多选没有填写');
				};
			};
			if($("input[name='beautyQarlor']").is(":checked")<1) {
			   	$('#remind_case').show();
				$('.hint_information').text('是否去过美容院？没有填写');
			};
			if($(".beauty_yes").is(":checked")) {
				if($('.beauty_item').val()==''){
					$('#remind_case').show();
					$('.hint_information').text('做过的美容项目没有填写');
				}
			};
			
			if($("input[name='hospitalTreat']").is(":checked")<1) {
			   	$('#remind_case').show();
				$('.hint_information').text('是否涂抹皮肤类药膏？没有填写');
			};
			//HTML 116行添加了一个class='use_product'
			if($(".use_product").val()=='') {
			   	$('#remind_case').show();
				$('.hint_information').text('最近一年使用的什么品牌护肤品及产品功效？没有填写');
			};
			//HTML 132行添加了一个class="night_step"
			if($('.night_step').val()==''){
				$('#remind_case').show();
				$('.hint_information').text('近一个月晚上使用护肤产品步骤没有填写');
			};
			//HTML 138行添加了一个class="morning_step"
			if($('.morning_step').val()==''){
				$('#remind_case').show();
				$('.hint_information').text('近一个月早上使用护肤产品步骤没有填写');
			};
			if($("input[name='mask']").is(":checked")<1) {
			   	$('#remind_case').show();
				$('.hint_information').text('是否使用面膜？没有填写');
			};
			if($('.mask_yes').is(":checked")){
				if($("input[name='mask1']").is(":checked")<1) {
				   	$('#remind_case').show();
					$('.hint_information').text('选择使用面膜后的使用规律没有填写');
				};
			};
			//HTML 138行添加了一个class="bath_period"
			if($('.bath_period').val()==''){
				$('#remind_case').show();
				$('.hint_information').text('洗澡的周期及时间？没有填写');
			};
			//HTML 167行添加了一个class="dietary"
			if($('.dietary').val()==''){
				$('#remind_case').show();
				$('.hint_information').text('饮食起居及习惯？没有填写');
			};
			if($("input[name='pregnancy']").is(":checked")<1) {
			   	$('#remind_case').show();
				$('.hint_information').text('是否在怀孕期间？没有填写');
			};
			if($('.pregnancy_yes').is(":checked")){
				if($("input[name='pregnancyTime']").is(":checked")<1) {
				   	$('#remind_case').show();
					$('.hint_information').text('怀孕时间没有填写');
				};
			};
			if($("input[name='reception']").is(":checked")<1) {
			   	$('#remind_case').show();
				$('.hint_information').text('是否有美容师接待？没有填写');
			};
			//HTML 190行添加了一个class="beauticianNumber"
			if($(".reception_yes").is(":checked")) {
				if($('.beauticianNumber').val()==''){
					$('#remind_case').show();
					$('.hint_information').text('美容师接待编号没有填写');
				}
			};
			//HTML 193行添加了一个class="contactWay"
			if($(".reception_no").is(":checked")) {
				if($('.contactWay').val()==''){
					$('#remind_case').show();
					$('.hint_information').text('是否有美容师接待？里的联系方式没有填写');
				}
			};
			if($("#image").val()==''||$("#image2").val()==''||$("#image3").val()=='') {
			   	$('#remind_case').show();
				$('.hint_information').text('请上传三张图片');
			};

		
	}
	//判断年龄正确性
	$('#age').on('blur',function(){
		console.log(1111)
		console.log($(this).val())
		if($(this).val() && parseInt($(this).val()) <= 0){
			$("#remind_case").show();
			$('.hint_information').text('请输入正确年龄');
			$(this).val('');
		}
	})
	$(".contactWay").on('blur',function(){
		var this_val = $(this).val();
		var phone = checkPhone(this_val)
		if(!phone){
			$("#remind_case").show();
			$('.hint_information').text('请输入正确的手机号码');
			$(this).val('');
		}
	})
	$('#remind_confirm').on('click',function(){
		$('#remind_case').hide();
	})


	//手机号码验证
	function checkPhone(phone){
	    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
	        console.log("手机号码有误，请重填");
	        return false;
	    }
	    else{
	    	console.log("chenggong");
	    	return true;
	    }
	}
})


