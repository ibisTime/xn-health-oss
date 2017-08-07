$(function() {
	
	var code = getQueryString('code');
	var view = getQueryString('v');
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    }; 	
    
	var typeData = {}
	reqApi({
		code:'808007'
	}).done(function(d) {
            		
		d.forEach(function(v,i){
			typeData[v.code] = v.name;
		})
    });
	
    var remarkField = {
        title: '审核说明',
        field: 'approveNote',
        maxlength: 250,
        readonly: false,
        formatter:function(v,data){
           return  data.approveNote
        }        
    };

    var examineList = [remarkField]   
    var buttons = [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data.approveResult = '1';
                        data.storeCodeList = [code];
                        data.approver = getUserName();
                        data.remark = $("#approveNote").val();
                        reqApi({
                            code: '808202',
                            json: data
                        }).done(function(data) {
                            sucDetail();
                        });

                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        var data = [];
                        data.approveResult = '0';
                        data.storeCodeList = [code];
                        data.approver = getUserName();
                        // data.divRate = '0';
                        data.remark = $("#approveNote").val();
                        reqApi({
                            code: '808202',
                            json: data
                        }).done(function(data) {
                            sucDetail();
                        });
                    }
                }, {
                    title: '返回',
                    handler: function() {
                        goBack();
                    }
                }];    

	var fields = [{
        field: 'mobile',
        title: '登录名(手机号)',
        required: true,
    },{
        field: 'legalPersonName',
        title: '法人姓名',
        required: true,
    },{
        field: 'level',
        title: '商家类型',
        key: "store_level",
        keyCode: '808907',
        formatter:Dict.getNameForList("store_level", "808907"),

    }, {
        field: 'category',
        title: '大类',
		type: 'select',
        readonly: view,
		data: typeData,
		keyName: 'code',
		valueName: 'name',
    }, {
        field: 'type',
        title: '小类',
		type: 'select',
        readonly: view,
		data: typeData,
		keyName: 'code',
		valueName: 'name',
    }, {
        title: '折扣',
        field: 'rate1',
        required: true,
    }, {
        field: 'name',
        title: '供应商名称',
		readonly: view
    }, {
        title: '地址',
        field: "province1",
        type:'select',
        key:"product_location",
        keyCode:'808907',
        required: true,
        type: 'citySelect',
    }, {
        title: '详细地址',
        field: 'address',
        required: true,
        maxlength: 255,
    }, {
        title: '经度',
        field: 'longitude',
        west: true,
        hidden: true
    }, {
        title: "纬度",
        field: 'latitude',
        north: true,
        hidden: true
    },{
        field: 'bookMobile',
        title: '预定联系电话',
        required: true,
    },{
        field: 'smsMobile',
        title: '短信手机号',
        required: true,
    },{
        field: 'userReferee',
        title: '推荐人',
        readonly: view,
        formatter: function(v, data) {
            if(data.referrer){
                if(data.referrer){
                    var res1 = data.referrer.kind ;
                    var res2 = data.referrer.mobile;
                    var level = data.referrer.level ;
                    if(res1 && res2){
                        if (res1 == 'f1') {
                            return Dict.getNameForList1("user_level","807706",level)+ '/' +res2
                        }else{
                            return userRefereeType[res1]+ '/' +res2
                        }
                    }else{
                       return "-" 
                    }                
                }
            }        
        }        
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
		readonly: view
    }, {
        field: 'advPic',
        title: '广告图',
        type : 'img',
		required: true,
		readonly: view
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
		required: true,
		readonly: view
    }, {
        field: 'description',
        title: '图文描述',
        type: 'textarea',
        required: true,
		readonly: view
    }, {
        field: 'remark',
        title: '备注',
        readonly: view
    }
    // {
    //     field: 'uiOrder',
    //     title: '次序',
    //     required: true,
    //     number: true,
    //     sortable: true,
    // },{
    //     field: 'uiLocation',
    //     title: '位置',
    //     type: 'select',
    //     key: 'store_location',
    //     keyCode: '808907',
    //     formatter: Dict.getNameForList("store_location", "808907"),
    // }
    ];
	
    fields = fields.concat(examineList)

	buildDetail({
		fields: fields,
		code: code,
		view: view,
        buttons: buttons,
		detailCode: '808216',
	});
	
});