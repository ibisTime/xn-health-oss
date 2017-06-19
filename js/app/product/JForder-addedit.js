$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'orderCode',
        title: '订单编号',
        readonly: view,
        formatter: function(v, data) {
            return data.productOrderList[0].orderCode
        }
    }, {
        field: 'status',
        title: '订单状态',
        key: "order_status",
        formatter: Dict.getNameForList("order_status", "808907"),
        readonly: view,
    }, {
        field: 'applyUser',
        title: '下单用户',
        readonly: view,
        formatter: function(v, data) {
            return data.user.mobile
        }
    }, {
        field: 'applyNote',
        title: '下单说明',
        readonly: view,
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        readonly: view,
    }, {
        title: '积分总额',
        field: 'amount1',
        formatter: moneyFormat,
        readonly: view,
    }, {
        title: '已支付积分总额',
        field: 'payAmount1',
        formatter: moneyFormat,
        readonly: view,
    }, {
        field: 'receiver',
        title: '收货人姓名',
        readonly: view,
    }, {
        field: 'reMobile',
        title: '收件人电话',
        readonly: view,
    }, {
        field: 'reAddress',
        title: '收货地址',
        readonly: view,
    }, {
        field: 'productOrderList',
        title: '商品信息',
        type: 'o2m',
        columns: [{
            field: 'name',
            title: '商品名称',
            formatter: function(v, data) {
                return data.product.name
            }
        }
        // , {
        //     field: 'productSpecsName',
        //     title: '规格名称',
        //     formatter: function(v, data) {
        //         // return data.productSpecsName
        //         $("#name").val()
        //     }
        // }
        , {
            field: 'quantity',
            title: '购买数量',
            formatter: function(v, data) {
                return data.quantity
            }
        }, {
        field: 'price1',
        title: '积分价格',
        formatter: function(v, data) {
            return moneyFormat(data.price1);
        }
        }]
    }, {
        field: 'logisticsCode',
        title: '物流编号',
        readonly: view,
    }, {
        field: 'logisticsCompany',
        title: '物流公司',
        key: "kd_company",
        formatter: Dict.getNameForList("kd_company", "808907"),
        readonly: view,
    }, {
        field: 'deliverer',
        title: '发货人',

    }, {
        field: 'deliveryDatetime',
        title: '发货时间',
        type: "datetime",
        formatter: dateTimeFormat,
    }, {
        field: 'pdf',
        title: '物流单',
        type: 'img',
    }, {
        field: 'remark',
        title: '备注',
        readonly: view,
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '808066'
    });

});