$(function() {
	
	var code = getQueryString('code');
	var view = getQueryString('v');
	
	var typeData = {};
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };    

	reqApi({
		code:'808007'
	}).done(function(d) {
            		
		d.forEach(function(v,i){
			typeData[v.code] = v.name;
		})
    });
	
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
        title: '分润',
        field: 'rate2',
        required: true,
    }, {
        field: 'name',
        title: '店铺名称',
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
        field: 'userReferee',
        title: '推荐人',
        readonly: view,
        formatter: function(v, data) {
            if(data.referrer){
                var res1 = data.referrer.kind ;
                var res2 = data.referrer.mobile;
                if(res1 && res2){
                    return userRefereeType[res1]+ '/' +res2
                }else{
                   return "-" 
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
        field: 'uiOrder',
        title: '次序',
        required: true,
        number: true,
        sortable: true,
    },{
        field: 'uiLocation',
        title: '位置',
        type: 'select',
        key: 'store_location',
        keyCode: '808907',
        formatter: Dict.getNameForList("store_location", "808907"),
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		view: view,
		detailCode: '808216',
	});
	
});