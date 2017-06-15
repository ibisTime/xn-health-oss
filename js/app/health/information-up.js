$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: '位置',
        field: 'location',
        type: 'select',
        data: {
            "1": '热门',
            "0": "普通"
        },
        required: true,
    }, {
        field: 'orderNo',
        title: "次序",
        number: true,
        required: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '621106'
    };

    options.buttons = [{
            title: '确定',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data["code"] = code;
                    reqApi({
                        code: "621103",
                        json: data
                    }).done(function() {
                        sucDetail();
                    });
                }
            }
        },
        {
            title: '返回',
            handler: function() {
                goBack();
            }
        }
    ];

    buildDetail(options);

});