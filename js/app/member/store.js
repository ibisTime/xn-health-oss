$(function() {
    var userId = getUserId();
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };        
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
    },{
        title: '分润',
        field: 'rate2',
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
    },{
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
        formatter: function(v, data) {
            if(data.referrer){
                if(data.referrer){
                    var res1 = data.referrer.kind ;
                    var res2 = data.referrer.mobile;
                    var level = data.referrer.level ;
                    if(res1 && res2){
                        if (res1 == 'f1') {
                            return Dict.getNameForList1("user_level","807706",level)+ '/' +res2
                        }else{
                            return userRefereeType[res1]+ '/' +res2
                        }
                    }else{
                       return "-" 
                    }                
                }
            }        
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: "store_status",
        keyCode: '808907',
        formatter: Dict.getNameForList("store_status", "808907"),
        search: true,
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

    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "store_detail2.html?Code=" + selRecords[0].code;
    });
    $("#editBtn").remove();
});