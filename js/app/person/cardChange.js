$(function() {

    var code;
    reqApi({
        code: '802016',
        json: { userId: getUserId() },
        sync: true
    }).then(function(data) {
        code = data.length && data[0].code || "";
    });

    var fields = [{
        title: '银行卡号',
        field: 'bankcardNumber',
        bankCard: true,
        required: true
    }, {
        title: '银行名称',
        field: 'bankCode',
        type: 'select',
        listCode: "802116",
        keyName: "bankCode",
        valueName: 'bankName',
        required: true
    }, {
        title: '支行名称',
        field: "subbranch",
        maxlength: 255,
    }, {
        title: "绑定手机号",
        field: 'bindMobile',
        mobile: true
    }, {
        title: '用户姓名',
        field: 'realName',
        maxlength: 255,
        required: true,

    }, {
        title: '币种',
        field: "currency",
        type: "hidden",
        value: 'CNY'
    }, {
        title: '',
        field: 'type',
        type: "hidden",
        value: 'CNY'
    }, {
        title: '',
        field: 'userId',
        type: "hidden",
        value: getUserId()
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: "802017"
    };

    options.buttons = [{
        title: '保存',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.bankName = $("#bankCode").find("option:selected").text();
                reqApi({
                    code: code ? "802012" : "802010",
                    json: data
                }).done(function() {
                    toastr.success('操作成功');
                });
            }
        }
    }];

    buildDetail(options);




});