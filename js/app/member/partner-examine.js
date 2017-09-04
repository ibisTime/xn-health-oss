$(function() {
    
    var userId = getQueryString('userId');
    var loginName = getQueryString('loginName');
    var view = getQueryString('v');
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };    
    var remarkField = {
        title: '审核说明',
        field: 'approveNote',
        maxlength: 250,
        readonly: false,
        formatter:function(v,data){
           return  data.approveNote
        }
    };

    var examineList = [remarkField]   
    var buttons = [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data.approveResult = '1';
                        data.userId = userId;
                        data.approver = getUserName();
                        data.remark = $("#approveNote").val();
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
                        data.remark = $("#approveNote").val();
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
        title: '户籍地址',
        // type: 'citySelect',
        formatter: function(v, data) {
            if (data.userExt.city == data.userExt.area) {
                var res = data.userExt.province + data.userExt.city
            }else{
                var res = data.userExt.province + data.userExt.city + data.userExt.area;
            }
            return res;
        }
    }, {
        field: 'gxProvince',
        title: '管辖地址',
        // type: 'citySelect1',
        formatter: function(v, data) {
            if (data.gxCity == data.gxArea || data.gxArea == '-') {
                var res1 = data.gxProvince + data.gxCity
            }else{
                var res1 = data.gxProvince + data.gxCity + data.gxArea;
            }
            return res1;
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

    $('#gxProvince').parent('li').css('display','block')
    
});