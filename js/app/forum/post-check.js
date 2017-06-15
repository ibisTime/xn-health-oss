$(function() {

    var code = getQueryString('code');


    var fields = [{
        title: '标题',
        field: 'title',
        readonly: true
    }, {
        title: '内容',
        field: 'content',
        readonly: true
    }, {
        title: '图片',
        field: 'pic',
        readonly: true,
        type: 'img'
    }, {
        title: '发帖人',
        field: 'nickname',
        readonly: true
    }, {
        title: '发帖时间',
        field: 'publishDatetime',
        readonly: true,
        formatter: dateTimeFormat
    }, {
        title: '状态',
        field: 'status',
        readonly: true,
        type: 'select',
        key: 'post_status'
    }, {
        title: '审核说明',
        field: 'approveNote',
        required: true,
        maxlength: 250
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '621061'
    };

    options.buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['codeList'] = [code];
                data['approver'] = sessionStorage.getItem('userName');
                data["approveResult"] = "1";
                data["type"] = "1";
                data["approveNote"] = $("#approveNote").val();
                reqApi({
                    code: "621012",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['codeList'] = [code];
                data['approver'] = sessionStorage.getItem('userName');
                data["approveResult"] = "0";
                data["type"] = "1";
                data["approveNote"] = $("#approveNote").val();
                reqApi({
                    code: "621012",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail(options);

});