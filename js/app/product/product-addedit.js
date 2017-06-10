$(function() {
	
	var code = getQueryString('code');
	var dc = getQueryString('dc')
	var view = getQueryString('v');
	
	var dcompanyCode="";
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	}, 
	// {
 //        field: 'companyCode',
	// 	title: '商户',
	// 	type: 'select',
 //        search: true,
	// 	pageCode: '808215',
	// 	params: {
	// 		level: '2',	
 //    		updater: '',
	// 	},
	// 	keyName: 'owner',
	// 	valueName: '{{name.DATA}}-{{mobile.DATA}}',
	// 	searchName: 'mobile',
	// 	formatter: function(v,data){
	// 		return data.companyCode;
	// 	}
 //    }, 
    {
        field: 'parentCode',
        title: '大类',
		type: 'select',
		listCode: '808007',
        required: true,
		params: {
			type:"1",
			status: '2',
            parentCode: 0
		},
		keyName: 'code',
		valueName: 'name',
		// hidden: view,
		onChange:function(v,data){
			reqApi({
                code: '808007',
                json: {
					// status: '2',
                	parentCode: v
                },
                sync: true
            }).done(function(d) {
            	var data1 = {};
            	if(d.length && v){
            		
            		d.forEach(function(v,i){
            			data1[v.code] = v.name;
            		})
            	}
            	
            	$("#type").renderDropdown2(data1);
            });
		},
		afterset: function(v){
			console.log("ss");
		}
    }, {
        field: 'type',
        title: '小类',
		type: 'select',
		listCode: '808007',
		required: true,
		params: {
			type:1,
			status: '0',
            parentCode: $("#category").val()
		},
		keyName: 'code',
		valueName: 'name',
		required: true,
//		formatter: function(v,data){
//			return data.type;
//		}
    }, {
        field: 'name',
        title: '商品名称',
        required: true,
        maxlength: 20
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
    },{
//      field: 'price1',
//      title: '人民币价',
//      amount: true,
//      formatter: moneyFormat,
//  }, {
//      field: 'price2',
//      title: '购物币价',
//      amount: true,
//      formatter: moneyFormat,
//  }, {
//      field: 'price3',
//      title: '钱包币价',
//      amount: true,
//      formatter: moneyFormat,
//  }, {
        field: 'remark',
        title: '备注',
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '808026',
		addCode: '808010',
		editCode: '808012',
		afterData: function(d){
//			$("#type").val(d.type);
		}
//		beforeSubmit:function(data){
////			if(!$('#type').val()){
////				data.type = '';
////			}else{
////				data.category = $('#type').val();
////				data.type = '';
////			}
//			
//			return data;
//		}
	});
	
});