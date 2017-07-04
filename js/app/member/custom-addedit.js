$(function() {
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
        readonly: true,
    },{
        title: "昵称",
        field: "nickname",
        readonly: true,
        // search: true
    },{
        title: '手机号',
        field: 'mobile',
        readonly: true,
    }, {
        title: '推荐人',
        field: 'userReferee',
        readonly: true,
    }, {
        title: "用户类型",
        field: "level",
        type: "select",
        key: "user_level",
        listCode: "807706",
        keyName:'dkey',
        valueName:'dvalue',        
        formatter: function(v,data){
           return data.level
        }
        
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
        readonly: true,
    }, {
        title: "注册时间",
        field: "createDatetime",
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        title: '备注',
        field: 'remark',
        readonly: true,
    }];
    
    buildDetail({
        fields: fields,
        code:{
            userId:userId
        },
        detailCode: "805056",
        editCode: '001302',
        beforeSubmit: function(data){
            data.userId = userId;
            
            return data;
        }
    });
});