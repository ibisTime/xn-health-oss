$(function() {

    var code = getQueryString('code');
    //	var pCode = getQueryString('pCode')

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        title: '大类',
        field: 'parentCode',
        required: true,
        type: 'hidden',
        value: "0"
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
        type: 'img'
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808006',
        addCode: '808000',
        editCode: '808002',
        beforeSubmit: function(data) {
            data.type = "2";

            return data;
        }
    });

});