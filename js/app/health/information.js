$(function() {

    

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'title',
        title: "标题"
    }, {
        field: 'kind',
        title: '类别',
        type: "select",
        listCode: "621906",
        params: {
                parentKey: "news_kind",
            },
        keyName:'dkey',
        valueName:'dvalue',
        search: true
    }, {
        field: 'category',
        title: '大类',
        type: "select",
        listCode: "621507",
        params:{
            parentCode: '0',
        },
        keyName:'code',
        valueName:'name',
        required: true,
    }, {
        field: 'type',
        title: '小类',
        type: "select",
        listCode: "621507",
        keyName:'code',
        valueName:'name',
        required: true,
    }, {
        title: "状态",
        field: 'status',
        type: "select",
        data: {
            "0": "草稿",
            "1": "发布",
            "2": "下架"
        },
        // key: "",
        // formatter: Dict.getNameForList(''),
        search: true
    }, {
        title: '位置',
        field: 'location',
        type: 'select',
        listCode: "621906",
        keyName:'dkey',
        valueName:'dvalue',
        params:{
            parentKey: "news_location",
        },
        search: true
    }, {
        field: 'orderNo',
        title: "次序"
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        columns: columns,
        pageCode: '621105',
        deleteCode: '621101'
    });
    //发布
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == "1") {
            toastr.info("当前资讯已发布");
            return;
        }
        window.location.href = "information_up.html?Code=" + selRecords[0].code;

    });
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == "1") {
            reqApi({
                code: "621104",
                json: { code: selRecords[0].code }
            }).done(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        } else {
            toastr.info("不是可以下架的状态");
            return;
        }


    });

    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "information_detail.html?Code=" + selRecords[0].code+"&v=1";
    });

    $('#editBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status == "1") {
            toastr.info("上架资讯不能修改");
            return;
        }
        
        window.location.href = "information_addedit.html?Code=" + selRecords[0].code+"&v=1";
    });
});