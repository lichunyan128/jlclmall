
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
        aspectRatio: 0.8 / 1,
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
            quality: 0.7
       })
        .then(function(rst) {
//                    console.log(rst);
            doFinish(startTimestamp, that.files[0].size, rst);
            
        })
      
});

	
})


