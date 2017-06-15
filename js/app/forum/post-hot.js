$(function() {
    var code = getQueryString('code');


    var fields = [
        //     {
        //     title: '热门位置',
        //     field: 'location',
        //     type: "select",
        //     data: {
        //         "1": "热门",
        //         "0": "普通"
        //     },
        //     required: true,
        // },
        {
            title: 'UI次序',
            field: 'orderNo',
            required: true,
            number: true
        }
    ];
    var options = {
        fields: fields,
        code: code,
        detailCode: '621061'
    };
    options.buttons = [{
        title: "确定",
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                reqApi({
                    code: '621014',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: "返回",
        handler: function() {
            goBack();
        }
    }]
    buildDetail(options);
});