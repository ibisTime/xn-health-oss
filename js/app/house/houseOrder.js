$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "下单人",
        field: "applyUser",
        // search: true
    }, {
        title: "入住人",
        field: "reName",
    }, {
        field: 'reMobile',
        title: '入住人联系方式',
    }, {
        title: "状态",
        field: "status",
        type: 'select',
        keyCode: '808907',
        key: "sorder_status",
        formatter: Dict.getNameForList('sorder_status', "808907"),
        search: true
    }, {
        title: "支付方式",
        field: "payType",
        type: 'select',
        keyCode: '808907',
        key: "pay_type",
        formatter: Dict.getNameForList('pay_type', "808907"),
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

});