$(function() {
    var userId = getUserId();
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field : 'mobile',
        title : '登录名',
        // search: true
    }, {
        field: 'name',
        title: '店铺名称',
        search: true
    },{
        field: 'category',
        title: '大类',
        type: 'select',
        listCode: '808007',
        params: {
            type:"2",
            // status: '2',
            parentCode: 0
        },
        keyName: 'code',
        valueName: 'name',
        required: true,
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
    }
    // , {
    //     field: 'legalPersonName',
    //     title: '法人姓名',
    // }
    , {
        field: 'bookMobile',
        title: '联系电话',
    }, {
        field: 'smsMobile',
        title: '短信手机号',
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: "store_status",
        keyCode: '808907',
        formatter: Dict.getNameForList("store_status", "808907"),
        search: true,
    },{
        field: 'userReferee',
        title: '申请运营商',
        type: 'select',
        required: true,
        listCode: '805060',
         params: {
            start:"1",
            limit:"10",
        },
        keyName: 'userId',
        valueName: 'loginName',

    }, {
        field: 'updateDatetime',
        title: '入驻时间',
        formatter: dateTimeFormat,
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        pageCode: '808215',
        searchParams: {
            companyCode: OSS.companyCode,
            level: "1",
            // userId:sessionStorage.getItem("userId")
        }
    });

    //审核
    $('#examineBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0) {
            toastr.info("当前店铺状态不能审核!");
            return;
        }

        window.location.href = "store_examine.html?Code=" + selRecords[0].code;
    });

    //上架
    $('#up2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status == 2 || selRecords[0].statu == 3) {
            toastr.info("已上架!");
            return;
        }

        if (selRecords[0].status != 1 && selRecords[0].status != 4) {
            toastr.info("当前店铺状态不能上架!");
            return;
        }

        window.location.href = "store_up2.html?Code=" + selRecords[0].code;
    });

    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 2 && selRecords[0].status != 3) {
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
        }, function() {});

    });

    $('#detailBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "store_detail2.html?Code=" + selRecords[0].code;
    });
    $("#editBtn").remove();
});