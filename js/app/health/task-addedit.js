$(function() {

    var code = getQueryString('code');
    var view  = getQueryString('v');

    var fields = [{
        field: 'name',
        title: '任务名称',
        maxlength: 32,
        view: view,
        required: true
    }, {
        field: 'logo',
        title: '任务图标',
        type: 'img',
        view: view,
        required: true,
    }, {
        field: 'orderNo',
        title: "次序",
        number: true,
        view: view,
        required: true,
    }, {
        field: 'summary',
        title: '摘要',
        type: 'textarea',
        normalArea: true,
        required: true,
        view: view,
    }, {
        field: 'remark',
        title: '备注',
        view: view,
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '621156',
        addCode: '621150',
        editCode: '621152'
    });

});