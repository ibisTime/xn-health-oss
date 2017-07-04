$(function() {
    var view = true;
    var code = getQueryString('code');
    var userId = getQueryString('userId');

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
        title: "登录名",
        field: "loginName",
        // search: true
    },{
        title: "昵称",
        field: "nickname",
        // search: true
    },{
        title: '手机号',
        field: 'mobile',
        search: true
    }, {
        title: '推荐人',
        field: 'userReferee',
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
        search: true
    }, {
        title: "注册时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: '备注',
        field: 'remark'
    }];
    
    buildDetail({
        fields: fields,
        view: view,
        code:{
            code:code,
            userId:userId
        },
        detailCode: "805056",
    });
    $("#subBtn").hide();
});