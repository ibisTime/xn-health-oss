$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'name',
        title: '食物名称',
        required: true,
        maxlength: 32
    }, {
        field: 'type',
        title: '类别',
        type: "select",
        key: "calorie_kind",
        formatter: Dict.getNameForList('calorie_kind'),
        required: true
    }, {
        field: 'calorie',
        title: '每100克卡路里的含量',
        required: true,
        number: true
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
        detailCode: '621116',
        addCode: '621110',
        editCode: '621112'
    });

});