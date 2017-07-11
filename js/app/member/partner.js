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
        field : 'mobile',
        title : '手机号'
    },{
        field: 'userReferee',
        title: '推荐人',
        formatter: function(v, data) {
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
    }, {
        field: 'province',
        title: '地址',
        formatter: function(v, data) {
            var province = data.userExt.province
            var city = data.userExt.city;
            var area = data.userExt.area
            if (data.userExt.city == data.userExt.area) {
                var res = data.userExt.province + data.userExt.city
            }else{
                var res = data.userExt.province + data.userExt.city + data.userExt.area;
            }
            return res;
        }
    }, {
        field : 'status',
        title : '状态',
        type: 'select',
        search: true,
        key: 'user_status',
        formatter: Dict.getNameForList('user_status',"807706"),
    }, {
        field: 'remark',
        title: '备注'
    },];

    buildList({
        columns: columns,
        pageCode: '805054',
        searchParams:{
            kind: 'operator'
        },
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
    
});