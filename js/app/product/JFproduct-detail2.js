$(function() {
	
	var code = getQueryString('code');
	var view = getQueryString('v');
	
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
        title: '商品详述',
        type: 'textarea',
        required: true,
		readonly: view
    }
    // ,  {
    //     field: 'name1',
    //     title: '规格名称',
    //     required: true,
    //     formatter: function(v, data){
    //         return data.productSpecsList && data.productSpecsList[0].name;
    //     }
    // }
    , {
        field: 'originalPrice',
        title: '原价',
        required: true,
        formatter: function(v, data){
            return data.productSpecsList && moneyFormat(data.productSpecsList[0].originalPrice);
        }
    }, {
        field: 'price1',
        title: '人民币价',
        amount: true,
        required: true,
        formatter: function(v, data){
            return data.productSpecsList && moneyFormat(data.productSpecsList[0].price1);
        }
    }, {
        field: 'quantity',
        title: '库存',
        required: true,
        formatter: function(v, data){
            return data.productSpecsList && data.productSpecsList[0].quantity;
        }
    }, {
        field: 'remark',
        title: '备注',
        readonly: view
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		view: view,
		searchParams:{
            companyCode: OSS.companyCode
        },
		detailCode: '808026',
	});
	
});