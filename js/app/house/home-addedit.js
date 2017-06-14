$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'name',
        title: '房间名称',
        required: true,
    }, {
        title: '广告图',
        field: 'advPic',
        type: 'img',
        required: true,
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
    }, {
        title: '展示图',
        field: 'pic',
        type: 'img',
        required: true,
    }, {
        field: 'description',
        title: '图文描述',
        type: "textarea",
        required: true,
    }, {
        field: 'price',
        title: '价格',
        amount: true,
        formatter: moneyFormat,
        required: true,
    }, {
        field: 'totalNum',
        title: '当天总数',
        required: true,
    }];

    var options = {
        fields: fields,
        view: view,
        addCode: "808400",
        editCode: "808402",
        detailCode: '808416',
        code: code,
        beforeSubmit: function(data) {
            data.userId = getUserId();
            return data;
        }
    };

    buildDetail(options);

});