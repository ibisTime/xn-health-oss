$(function () {
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    }; 
    var province;
    var city;
    var area;

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field : 'loginName',
        title : '登录名',
        search: true
    }, {
        field : 'realName',
        title : '姓名'
    }, {
        field : 'mobile',
        title : '手机号'
    }, {
        field : 'amount',
        title : '健康币余额',
        formatter:function(v,data){
            return moneyFormat(data.cnyAccount.amount);
        }
    },{
        field: 'userReferee',
        title: '推荐人',
        formatter: function(v, data) {
            if(data.referrer){
                var res1 = data.referrer.kind ;
                var res2 = data.referrer.loginName;
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
        field: 'province',
        title: '户籍地址',
        formatter: function(v, data) {
            var province = data.userExt.province
            var city = data.userExt.city;
            var area = data.userExt.area
            if (data.userExt.city == data.userExt.area) {
                var res = data.userExt.province + data.userExt.city
            }else if(data.userExt.province == data.userExt.city){
                var res = data.userExt.province + data.userExt.area
            }else{
                var res = data.userExt.province + data.userExt.city + data.userExt.area;
            }
            return res;
        },
        type: 'citySelect'
    }, {
        field: 'gxProvince',
        title: '管辖地址',
        type: 'citySelect1',
        formatter: function(v, data) {
            var gxProvince = data.gxProvince
            var gxCity = data.gxCity;
            var gxArea = data.gxArea
            if (data.gxCity == data.gxArea || data.gxArea == '-') {
                var res = data.gxProvince + data.gxCity
            }else if(data.gxProvince == data.gxCity){
                var res = data.gxProvince + data.gxArea
            }else{
                var res = data.gxProvince + data.gxCity + data.gxArea;
            }
            return res;
        },
        search: true
    }, {
        field : 'status',
        title : '状态',
        type: 'select',
        search: true,
        key: 'user_status',
        formatter: Dict.getNameForList('user_status',"807706"),
    },{
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat,
    },{
        field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        pageCode: '805054',
        searchParams:{
            kind: 'operator'
        },
        // beforeSearch: function(data){
        //     // if(!data.gxArea){
        //     //     data.gxArea = '';
        //     // }
        // },        
    });

    $('#cancelBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status == 5) {
            toastr.info("已解约");
            return;
        }
        confirm("确认解约？").then(function() {
            reqApi({
                code: '805187',
                json: { "userId": selRecords[0].userId,"updater": getUserName(),'remark':"解约"}
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        },function(){});
    });    
    
    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "partner_detail.html?userId=" + selRecords[0].userId+"&v=1";
    });
    
    
    $('#editBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "partner_addedit.html?userId="+selRecords[0].userId+"&loginName="+selRecords[0].loginName+"&v=1";
    });

    $('#revenueBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "partner_revenue.html?userId="+selRecords[0].userId+"&loginName="+selRecords[0].loginName;
    });

    $('#examineBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length == 1 ) {
            window.location.href = "partner_examine.html?userId=" + selRecords[0].userId+"&v=1&code=" + selRecords[0].code;
        } else {
            toastr.info("该状态不能审核!");
            return;

        }

    });    
    
    //发货
    $('#fahuoBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "partner_fahuo.html?userId=" + selRecords[0].userId;
    });
    
    //代销
    $('#daixiaoBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "../store/daixiaoLedger.html?Code=" + selRecords[0].code+"&owner="+selRecords[0].userId+"&c=CGB";
    });
    
    //积分
    $('#jifenBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "../store/daixiaoLedger.html?Code=" + selRecords[0].code+"&owner="+selRecords[0].userId+"&c=CGJF";
    });

    $('#resetBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "../person/role_pwd_reset.html?userId=" + selRecords[0].userId+"&userName="+selRecords[0].loginName;
    });  


    $('#referrerBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "../person/custom_referrer.html?userId=" + selRecords[0].userId;
    });   

    $('#addressBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "../person/custom_address.html?userId=" + selRecords[0].userId;
    });  
    
});