$(function() {
    var userKind = {
        "f1": "C端用户",
        "f2": "B端用户"
    };
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };    

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        },{
            title: "登录名",
            field: "loginName",
            // search: true
        }, {
            field : 'nickname',
            title : '昵称'
        }, {
            title: '手机号',
            field: 'mobile',
            search: true
        }, {
            field : 'amount',
            title : '健康币余额',
            formatter:function(v,data){
                return moneyFormat(data.cnyAccount.amount);
            }
        }, {
            field : 'amount1',
            title : '积分余额',
            formatter:function(v,data){
                return moneyFormat(data.jfAccount.amount);
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
        }, {
            title: "用户类型",
            field: "level",
            type: "select",
            key: "user_level",
            formatter: Dict.getNameForList("user_level"),
            search: true
        }, {
            title: "状态",
            field: "status",
            type: "select",
            key: "user_status",
            formatter: Dict.getNameForList("user_status"),
            search: true
        }, {
            field: 'province',
            title: '地址',
            formatter: function(v, data) {
                var address = data.userExt.address;
                !address?address = "": address
                if (data.userExt.city == data.userExt.area) {
                    var res = data.userExt.province + data.userExt.city + address;
                }else if(data.userExt.province == data.userExt.city){
                    var res = data.userExt.province + data.userExt.area + address;
                }else{
                    var res = data.userExt.province + data.userExt.city + data.userExt.area + address;
                }
                return res;
            }
        }, {
            title: "注册时间",
            field: "createDatetime",
            formatter: dateTimeFormat
        }, {
            title: '备注',
            field: 'remark'
        }
    ];
    buildList({
        router: 'custom',
        columns: columns,
        pageCode: '805054',
        searchParams: {
            kind: "f1"
        }
    });
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 2) {
            toastr.info("该账户已被注销");
            return;
        }
        var status = selRecords[0].status,
            toStatus;
        status == 0 ? toStatus = 2 : toStatus = 0;
        confirm("确定注销该账户？").then(function() {
            reqApi({
                code: '805052',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: toStatus
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });

        });

    });
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0) {
            toastr.info("该账户是已正常状态");
            return;
        }
        confirm("确定激活该账户？").then(function() {
            reqApi({
                code: '805052',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '0'
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });

        });
    });
    $('#accountBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "account.html?userId=" + selRecords[0].userId;

    });

    $("#orderBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "custom_achieve.html?userId=" + selRecords[0].userId;

    });
    $("#ledgerBtn").remove();

    $('#editBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./custom_addedit.html?Code=" + selRecords[0].code+'&userId='+selRecords[0].userId;
    });
    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./custom_detail.html?Code=" + selRecords[0].code+'&userId='+selRecords[0].userId;
    });    
    $('#revenueBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        // console.log(selRecords[0].userId)
        window.location.href = "./custom_revenue.html?userId=" + selRecords[0].userId;
    });

    $('#JF_revenueBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        // console.log(selRecords[0].userId)
        window.location.href = "./custom_JFrevenue.html?userId=" + selRecords[0].userId;
    });

    $('#referrerBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "./custom_referrer.html?userId=" + selRecords[0].userId;
    });   

    $('#addressBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "./custom_address.html?userId=" + selRecords[0].userId;
    });         

    $('#cancelBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
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

    $('#resetBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        // console.log(selRecords)
        window.location.href = "../person/role_pwd_reset.html?userId=" + selRecords[0].userId+"&userName="+selRecords[0].loginName;
    });             
});