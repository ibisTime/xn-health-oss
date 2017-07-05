$(function () {
 //    $(".logo a").attr("href","http://"+OSS.guideBaseUrl);
	// $("#partnerLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=05");
	// $("#storeLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=f2");
	// $("#storeApply").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/store_apply.html");
	// $("#houseApply").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/home_apply.html");
	// $("#houseLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=11");
 //    $("#iosDownload").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/IOS.html");
 //    $("#androidDownload").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/Android.html");

	// reqApi({
 //        code: '807717',
 //        json: {
 //            ckey: 'telephone'
 //        },
 //        sync: true
 //    }).then(function(data) {

 //        $("#tel").text("欢迎致电："+data.note);
 //    });

 //    reqApi({
 //        code: '807717',
 //        json: {
 //            ckey: 'time'
 //        },
 //        sync: true
 //    }).then(function(data) {

 //        $("#time").text("服务时间："+data.note);
 //    });

    reqApi({
        code: '806052',
        json: {
            location: '5'
        },
        sync: true
    }).then(function(data) {
        data.map(function(p,i){
            $("#banner").append('<img src="'+OSS.picBaseUrl +"/"+data[i].pic +'">');
        })
    });

    // $("#aboutus").on('click',function(){
	   //  	reqApi({
	   //      code: '807717',
	   //      json: {
	   //          ckey: 'aboutUs',
    //             systemCode:OSS.system
	   //      },
	   //      sync: true
	   //  }).then(function(data) {
	   //  	console.log(data)
	   //      $("#banner").html(data.note);
	   //  });
    // })
    
})