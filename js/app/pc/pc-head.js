$(function () {
  $(".logo a").attr("href","http://"+OSS.guideBaseUrl);
  
  $("#partnerLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=05");
  $("#partnerApply").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/partner_apply.html");

  $("#storeLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=f2");
  $("#storeApply").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/store_apply.html");

  $("#houseApply").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/home_apply.html");
  $("#houseLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=11");

  $("#supplierLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=f2");
  $("#supplierApply").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/supplier_apply.html");  

  $("#iosDownload").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/IOS.html");
  $("#androidDownload").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/Android.html");

	reqApi({
        code: '807717',
        json: {
            ckey: 'telephone'
        },
        sync: true
    }).then(function(data) {

        $("#tel").text("欢迎致电："+data.note);
    });

    reqApi({
        code: '807717',
        json: {
            ckey: 'time'
        },
        sync: true
    }).then(function(data) {

        $("#time").text("服务时间："+data.note);
    });

    $("#aboutus").on('click',function(){
	    	reqApi({
	        code: '807717',
	        json: {
	            ckey: 'aboutUs'
	        },
	        sync: true
	    }).then(function(data) {
	    	if ($("#banner").length == "0" ) {
          console.log(data)
          $(".banner").html(data.note).find("img").css({"width": "100%","background-size": "cover","margin-top": "-32px"});;
        }else{
          $("#banner").html(data.note);
        }
	    });
    })
    
})