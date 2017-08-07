$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var storeCode,name;
    reqApi({
        code: '808219',
        json: { userId: getUserId() },
        sync: true
    }).done(function(data) {
        storeCode = data[0].store.code;
    });

    reqApi({
        code: '808415',
        json: {
            userId: getUserId(),
            storeCode: storeCode,
            start:0,
            limit:1,

        },
        sync: true
    }).then(function(data) {
        name = data.list[0].name;
        advPic = data.list[0].advPic;
        slogan = data.list[0].slogan;
        pic = data.list[0].pic;
        description = data.list[0].description;
        price = data.list[0].price;
        totalNum = data.list[0].totalNum;

    });

    var fields = [{
        title: '大类',
        field: 'type',
        type: "hidden",
        value: "FL2017061016211611994528",
        // readonly: true,

    }, {
        field: 'name',
        title: '房间名称',
        required: true,
        readonly: view,
        formatter: function () {
            return name;
        },
    }, {
        title: '广告图',
        field: 'advPic',
        type: 'img',
        required: true,
        readonly: view,
        formatter: function () {
            return advPic;
        }
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
        formatter: function () {
            return slogan;
        }
    }, {
        title: '展示图',
        field: 'pic',
        type: 'img',
        required: true,
        formatter: function () {
            return pic;
        }
    }, {
        field: 'description',
        title: '图文描述',
        type: "textarea",
        required: true,
        afterSet: function () {
            $("#description").html(description) ;
        }
    }, {
        field: 'totalNum',
        title: '当天总数',
        required: true,
        formatter: function () {
            return totalNum;
        }
    }, {
        title: "预定时间起",
        field: "startDate",
        type: "datetime",
        formatter: dateFormat,
        readonly: view
    }, {
        field: 'endDate',
        title: '预定时间止',
        type: "datetime",
        formatter: dateFormat,
        readonly: view
    }, {
        field: 'reName',
        title: '入住人',
        required: true,
        readonly: view
    }, {
        field: 'reMobile',
        title: '入住人联系方式',
        required: true,
        readonly: view
    }, {
        field: 'applyUser',
        title: '下单人',
        required: true,
        readonly: view
    }, {
        field: 'amount1',
        title: '人民币总额',
        formatter: moneyFormat,
    }, {
        title: '已支人民币总额',
        field: 'payAmount1',
        formatter: moneyFormat,
    }, {
        title: "支付方式",
        field: "payType",
        type: 'select',
        keyCode: '808907',
        key: "pay_type",
        formatter: Dict.getNameForList('pay_type', "808907"),
        search: true
    }, {
        title: "状态",
        field: "status",
        type: 'select',
        keyCode: '808907',
        key: "sorder_status",
        formatter: Dict.getNameForList('sorder_status', "808907"),
        search: true
    }, {
        field: 'applyNote',
        title: '申请备注',
        required: true,
        readonly: view
    }];

    var options = {
        fields: fields,
        view: view,
        code: code,
        detailCode: "808466",
        pageCode: '808415',
    };

    buildDetail(options);

});