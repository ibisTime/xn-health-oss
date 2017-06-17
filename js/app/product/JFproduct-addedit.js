$(function() {
	
	var code = getQueryString('code');
	var dc = getQueryString('dc')
	var view = getQueryString('v');
	var storeCode = sessionStorage.getItem('storeCode')
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '2',
	}, {
        field: 'name',
        title: '商品名称',
        required: true,
        maxlength: 20,
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
        maxlength: 250,
    }, {
        field: 'advPic',
        title: '广告图',
        type : 'img',
        single: true,
		required: true
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
		required: true
    }, {
        title: '商品详述',
        field: 'description',
        required: true,
        maxlength: 255,
    },  {
        field: 'name1',
        title: '规格名称',
        required: true,
        formatter: function(v, data){
        	return data.productSpecsList && data.productSpecsList[0].name;
        }
    }, {
        field: 'originalPrice',
        title: '原价',
        required: true,
        amount: true,
        formatter: moneyFormat,
        afterSet: function(v, data){
            $("#originalPrice").val(data.productSpecsList[0].originalPrice)
        }
    }, {
        field: 'price1',
        title: '人民币价',
        required: true,
        afterSet: function(v, data){
            $("#price1").val(data.productSpecsList[0].price1)
        }
    }, {
        field: 'quantity',
        title: '库存',
        required: true,
        formatter: function(v, data){
            return data.productSpecsList && data.productSpecsList[0].quantity;
        }
    },{
        field: 'remark',
        title: '备注',
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '808026',
		addCode: '808010',
		editCode: '808012',
		// afterData: function(d){
//			$("#type").val(d.type);
		// }
		beforeSubmit:function(data){
			// $('#form-info').bootstrapTable('getSelections')
			data.productSpecsList = [{
				name: $('#name1').val(),
				originalPrice: $('#originalPrice').val(),
				price1: $('#price1').val(),
				quantity: $('#quantity').val()
			}];
			console.log(data.productSpecsList)
			if (storeCode){
				data.storeCode = storeCode;
			}
			return data;
		}
	});
	
});