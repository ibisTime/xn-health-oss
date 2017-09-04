$(function() {
    var view = true;
    var code = getQueryString('code');
    var userId = getQueryString('userId');
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
        title: "登录名",
        field: "loginName",
        // search: true
    },{
        title: "昵称",
        field: "nickname",
        // search: true
    }, {
        title: '地址',
        field: "province",
        type:'select',
        key:"product_location",
        keyCode:'808907',
        required: true,
        type: 'citySelect',
        formatter: function(v, data) {
            var address = data.userExt.address;
            !address?address = "": address            
            if (data.userExt && data.userExt.city !== data.userExt.area ) {
                var res = data.userExt.province + data.userExt.city + data.userExt.area + address;;
                return res;
            }else if(data.userExt && data.userExt.city == data.userExt.area){
                var res = data.userExt.province + data.userExt.city + address;;
            }
        }        
    },{
        title: '手机号',
        field: 'mobile',
        search: true
    } ,{
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
        formatter: function(v, data) {
            if(data.referrer){
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
        }
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