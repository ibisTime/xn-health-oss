$(function() {
	
	var code = getQueryString('code');
	
	var fields = [
	// {
	// 	field: 'kind',
	// 	type: 'hidden',
	// 	value: '1'
	// }
	// , {
 //        field: 'uiOrder',
 //        title: '序号',
 //        required: true,
 //    }, {
 //        field: 'uiLocation',
 //        title: '位置',
 //        type: 'select',
 //        listCode: '808907',
 //        keyName: 'dkey',
 //        valueName: 'dvalue',
 //        params:{
 //        	parentKey: "store_location"
 //        },
 //        formatter: function(v,data){
 //        	return data.uiLocation
 //        },
 //        required: true,
 //    }
     {
        field: 'rate1',
        title: '折扣',
        required: true,
    }
    // , {
    //     field: 'isDefault',
    //     title: '是否默认',
    //     type:'select',
    //     data:{
    //             "1": "是",
    //             "0": "否",
    //     },
    //     required: true,
    // }
    ];
	
	buildDetail({
		fields: fields,
		code:code,
		detailCode: '808216',
		addCode: '808010',
		editCode: '808012',
	});
	
	$("#subBtn").off("click").click(function() {
		if($('#jsForm').valid()){
			confirm("确认上架？").then(function() {
				var data = $('#jsForm').serializeObject();
				data.code = code;
				// data.uiLocation = '1';
				data.rate2 = "0";
				data.rate3 = "0";
				data.isDefault = "0";
				data.uiOrder = "0";
				data.uiLocation = "0";
	        	reqApi({
	                code: '808204',
	                json:  data
	            }).then(function() {
	               sucDetail();
	            });
	            
			},function(){
				
			});
		}
    });
});