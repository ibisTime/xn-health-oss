$(function() {
    var view = true;
    var code = getQueryString('code');

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
    },{
        field : 'mobile',
        title : '登录名',
        // search: true
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

    }
    // , {
    //     field: 'category',
    //     title: '大类',
    //     type:'select',
    //     data: typeData,
    //     keyName: 'code',
    //     valueName: 'name',
    // }, {
    //     field: 'type',
    //     title: '小类',
    //     type:'select',
    //     data: typeData,
    //     keyName: 'code',
    //     valueName: 'name',
    // }
    , {
        field: 'slogan',
        title: '广告语',
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