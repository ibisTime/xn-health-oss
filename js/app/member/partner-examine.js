$(function() {
    
    var userId = getQueryString('userId');
    var loginName = getQueryString('loginName');
    var view = getQueryString('v');
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"名宿主",
        "f1":"VIP会员",
    };    
    var remarkField = {
        title: '备注',
        field: 'remark',
        maxlength: 250,
        readonly: false
    };

    var examineList = [remarkField]   
    var buttons = [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data.approveResult = '1';
                        data.userId = userId;
                        data.approver = getUserName();
                        data.remark = $("#remark").val();
                        reqApi({
                            code: '805183',
                            json: data
                        }).done(function(data) {
                            sucDetail();
                        });

                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        var data = [];
                        data.approveResult = '0';
                        data.userId = userId;
                        data.approver = getUserName();
                        data.remark = $("#remark").val();
                        reqApi({
                            code: '805183',
                            json: data
                        }).done(function(data) {
                            sucDetail();
                        });
                    }
                }, {
                    title: '返回',
                    handler: function() {
                        goBack();
                    }
                }];    
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
        view: view
    }, {
        field: 'province',
        title: '地址',
        formatter: function(v, data) {
            if (data.userExt.city == data.userExt.area) {
                var res = data.userExt.province + data.userExt.city
            }else{
                var res = data.userExt.province + data.userExt.city + data.userExt.area;
            }
            return res;
        }
    },{
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
        formatter: function(v, data) {
            if(data.referrer){
                if(data.referrer){
                    var res1 = data.referrer.kind ;
                    var res2 = data.referrer.mobile;
                    if(res1 && res2){
                        return userRefereeType[res1]+ '/' +res2
                    }else{
                       return "-" 
                    }                
                }
            }        
        }
    },  {
        title: '证件类型',
        field: 'idKind',
        type: 'select',
        key: 'id_kind',
        keyCode: "807706",
        
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

    fields = fields.concat(examineList)
    
    buildDetail({
        fields: fields,
        view: view,
        buttons: buttons,
        code:{
            userId: userId
        },
        detailCode: '805056',
        addCode: '805042',
        editCode: '805182',
        beforeSubmit: function(data){
            if(userId){
                data.userId = userId;
            }
            data.kind = 'operator';
            
            return data;
        }
    });
    
    var h ="<br/><p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>初始密码为 888888</p>";
    $(h).insertAfter("#loginName");
    
});