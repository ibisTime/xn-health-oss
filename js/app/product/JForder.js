$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: "order_status",
        keyCode: '808907',
        formatter: Dict.getNameForList("order_status", "808907"),
        search: true,
    }, {
        field: 'amount1',
        title: '人民币总额',
        formatter: moneyFormat,
    }, {
        field: 'amount3',
        title: '积分总额',
        formatter: moneyFormat,
    }, {
        field: 'payAmount3',
        title: '已支付积分总额',
        formatter: moneyFormat,
    }, {
        field: 'applyUser',
        title: '下单用户',
        formatter: function(v, data) {
            return data.user.mobile;
        }

    }, {
        field: 'applyDatetime',
        title: '下单时间',
        type: "datetime",
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '808065',
        searchParams: {
            toUser: getUserId(),
            companyCode: OSS.company
        }
    });


    $('#sendOutGoodsBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 2) {
            toastr.info("当前订单状态不能发货!");
            return;
        }

        window.location.href = "order-sendOutGood.html?Code=" + selRecords[0].code;

    });
    $("#spotDeliveryBtn").remove();
    // $('#spotDeliveryBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }

    //     if (selRecords[0].status != 2) {
    //         toastr.info("当前订单状态不能发货!");
    //         return;
    //     }

    //     confirm("确认已现场发货？").then(function() {
    //         reqApi({
    //             code: '808055',
    //             json: { "code": selRecords[0].code }
    //         }).then(function() {
    //             toastr.info("操作成功");
    //             $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
    //         });
    //     }, function() {});

    // });


    $('#cancelOrderBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status == 1 || selRecords[0].status == 2) {
            confirm("确认取消订单？").then(function() {
                reqApi({
                    code: '808056',
                    json: { "codeList": [selRecords[0].code] }
                }).then(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                });
            }, function() {});
        } else {
            toastr.info("当前订单状态,不能取消订单!");
            return;
        }

    });

    $('#confirmOrderBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 3) {
            toastr.info("当前订单状态不能确认收货!");
            return;
        }

        confirm("确认收货？").then(function() {
            reqApi({
                code: '808057',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});

    });


});