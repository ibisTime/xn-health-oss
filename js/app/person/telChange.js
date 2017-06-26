$(function() {

    var codeTimeNum=60;

    $("#subBtn").click(function() {
        var sms = $("#smsCaptcha").val();
        if (sms == '') {
            toastr.info('验证码不能为空')
        } else {
            var data = $('#jsForm').serializeObject();
            data['userId'] = getUserId();
            reqApi({
                code: 805047,
                json: data
            }).done(function() {
                toastr.info('修改成功，请用新手机号登录！');
                setTimeout(function() {
                    window.location.href = "../signin.html?kind=11"
                }, 1500);
            });
        }

    });
    $("#smsBtn").click(function() {
        var mobile = $("#newMobile").val();
        if (mobile == '') {
            toastr.info('手机号不能为空')
        } else {
            if(codeTimeNum==60){

                timer = setInterval(function(){
                    codeTimeNum--;

                    $("#smsBtn").attr("value",""+codeTimeNum+"s");

                    if(codeTimeNum<0){
                        clearInterval(timer);
                        codeTimeNum=60;

                        $("#smsBtn").attr("value","发送短信");
                    }
                },1000);

                var data = {};
                data['mobile'] = $('#newMobile').val();
                data['kind'] = 'f2';
                data["bizType"] = "805047";
                reqApi({
                    code: 805904,
                    json: data
                }).done(function() {
                    toastr.info('发送成功！')
                });
            }
           
        }

    });
});
