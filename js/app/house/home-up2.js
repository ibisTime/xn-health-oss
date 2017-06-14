$(function() {

    var code = getQueryString('code');

    var fields = [
        // {
        // 	field: 'kind',
        // 	type: 'hidden',
        // 	value: 'f2'
        // },
        {
            field: 'orderNo',
            title: '序号',
            required: true,
        }, {
            field: 'location',
            title: '位置',
            type: 'hidden',
            value: "0"
        }, {
            field: 'price',
            title: '价格',
            formatter: moneyFormat,
            required: true,
            amount: true,
            //  type: "hidden",
        }
        // , {
        //     field: 'isDefault',
        //     title: '是否默认',
        //     type:'select',
        //     data:{
        //             "1": "是",
        //             "0": "否",
        //     },
        //     required: true,
        // }
    ];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808416',
        addCode: '808400',
        editCode: '808402',
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            confirm("确认上架？").then(function() {
                var data = $('#jsForm').serializeObject();
                data.code = code;
                // data.uiLocation = '1';
                // data.isDefault = "0";
                reqApi({
                    code: '808403',
                    json: data
                }).then(function() {
                    sucDetail();
                });

            }, function() {

            });
        }
    });
});