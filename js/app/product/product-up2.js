$(function() {
	
	var code = getQueryString('code');
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	}, {
        field: 'orderNo',
        title: '序号',
        required: true,
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: 'product_location',
        // keyCode: "802006",
        formatter: Dict.getNameForList("product_location"),
        search: true
    }
    // , {
    //     field: 'location',
    //     title: '位置',
    //     required: true,
    //     type: "select",
    //     key: "product_location",
    //     keyCode:"808907",
    //     formatter: Dict.getNameForList("product_location"),
    // }
    ];
	
	buildDetail({
		fields: fields,
		code:code,
		searchParams:{
            companyCode: OSS.companyCode
        },
		detailCode: '808026',
		addCode: '808010',
		editCode: '808012',
	});
	
	$("#subBtn").off("click").click(function() {
		if($('#jsForm').valid()){
			confirm("确认上架？").then(function() {
				var data = $('#jsForm').serializeObject();
				data.code = code;
				data.originalPrice = '0';
	        	reqApi({
	                code: '808013',
	                json:  data
	            }).then(function() {
	               sucDetail();
	            });
	            
			},function(){
				
			});
		}
    });
});