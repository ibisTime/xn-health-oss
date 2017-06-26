$(function () {
    var code
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '类别名称',
        search: true,
    }, {
        field : 'parentCode',
        title : '所属大类',
        search: true,
        type: 'select',
        listCode: '621507',
        params: {
            type: "2",
            parentCode: 0
        },
        keyName: 'code',
        valueName: 'name',
    }
    , {
        field: 'status',
        title: '状态',
    	key: "category_status",
        formatter: Dict.getNameForList("category_status","621906"),   
    }, {
        field: 'orderNo',
        title: '次序',
        sortable: true,
    }];

    buildList({
        columns: columns,
        pageCode: '621505',
		searchParams:{
			type: "2",
			companyCode: OSS.companyCode
		}
    });
    
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.info("已上架");
            return;
        }
        confirm("确认上架？").then(function() {
            reqApi({
                code: '621503',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        },function(){});

    });
    
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 1) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '621504',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        },function(){});

    });
    
    $('#editBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "xtcategory_addedit.html?Code=" + selRecords[0].code+"&pCode=" + selRecords[0].parentCode;
    });
    
    
});