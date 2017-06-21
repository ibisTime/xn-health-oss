$(function () {
	$("#partnerLongin").attr("href","http://"+OSS.guideBaseUrl+"/signin.html?kind=05");
	$("#storeLongin").attr("href","http://"+OSS.guideBaseUrl+"/signin.html?kind=f2");
	$("#storeApply").attr("href","http://"+OSS.guideBaseUrl+"/store/store_apply.html");
	$("#houseApply").attr("href","http://"+OSS.guideBaseUrl+"/house/home_apply.html");
	$("#houseLongin").attr("href","http://"+OSS.guideBaseUrl+"/signin.html?kind=11");

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
	    	console.log(data)
	        $("#banner").html(data.note);
	    });
    })
    
})