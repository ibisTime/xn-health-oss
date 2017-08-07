$(function() {
	var code =sessionStorage.getItem('storeCode');
	var level =sessionStorage.getItem('level'); 

	new QRCode(document.getElementById('qrcode'), level+":"+code);
	var qrcode = new QRCode('qrcode', {
	  text: 'your content',
	  width: 256,
	  height: 256,
	  colorDark : '#000000',
	  colorLight : '#ffffff',
	  correctLevel : QRCode.CorrectLevel.H
	});


	qrcode.clear();
	qrcode.makeCode('new content');
	qrcode.clear();  
	$('.tools .toolbar').empty();

    $('.tools .toolbar').html('<li style="display:block;" id="downLoadBtn"><span><img src="/static/images/t01.png"></span>下载二维码</li>');
    $('#downLoadBtn').on('click', function() {
        savePic(code)
    });	
	

	function savePic(code) {
	    var img = $("#qrcode").find('img')[0];
	    var alink = document.createElement("a");
	    alink.href = img.src;
	    alink.download = code + ".jpg";
	    alink.click();
	}

});