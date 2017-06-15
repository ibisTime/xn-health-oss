$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var accountNumber = getQueryString('accountNumber');
    var bankName,bankcardNumber;


    var fields = [{
        field: 'applyUser',
        type: 'hidden',
        value: getUserId()
    }, {
        field: 'accountNumber',
        title: '用户账户',
        required: true,
        type: 'hidden',
        value: accountNumber
    }, {
        field: 'amount',
        title: '取现金额',
        required: true,
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '银行卡号',
        type: "select",
        // listCode: "802116",
        // keyName: 'bankCode',
        // valueName: 'bankName',
        listCode: "802016",
        keyName: 'bankCode',
        valueName: 'bankcardNumber',
        required: true,
        maxlength: 255,
        params: {
            userId: getUserId()
        }

    }];

    var options = {
        fields: fields,
        // code: code,
        addCode: '802751',
        // detailCode: '802756',
        view: view,
        beforeSubmit: function(data) {
            data.payCardNo = $("#payCardInfo").find("option:selected").text();
            return data;
        }
    };

    buildDetail(options);

});