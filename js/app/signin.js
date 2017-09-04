
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return '';
}
sessionStorage.setItem('loginKind', getQueryString('kind') || '01');
$(function(){
	window.sessionStorage.setItem('systemCode', OSS.system);
    // frameset框架嵌套，跳转到最外层
	if (top.location != self.location){
		top.location=self.location;
	}
	
	function login() {
		if (!$('#loginName').val()) {
			toastr.info('请输入用户名');
			$('#loginName')[0].focus();
		} else if (!$('#loginPwd').val()) {
			toastr.info('请输入密码');
			$('#loginPwd')[0].focus();
		} else {
			var data = {};
			var t = $('#loginForm').serializeArray();
			var kind = 'kind';
			var reg = new RegExp('(^|&)' + kind + '=([^&]*)(&|$)', 'i');
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) {
				data.kind = decodeURIComponent(r[2]);
			}else{
				data.kind = '01';
			}
			
			$.each(t, function() {
				data[this.name] = this.value;
			});
			
			reqApi({
				code: '805043',
				json: data
			}).then(function(data) {
				location.href = "main.html";
				window.sessionStorage.setItem('token', data.token || data.userId);
				window.sessionStorage.setItem('userId', data.userId);
			});
		}
	}

	// 登录
	$('#loginBtn').click(function() {
		login();
	});

	$(document).on('keyup', function(e) {
		if (e.keyCode == '13') {
			login();
		}
	});
	
	// swiper
	var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 0,
        //effect : 'flip',
        observer: true,
        observeParents: true,
        threshold: 30,
        pagination: '.tabs', 
        paginationClickable: true,
        bulletClass: 'tab',
        onlyExternal : true,
        bulletActiveClass: 'active',
//        //loop: true,
        paginationBulletRender: function (index, className) {
            var html = '';
            switch (index) {
                case 0:
                    html = '<input  id="second_tab" type="button" class="login-btn login-back '+className+'" value="返回登录"/>';
                    break;
                case 1:
                    html = '<a id="first_tab" class="pwd-back '+className+'" style="font-size: 12px;">忘记密码？找回密码</a>';
                    break;
                default:
                    html = '';
            }            
            return html;
        }

    });
		// if(!$('#first_tab').hasClass('active')){
		// 	$('#first_tab').css('z-index','99999')
		// }
    
	
	function count(el, second) {
		el.prop('disabled', true);
		var timer = setInterval(function() {
			second--;
			el.val('重发('+second+')');
			if (second == 0) {
				el.val('获取验证码');
				el.prop('disabled', false);
				clearInterval(timer);
			}
		}, 1000);
	}
	
	$('#smsBtn').on('click', function() {
		var userTel = $("#loginName1").val();
		if(userTel == null || userTel == ""){
    		toastr.info("请输入登录名");
    	}else if(getProvingTel($("#loginName1"))){
    		var captchaTime = 60;//重新发送时间
    		if(captchaTime==60){
    			$('#smsBtn').prop('disabled', true);
				timer = setInterval(function(){
					captchaTime--;
					
					$("#smsBtn").attr("value","重新发送("+captchaTime+")");
					
					if(captchaTime<0){
						$('#smsBtn').prop('disabled', false);
						clearInterval(timer);
						captchaTime=60;
						$("#smsBtn").attr("value","获取验证码");
					}
				},1000);
				
				var parem={
					"mobile":userTel,
					"bizType":"805048",
		            "kind": getQueryString('kind'),
		            "systemCode":OSS.SYSTEM_CODE,
		            "companyCode":OSS.COMPANY_CODE
				}

				reqApi({
					code: '805904',
					json: parem
				}).done(function(data) {
					toastr.info(data.msg?data.msg:'已将验证码发送到手机')
				});				
				
			}
    	}
	});

	
	
	$('#confirmBtn').on('click', function() {
		if (!$('#loginName1').val()) {
			toastr.info('请输入登录名');
		} else if (!$('#smsCaptcha').val()) {
			toastr.info('请输入短信验证码');
		} else if (!$('#newLoginPwd').val()) {
			toastr.info('请输入新密码');
		} else {
			$('#confirmBtn').prop('disabled', true);
				reqApi({
					code: '805048',
					json: {
						mobile: $('#loginName1').val(),
						smsCaptcha: $('#smsCaptcha').val(),
						newLoginPwd: $('#newLoginPwd').val(),
						kind: getQueryString('kind'),
						loginPwdStrength:calculateSecurityLevel($('#newLoginPwd').val()),
				        systemCode:OSS.SYSTEM_CODE					
					}
				}).done(function(data) {
					// $('#confirmBtn').prop('disabled', false);
					if (data.isSuccess) {
						toastr.info('恭喜您重置密码成功！');
						$('#confirmBtn').prop('disabled', false)
						mySwiper.slidePrev();
					} else {
						toastr.info(data.msg);
						$('#confirmBtn').prop('disabled', true)
					}
				});			
		}
	});

	function getProvingTel(obj){
		var val=obj.val();
		var mobilevalid = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
		
		if (!mobilevalid.test(val)) {
			toastr.info("请输入正确的登录名！");
			return false;
		}else{
			return true;
		}
	}	
	
	function calculateSecurityLevel(password) {
            var strength_L = 0;
            var strength_M = 0;
            var strength_H = 0;

            for (var i = 0; i < password.length; i++) {
                var code = password.charCodeAt(i);
                // 数字
                if (code >= 48 && code <= 57) {
                    strength_L++;
                    // 小写字母 大写字母
                } else if ((code >= 65 && code <= 90) ||
                    (code >= 97 && code <= 122)) {
                    strength_M++;
                    // 特殊符号
                } else if ((code >= 32 && code <= 47) ||
                    (code >= 58 && code <= 64) ||
                    (code >= 94 && code <= 96) ||
                    (code >= 123 && code <= 126)) {
                    strength_H++;
                }
            }
            // 弱
            if ((strength_L == 0 && strength_M == 0) ||
                (strength_L == 0 && strength_H == 0) ||
                (strength_M == 0 && strength_H == 0)) {
                return "1";
            }
            // 强
            if (0 != strength_L && 0 != strength_M && 0 != strength_H) {
                return "3";
            }
            // 中
            return "2";
        }
});