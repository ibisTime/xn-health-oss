$(function () {
    var code = getQueryString('code');
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"名宿主",
        "f1":"VIP会员",
    };    

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '商户名',
    }
    //  , {
    //     field: 'level',
    //     title: '店铺类型',
    //     type: 'select',
    //     key: "store_level",
    //     keyCode: '808907',
    //     formatter:Dict.getNameForList("store_level", "808907"),
    // }
    , {
        field: 'category',
        title: '大类',
        type: 'select',
        listCode: '808007',
        keyName: 'code',
        valueName: 'name',
        params: {
            type: '2',
            parentCode: "0"
        },  
        search: true
    }, {
        field: 'type',
        title: '小类',
        type: 'select',
        listCode: '808007',
        keyName: 'code',
        valueName: 'name',
        params: {
            type: '2',
        },
        search: true
    },{
        title: '折扣',
        field: 'rate1',
        required: true,
    },{
        title: '分润',
        field: 'rate2',
        required: true,
    },{
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
        formatter: function(v, data) {
            if(data.referrer){
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
        }
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "store_status",
        keyCode:"808907",
        formatter: Dict.getNameForList("store_status","808907"),
        search: true
    } ,{
        field: 'uiOrder',
        title: '序号',
        sortable: true,
    },{
        field: 'uiLocation',
        title: '位置',
        type: 'select',
        key: 'store_location',
        keyCode: '808907',
        formatter: Dict.getNameForList("store_location", "808907"),
    }];

    buildList({
        columns: columns,
        code: code,
        pageCode: '808215',
        deleteCode:'808011',
		searchParams:{
            storeCode:code,
			companyCode: OSS.companyCode,
            // userReferee: sessionStorage.getItem('userId'),
            level: "1"
		},
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
        
        if (selRecords[0].status == 3||selRecords[0].status == 2) {
            toastr.info("已上架");
            return;
        }
        
        window.location.href = "productor_up2.html?Code=" + selRecords[0].code;

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
        
        if ( selRecords[0].status != 3&&selRecords[0].status != 2 ) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '808205',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
    $('#editBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "productor_addedit.html?Code=" + selRecords[0].code+"&v=1";
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
        
        window.location.href = "productor_detail2.html?Code=" + selRecords[0].code+"&v=1";
    });
 
     //审核
    $('#examineBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        // if (selRecords[0].status != 0) {
        //     toastr.info("当前店铺状态不能审核!");
        //     return;
        // }

        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length == 1 ) {
            window.location.href = "productor_examine.html?Code=" + selRecords[0].code+"&v=1";
        } else {
            toastr.info("该状态不能审核!");
            return;

        }
    });


	//修改
	$('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "productor_addedit.html?Code=" + selRecords[0].code+"&dc="+selRecords[0].companyCode;

    });
    
    //产品参数
    $('#productParamBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "productorParam.html?Code=" + selRecords[0].code+"&pName=" + selRecords[0].name;
    });

    $('#revenueBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "revenue.html?Code=" + selRecords[0].code+"&userId="+selRecords[0].owner;

    });
    
});