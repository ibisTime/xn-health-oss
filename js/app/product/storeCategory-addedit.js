$(function() {

    var code = getQueryString('code');
    //	var pCode = getQueryString('pCode')
    var view = getQueryString('v');
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
            // listCode: '808007',
            // params: {
            // 	type: "2",
            // 	parentCode: 0
            // },
            // keyName: 'code',
            // valueName: 'name',
            // defaultOption: '选此创建种类',
    }, {
        field: 'name',
        title: '类别名称',
        required: true,
        readonly: view
    }, {
        title: '图片',
        field: 'pic',
        type: 'img',
        required: true,
        readonly: view
    }, {
        field: 'orderNo',
        title: '次序',
        required: true,
        number: true,
        readonly: view
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '808006',
        addCode: '808000',
        editCode: '808002',
        beforeSubmit: function(data) {
            data.type = "2";

            return data;
        }
    });

});