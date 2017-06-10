$(function() {
	var code = getQueryString('code');
	var pCode = getQueryString('pCode');
	var cityData = {};
	var provinceData = {};
	
	$.getJSON(__uri('../../lib/city.min.js'),function(json){
		
		json.citylist.forEach(function(v, i){
			provinceData[v.p]= v.p;
		})
		var fields = [{
	        field: 'name',
	        title: '规格名称',
			required: true,
	    }, {
	        field: 'originalPrice',
	        title: '原价',
	        amount: true,
	        formatter: moneyFormat,
			required: true,
	    }, {
	        field: 'price1',
	        title: '人民币价',
	        amount: true,
	        formatter: moneyFormat,
			required: true,
	    }
	    , {
	        field: 'price2',
	        type: 'hidden',
	        value: '0',
	    }, {
	        field: 'price3',
	        type: 'hidden',
	        value: '0',
	    }
	    , {
			field: 'quantity',
			title: '库存',
			required: true,
			number: true
		}
		// , {
		// 	field: 'province',
		// 	title: '发货地',
		// 	type:'select',
		// 	data:provinceData,
		// 	valueName:'dvalue',
		// 	required: true,
		// }, {
		// 	field: 'weight',
		// 	title: '重量（kg）',
		// 	required: true,
		// 	number: true
		// }
		, {
			field: 'orderNo',
			title: '序号',
			required: true,
			number: true
		}];
		
		buildDetail({
			fields: fields,
			code: code,
			addCode:'808030',
			detailCode: '808036',
			editCode: '808032',
			beforeSubmit: function(data){
				if(code)
					data.code=code;
				else
					data.productCode=pCode;
				
				return data;
			}
		});
	});
	
});