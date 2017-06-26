$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: '位置',
        field: 'location',
        type: 'select',
        listCode: "621906",
        keyName:'dkey',
        valueName:'dvalue',
        params:{
            parentKey: "news_location",
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