$(function() {

    var code  = getQueryString('code');

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        title: '所属大类',
        field: 'parentCode',
        required: true,
        type: 'select',
        listCode: '621507',
        params: {
            type:"2",
            parentCode: 0
        },
        keyName: 'code',
        valueName: 'name',
        defaultOption: '选此创建大类',
    }, {
        field: 'name',
        title: '类别名称',
        required: true,
    }, {
        field: 'orderNo',
        title: '次序',
        required: true,
        number: true,
    }, {
        title: '图片',
        field: 'pic',
        type: 'img',
    }];

    buildDetail({
        fields: fields,
        // code: code,
        code:{
            code: code,
        },
        detailCode: '621506',
        addCode: '621500',
        editCode: '621502',
        beforeSubmit: function(data) {
            data.type = "2";
            return data;
        }
    });

});