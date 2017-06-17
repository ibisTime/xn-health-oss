$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'name',
        title: '任务名称',
        maxlength: 32,
        required: true
    }, {
        field: 'logo',
        title: '任务图标',
        type: 'img',
        required: true,
    }, {
        field: 'orderNo',
        title: "次序",
        number: true,
        required: true,
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '621156',
        addCode: '621150',
        editCode: '621152'
    });

});