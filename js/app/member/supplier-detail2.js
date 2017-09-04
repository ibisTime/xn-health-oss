$(function() {
    var view = true;
    var code = getQueryString('code');
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };    
    var typeData = {}
    reqApi({
        code:'808007'
    }).done(function(d) {
                    
        d.forEach(function(v,i){
            typeData[v.code] = v.name;
        })
    });
    
    var fields = [
    // {
    //     field: 'kind',
    //     type: 'hidden',
    //     value: '1'
    // },
    {
        field : 'mobile',
        title : '登录名',
        // search: true
    }, {
        field: 'legalPersonName',
        title: '法人姓名',
    }, {
        field: 'name',
        title: '店铺名称',
        search: true
    },{
        field: 'level',
        title: '商家类型', 
        type: 'select',
        key: "store_level",
        keyCode: '808907',
        formatter: Dict.getNameForList("store_level")

    }, {
        field: 'category',
        title: '大类',
        type:'select',
        data: typeData,
        keyName: 'code',
        valueName: 'name',
    }, {
        field: 'type',
        title: '小类',
        type:'select',
        data: typeData,
        keyName: 'code',
        valueName: 'name',
    },{
        title: '折扣',
        field: 'rate1',
        required: true,
    }
    // , {
    //     field: 'name',
    //     title: '供应商名称',
    //     readonly: view
    // }
    , {
        title: '地址',
        field: "province1",
        type:'select',
        key:"product_location",
        keyCode:'808907',
        required: true,
        type: 'citySelect',
    }, {
        title: '详细地址',
        field: 'address',
        required: true,
        maxlength: 255,
    }, {
        title: '经度',
        field: 'longitude',
        west: true,
        hidden: true
    }, {
        title: "纬度",
        field: 'latitude',
        north: true,
        hidden: true
    }, {
        field: 'bookMobile',
        title: '联系电话',
    }, {
        field: 'smsMobile',
        title: '短信手机号',
    },{
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
        formatter: function(v, data) {
            if(data.referrer){
                var res1 = data.referrer.kind ;
                var res2 = data.referrer.mobile;
                var level = data.referrer.level ;
                if(res1 && res2){
                    if (res1 == 'f1') {
                        return Dict.getNameForList1("user_level","807706",level)+ '/' +res2
                    }else{
                        return userRefereeType[res1]+ '/' +res2
                    }
                }else{
                   return "-" 
                }                
            }        
        }
    }, {
        field: 'slogan',
        title: '广告语',
    },{
        title: '营业执照',
        field: 'pdf',
        type: 'img',
        readonly: view
    }, {
        field: 'advPic',
        title: '广告图',
        type : 'img',
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
        required: true,
        readonly: view,
    }, {
        field: 'description',
        title: '图文描述',
    }, {
        field: 'remark',
        title: '备注',
        readonly: view,
    }];
    
    buildDetail({
        fields: fields,
        view: view,
        code:{
            code:code,
            userId:getUserId()
        },
        detailCode: '808216',
    });
    $("#subBtn").hide();
    // $("#backBtn").hide();
});