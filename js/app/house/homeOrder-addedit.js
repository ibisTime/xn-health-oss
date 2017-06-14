$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        title: '大类',
        field: 'type',
        type: "hidden",
        value: "FL2017061016211611994528",
        // readonly: true,

    }, {
        field: 'name',
        title: '房间名称',
        required: true,
        readonly: view
    }, {
        title: "预定时间起",
        field: "startDate",
        formatter: dateTimeFormat,
        readonly: view
    }, {
        field: 'endDate',
        title: '预定时间止',
        formatter: dateTimeFormat,
        readonly: view
    }, {
        field: 'reName',
        title: '入住人',
        required: true,
        readonly: view
    }, {
        field: 'reMobile',
        title: '入住人联系方式',
        required: true,
        readonly: view
    }, {
        field: 'applyUser',
        title: '下单人',
        required: true,
        readonly: view
    }, {
        field: 'applyNote',
        title: '申请备注',
        required: true,
        readonly: view
    }];

    var options = {
        fields: fields,
        view: view,
        code: code,
        detailCode: "808466",
    };

    buildDetail(options);

});