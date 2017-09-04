$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var kind,level1 = "",userReferee;
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"会员"
    };    
    
    var fields = [{
        title: '手机号',
        field: 'mobile',
        readonly: true,
    }, {
        field: 'referrerKind',
        title: '推荐人类型',
        type: 'select',
        data:userRefereeType,
        value: function(data) {
            if(data['referrer']){
                return data['referrer']['kind'];
            }       
        },
        afterSet: function(v,data){
            if(data.referrer){
                userReferee = data.referrer.mobile
            }
        },
        onChange:function(v){
            if(v == "operator" ){
                kind = "operator";
                level1 = "";
            }else if(v == "o2o" ){
                kind = "o2o";
                level1 = "";
            }else if(v == "supplier" ){
                kind = "supplier";
                level1 = "";
            }else if(v == "mingsu" ){
                kind = "mingsu";
                level1 = "";
            }else if(v == "f1" ){
                kind = "f1";
                level1 = "1";
            }           
            reqApi({
                code: '805060',
                json: {
                    kind:kind,
                    start:"1",
                    limit:"10",                    
                    level:level1,
                    status:"0"
                },
                sync: true
            }).done(function(d) {
                var data1 = {};

                if(d.list.length ){
                    d.list.forEach(function(d,i){
                        data1[d.userId] = d.mobile;
                    });
                }
                $("#userReferee").renderDropdown2(data1,userReferee);
            });           
        }                        
    },{
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
        value: function(data) {
            if(data['referrer']){
                return data['referrer']['userId'];
            }       
        }
    }];
    
    buildDetail({
        fields: fields,
        code:{
            userId:userId
        },
        detailCode: "805056",
        editCode: '805185',
        beforeSubmit: function(data){
            data.userId = userId;
            return data;
        }
    });
});