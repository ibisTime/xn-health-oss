$(function () {
    var code = getQueryString('code');
    var typeData = {}
    reqApi({
        code:'808007'
    }).done(function(d) {
                    
        d.forEach(function(v,i){
            typeData[v.code] = v.name;
        })
    });

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }
    , {
        field: 'name',
        title: '商户',
        formatter: function(v, data) {  
            return data.store.name;
        }
    },{
        field: 'price',
        title: '折扣前金额',
        formatter: moneyFormat
    },{
        field: 'payAmount1',
        title: '实付金额',
        formatter: moneyFormat
    },{
        field: 'backAmount',
        title: '分润金额',
        formatter: moneyFormat
    },{
        field: 'rate1',
        title: '折扣',
        formatter: function(v, data) {  
            return data.store.rate1;
        }
    }, {
        field: 'payType',
        title: '支付类型',
        key: "pay_type",
        keyCode:"808907",
        formatter: Dict.getNameForList("pay_type","808907"),
    }, {
        field: 'payDatetime',
        title: '支付时间',
        key: "store_status",
        keyCode:"808907",
        formatter: dateTimeFormat,
    }, {
        field: 'nickname',
        title: '支付用户',
        formatter: function(v, data) {  
            return data.user.nickname;
        }
    }, {
        field: 'mobile',
        title: '支付手机号',
        formatter: function(v, data) {  
            return data.user.mobile;
        }
    }
    , {
        field: 'status',
        title: '状态',
        type: "select",
        key: "store_purchase_status",
        keyCode:"808907",
        formatter: Dict.getNameForList("store_purchase_status","808907"),
        search: true
    } , {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        code: code,
        pageCode: '808245',
		searchParams:{
            storeCode:sessionStorage.getItem('storeCode'),
            status:"1",
			companyCode: OSS.companyCode
		},
    });
    
    
});