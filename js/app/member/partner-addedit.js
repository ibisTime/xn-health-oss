$(function() {
    
    var userId = getQueryString('userId');
    var loginName = getQueryString('loginName');
    var view = getQueryString('v');
    var level;
    // var province;
    // var city;
    // var area;
    var realName;
    var userReferee;     
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };    
    var fields = [
    // {
    //     field: 'kind',
    //     type: 'hidden',
    //     value: '1'
    // },
    {
        title : '登录名',
        field : 'loginName',
        required: true,
        maxlength: 20,
        readonly: view
    },{
        title : '手机号',
        field : 'mobile',
        mobile:true,
        required: true,
        readonly: view
    }, {
        title: '真实姓名',
        field: 'realName',
        chinese: true,
        required: true,
        readonly: view,
        formatter:function(v, data){
            realName = data.realName
            return 
        }
    }, {
        field: 'province',
        title: '户籍地址',
        type: 'citySelect',
        getData: function (data) {
            return data.userExt || {};
        }
        // ,
        // formatter: function(v,data) {
        //     province = data.userExt.province
        //     city = data.userExt.city;
        //     area = data.userExt.area            
        //     if (data.userExt.city == data.userExt.area) {
        //         var res = data.userExt.province + data.userExt.city
        //     }else{
        //         var res = data.userExt.province + data.userExt.city + data.userExt.area;
        //     }
        //     return res;
        // }
    }, {
        field: 'gxProvince',
        title: '管辖地址',
        type: 'citySelect1',
        getData: function (data) {
            return data || {};
        },
        // formatter: function(v,data) {
        //     gxProvince = data.gxProvince
        //     gxCity = data.gxCity;
        //     gxArea = data.gxArea            
        //     if (data.gxCity == data.gxArea) {
        //         var res = data.gxProvince + data.gxCity
        //     }else{
        //         var res = data.gxProvince + data.gxCity + data.gxArea;
        //     }
        //     return res;
        // }        
    },{
        field: 'userReferee',
        title: '推荐人',
        readonly: view,
        formatter: function(v, data) {
            if(data.referrer){
                userReferee = data.referrer.userId;
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
    },  {
        title: '证件类型',
        field: 'idKind',
        type: 'select',
        key: 'id_kind',
        keyCode: "807706",
        view: view
    },{
        title: '证件号',
        field: 'idNo',
        idCard: true,
        view: view
    }
    // ,{
    //     title : '分成比例',
    //     field : 'divRate',
    //     number:true,
    //     max: 1,
    //     min: 0,
    //     required: true,
    //     view: view
    // }
    , {
        title: '备注',
        field: 'remark',
        maxlength: 250,
        view: view
    }];
    
    buildDetail({
        fields: fields,
        code:{
            userId: userId
        },
        detailCode: '805056',
        addCode: '805042',
        editCode: '805181',
        beforeSubmit: function(data){
            if(userId){
                data.userId = userId;
            }
            data.kind = 'operator';
            data.loginName = $('#loginName').text();
            if(!data.gxCity && !data.gxArea){
                data.gxCity = data.gxProvince;
                data.gxArea = "-";

            }else if(data.gxCity && !data.gxArea){
                data.gxArea = "-";
            }
            
            data.realName = realName;
            data.userReferee = userReferee
            return data;
        }
    });
    
    var h ="<br/><p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>初始密码为 888888</p>";
    $(h).insertAfter("#loginName");
    
    
});