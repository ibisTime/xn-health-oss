$(function() {
	var code = getQueryString('code');
	var pName = getQueryString('pName');
	
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	}, {
        field: 'name',
        title: '规格名称',
    }, {
        field: 'originalPrice',
        title: '原价',
        amount: true,
        formatter: moneyFormat,
    }, {
    field: 'price1',
    title: '人民币价',
    amount: true,
    formatter: moneyFormat,
    }
    // , {
    //     field: 'price2',
    //     title: '购物币价',
    //     formatter: moneyFormat,
    // }, {
    //     field: 'price3',
    //     title: '钱包币价',
    //     formatter: moneyFormat,
    // }
    , {
		field: 'quantity',
		title: '库存',
	}
	// , {
	// 	field: 'province',
	// 	title: '发货地',
	// }, {
	// 	field: 'weight',
	// 	title: '重量（kg）',
	// }
	, {
		field: 'orderNo',
		title: '序号',
	}];
	
	buildList({
		columns: columns,
		pageCode: '808037',
		deleteCode: '808031',
		searchParams:{
			productCode: code,
			companyCode: OSS.company
		}
	});
	
	$("#pName").html("商品名称：  "+pName);
	$("#up2Btn").hide();
	$("#downBtn").hide();
	$("#detail2Btn").hide();
	$("#productParamBtn").hide();
	
	
	$('.tools .toolbar').empty();
	$('.tools .toolbar').html('<li style="display:block;" id="addBtn"><span><img src="/static/images/t01.png"></span>新增</li><li style="display:block;" id="edit2Btn"><span><img src="/static/images/t01.png"></span>修改</li><li style="display:block;" id="deleteBtn"><span><img src="/static/images/t01.png"></span>删除</li><li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
	
	$('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "productorParam_addedit.html?Code=" + selRecords[0].code;
    });
    
    $('#addBtn').click(function() {
        
        window.location.href = "productParam_addedit.html?pCode=" + code;
    });
    
    $('#deleteBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		
		else if(selRecords.length >= 2){
			toastr.info("请选择一条记录");
			return;
		}

		confirm("确认是否删除该记录？").then(function() {
			
			reqApi({
				code: '808031',
				json: {code:selRecords[0].code}
			}).done(function(data) {
				sucList();
			});
		});

	});
    
    $('#backBtn').on('click', function() {
		window.location.href = "product.html";
	});
});

