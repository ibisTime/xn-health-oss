$(function () {
    
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '商品名',
        search: true,
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "product_status",
        keyCode:"808907",
        formatter: Dict.getNameForList("product_status","808907"),
        search: true
    }, {
        field: 'orderNo',
        title: '序号',
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: 'product_location',
        keyCode:'808907',
        formatter: Dict.getNameForList("product_location",'808907'),
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        searchParams:{
            companyCode: OSS.companyCode,
            kind: "2"
        },
        pageCode: '808025',
        deleteCode:'808011',
//		searchParams:{
//			companyCode: OSS.company
//		},
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
        
        window.location.href = "JFproduct_up2.html?Code=" + selRecords[0].code;

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
        
        window.location.href = "JFproduct_detail2.html?Code=" + selRecords[0].code+"&v=1";
    });
    
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
        
        window.location.href = "JFproduct_addedit.html?Code=" + selRecords[0].code;
    });    
    
});