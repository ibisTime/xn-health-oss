$(function() {
    
    var code = getQueryString('code');
    var view = true;
    
    var typeData = {}
    reqApi({
        code:'808007'
    }).done(function(d) {
                    
        d.forEach(function(v,i){
            typeData[v.code] = v.name;
        })
    });
    
    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }
    // , {
 //        field: 'companyCode',
 //        title: '商户',
        // formatter: function(v ,data){
        //  return data.store.name
        // }
    // }
    , {
        field: 'category',
        title: '大类',
        type:'select',
        data: typeData,
        keyName: 'code',
        valueName: 'name',
        formatter: function(v, data) {   
            return data[0].store.category;
        }
    }, {
        field: 'type',
        title: '小类',
        type:'select',
        data: typeData,
        keyName: 'code',
        valueName: 'name',
        formatter: function(v, data) {
            return data[0].store.type;
        }
    }, {
        field: 'name',
        title: '商品名称',
        formatter: function(v, data) {
            return data[0].store.name;
        }
    }, {
        field: 'slogan',
        title: '广告语',
        formatter: function(v, data) {
            return data[0].store.slogan;
        }
    }, {
        field: 'advPic',
        title: '广告图',
        type : 'img',
        formatter: function(v, data) {
            return data[0].store.advPic
        }
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
        required: true,
        readonly: view,
        formatter: function(v, data) {

            return data[0].store.pic;
        }
    }, {
        field: 'description',
        title: '图文描述',
        formatter: function(v, data) {
            return data[0].store.description;
        }
    }, {
//      field: 'price1',
//      title: '人民币价',
//      amount: true,
//      formatter: moneyFormat,
//      required: true,
//  }, {
//      field: 'price2',
//      title: '购物币价',
//      amount: true,
//      formatter: moneyFormat,
//      required: true,
//  }, {
//      field: 'price3',
//      title: '钱包币价',
//      amount: true,
//      formatter: moneyFormat,
//      required: true,
//  }, {
    //     field: 'uiOrder',
    //     title: '次序',
    //     required: true,
    //     number: true,
    //     sortable: true,
    //     formatter: function(v, data) {
    //         return data[0].store.uiOrder;
    //     }
    // },{
    //     field: 'uiLocation',
    //     title: '位置',
    //     // type: 'select',
    //     key: 'store_location',
    //     keyCode: '808907',
    //     formatter: Dict.getNameForList("store_location", "808907"),
    // },  
    // {
        field: 'remark',
        title: '备注',
        readonly: view,
        formatter: function(v, data) {
            return data[0].store.remark;
        }
    }];
    
    buildDetail({
        fields: fields,
        view: view,
        code:{
            userId:getUserId()
        },
        detailCode: '808219',
    });

    $("#subBtn").hide();
    $("#backBtn").hide();
    
});