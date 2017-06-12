$(function() {
	
	var code = getQueryString('code');
	var view = true;
	
	var typeData = {}
	reqApi({
		code:'808007'
	}).done(function(d) {
            		
		d.forEach(function(v,i){
			typeData[v.code] = v.name;
		})
    });
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	}
	// , {
 //        field: 'companyCode',
 //        title: '商户',
        // formatter: function(v ,data){
        // 	return data.store.name
        // }
    // }
    , {
        field: 'category',
        title: '大类',
		type: 'select',
		
        readonly: view,
		data: typeData,
		keyName: 'code',
		valueName: 'name',
        required: true,
    }, {
        field: 'type',
        title: '小类',
		type: 'select',
        readonly: view,
		data: typeData,
		keyName: 'code',
		valueName: 'name',
    }, {
        field: 'name',
        title: '商品名称',
        required: true,
		readonly: view
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
//      field: 'price1',
//      title: '人民币价',
//      amount: true,
//      formatter: moneyFormat,
//      required: true,
//  }, {
//      field: 'price2',
//      title: '购物币价',
//      amount: true,
//      formatter: moneyFormat,
//      required: true,
//  }, {
//      field: 'price3',
//      title: '钱包币价',
//      amount: true,
//      formatter: moneyFormat,
//      required: true,
//  }, {
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
    },	
	{
        field: 'remark',
        title: '备注',
        readonly: view
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		view: view,
		detailCode: '808216',
	});
	
});