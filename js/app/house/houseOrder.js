$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "下单人",
        field: "loginName",
        formatter:function(v,data){
            return data.user.loginName
        }
        // search: true
    }, {
        title: "入住人",
        field: "reName",
    }, {
        field: 'reMobile',
        title: '入住人联系方式',
    }, {
        field: 'amount1',
        title: '健康币总额',
        formatter: moneyFormat,
    }, {
        field: 'payAmount1',
        title: '已支付健康币总额',
        formatter: moneyFormat,
    }, {
        title: "支付方式",
        field: "payType",
        type: 'select',
        keyCode: '808907',
        key: "pay_type",
        formatter: Dict.getNameForList('pay_type', "808907"),
        search: true
    }, {
        title: "状态",
        field: "status",
        type: 'select',
        keyCode: '808907',
        key: "sorder_status",
        formatter: Dict.getNameForList('sorder_status', "808907"),
        search: true
    }, {
        field: 'handleUser',
        title: '处理人'
    }];
    buildList({
        columns: columns,
        pageCode: '808465',
        single: false,
        searchParams: {
            companyCode: OSS.companyCode,
            storeUser: getUserId(),

        }
    });

    $('#detailBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        }

        window.location.href = "homeOrder_addedit.html?Code=" + selRecords[0].code + "&v=1";
    });

});