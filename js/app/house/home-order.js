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
        },        
        // search: true
    }, {
        title: "入住人",
        field: "reName",
    }, {
        field: 'reMobile',
        title: '入住人联系方式',
    }, {
        field: 'amount1',
        title: '人民币总额',
        formatter: moneyFormat,
    }, {
        title: '已支人民币总额',
        field: 'payAmount1',
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
        // singleSelect: false,
        searchParams: {
            companyCode: OSS.companyCode,
            storeUser: getUserId(),
            status: '1'
        }
    });
    $("#detaBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "homeOrder_addedit.html?v=1&code=" + selRecords[0].code;
    })
    $("#intoBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var codeList = [];
        for (var i = selRecords.length; i;) {
            codeList.push(selRecords[--i].code);
        }
        confirm("确定批量办理入住？").then(function() {
            reqApi({
                code: '808453',
                json: { "codeList": codeList, handleUser: sessionStorage.getItem('userName') }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        },function(){});
    })

    $("#outBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var code = selRecords[0].code;
        // for (var i = selRecords.length; i;) {
        //     code.push(selRecords[--i].code);
        // }
        confirm("确定取消入住？").then(function() {
            reqApi({
                code: '808452',
                json: { "code": code, handleUser: sessionStorage.getItem('userName') }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        },function(){});
    })
});