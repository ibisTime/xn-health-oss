$(function () {
    var view = false;
    if(getUserName() == 'jkeg'){
            view = true;
    }    
    var storeCode = sessionStorage.getItem('storeCode');
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '商品名',
        search: true,
    }
  //   , {
  //       field: 'companyCode',
  //       title: '商户',
  //       type: 'select',
  //       search: true,
		// pageCode1: '805054',
		// params: {
		// 	kind: 'f2',
  //   		updater: ''
		// },
		// keyName: 'userId',
		// valueName: 'mobile',
		// searchName: 'mobile',
  //       formatter: function(v ,data){
        	// return data.store.name
    //     }
    // }
    , {
        field: 'category',
        title: '大类',
		type: 'select',
		listCode: '808007',
		params:{
			type: '1',
			parentCode: '0',
		},
		keyName: 'code',
		valueName: 'name',
        search: true,
    }, {
        field: 'type',
        title: '小类',
        type: 'select',
        listCode: '808007',
        keyName: 'code',
        valueName: 'name',
        params: {
            type: '1',
        },
        search: true,
    }, {
        field: 'storeCode',
        title: '所属供应商',
        type: 'select',
        listCode: '808215',
        keyName: 'code',
        valueName: 'name',
        params: {
            start: '1',
            limit:'10000',
            level: '3'
        },     
        search: view,
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "product_status",
        keyCode:"808907",
        formatter: Dict.getNameForList("product_status","808907"),
        search: true
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: 'product_location',
        keyCode:'808907',
        formatter: Dict.getNameForList("product_location",'808907'),
    }, {
        field: 'orderNo',
        title: '序号',
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        searchParams:{
            companyCode: OSS.companyCode,
            storeCode: storeCode?storeCode:"",
            kind: "1"
        },
        pageCode: '808025',
        deleteCode:'808011',
    });
    
    $('#up2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        if (selRecords[0].status == 3) {
            toastr.info("已上架");
            return;
        }
        
        window.location.href = "product_up2.html?Code=" + selRecords[0].code;

    });
    
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        if (selRecords[0].status != 3) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '808014',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
    
    $('#detail2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "product_detail2.html?Code=" + selRecords[0].code+"&v=1";
    });
 

	//修改
	$('#editBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status == 3) {
            toastr.info("已上架状态不能修改");
            return;
        }        
        
        window.location.href = "product_addedit.html?Code=" + selRecords[0].code+"&dc="+selRecords[0].companyCode;

    });
    
    //产品参数
    $('#productParamBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "productParam.html?Code=" + selRecords[0].code+"&pName=" + selRecords[0].name;
    });
    
});