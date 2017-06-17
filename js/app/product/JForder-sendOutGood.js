$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'orderCode',
        title: '发货单号',
        type: "hidden",
        value: code,
        required: true,
    }, {
        title: '物流公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
        keyCode: "808907",
        required: true,
    }, {
        title: '物流单号',
        field: 'logisticsCode',
        required: true,
    }, {
        field: 'deliverer',
        title: '发货人',
        required: true,
    }, {
        field: 'deliveryDatetime',
        title: '发货时间',
        type: "datetime",
        formatter: dateTimeFormat,
        required: true,
    }, {
        field: 'pdf',
        title: '物流单',
        type: 'img',
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                var values = [];
                var imgs = $(el).find('.img-ctn');
                imgs.each(function(index, img) {
                    values.push($(img).attr('data-src') || $(img).find('img').attr('src'));
                });

                data[el.id] = values.join('||');
            });
            for (var i = 0, len = fields.length; i < len; i++) {
                var item = fields[i];
                if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                    data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                } else if (item.emptyValue && !data[item.field]) {
                    data[item.field] = item.emptyValue;
                } else if (item.readonly && item.pass) {
                    data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                }
                if (item.type == 'select' && item.passValue) {
                    data[item.field] = $('#' + item.field).find('option:selected').html();
                }

                if (item.type == "checkbox") {
                    data[item.field] = $.isArray(data[item.field]) ? data[item.field].join(",") : data[item.field];
                }
            }


            data.code = code;
            reqApi({
                code: '808054',
                json: data
            }).then(function() {
                sucDetail();
            });
        }
    })

});