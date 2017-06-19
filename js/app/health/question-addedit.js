$(function() {
	
	var code = getQueryString('code');
	var dc = getQueryString('dc')
	var view = getQueryString('v');
	var storeCode = sessionStorage.getItem('storeCode')
	
	var dc = getQueryString('dc')
	var view = getQueryString('v');
	var pcode;
	var codeInd=0;
	var paramIndex=0;
	
	var provinceData=[];
	
	var fields = [{
        field: 'kind',
        title: '类别',
        type: "select",
        listCode: "621906",
        params:{
            parentKey: "questionare_kind",
        },
        required: true,
        keyName:'dkey',
        valueName:'dvalue',
        onChange:function(v,data){
			reqApi({
                code: '621906',
                json: {
                	parentKey: v
                },
                sync: true
            }).done(function(d) {
            	var data1 = {};
            	if(d.length && v){
            		
            		d.forEach(function(v,i){
            			data1[v.dkey] = v.dvalue;
            		})
            		$("#type_chosen").parent().show();
            	}else{
            		$("#type_chosen").parent().hide();
            	}
            	
            	$("#type").renderDropdown2(data1);
            	
            });
		}
    }, {
        field: 'type',
        title: '分类',
        type: "select",
        required: true  
    }, {
        field: 'title',
        title: '标题',
        search: true,
        required: true
    }, {
        field: 'advPic',
        title: '广告图',
        type: 'img',
        search: true,
        required: true
    }, {
        field: 'summary',
        title: '摘要',
        type: 'textarea',
        required: true,
        // maxlength: 20
    }, {
        field: 'content',
        title: '内容',
        required: true,
        type: 'textarea',
    }, {
        field: 'orderNo',
        title: '顺序',
        required: true
    }];
	 
	buildDetail({
		fields: fields,
		code: code,
		code: {
			code: code,
		},
		detailCode: '621206',
		addCode: '621200',
		editCode: '621202',
		beforeSubmit: function(data) {
            if (!data.type){
				data.type = "0";
			}

            return data;
        },
	});

    
    $("#summary").siblings(".wangEditor-container").hide();
    $("#summary").css({ "height": "160px",
                        "width": "328px",
                        "position": "relative",
                        "left": "197px",
                        "top": "-35px",
                        "width": "350px",
                        "line-height": "32px",
                        "border": "solid 1px #ced9df"});
    $("#summary").has(".error").css({"left": "358px"});
         

});