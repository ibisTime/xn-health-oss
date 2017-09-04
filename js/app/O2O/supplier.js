$(function () {
    var code = getQueryString('code');

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
        field : 'mobile',
        title : '登录名',
        formatter: function(v, data) {
            return  data.user.loginName
        },
    }, {
        field: 'name',
        title: '名称',
        search: true
    },{
        title: '折扣',
        field: 'rate1',
        required: true,
    }
    // , {
    //     field: 'legalPersonName',
    //     title: '法人姓名',
    // }
    , {
        field: 'bookMobile',
        title: '联系电话',
    },{
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
        formatter: function(v, data) {
            if(data.referrer){
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
        }        
    },{
        field: 'status',
        title: '状态',
        type: "select",
        key: "store_status",
        keyCode:"808907",
        formatter: Dict.getNameForList("store_status","808907"),
        search: true
    }, {
        field: 'province',
        title: '地址',
        formatter: function(v, data) {
            if (data.city == data.area) {
                var res = data.province + data.city
            }else{
                var res = data.province + data.city + data.area;
            }
            return res;
        }
    }, {
        field: 'updateDatetime',
        title: '入驻时间',
        formatter: dateTimeFormat,
    }];

    buildList({
        columns: columns,
        code: code,
        pageCode: '808215',
        deleteCode:'808011',
		searchParams:{
            storeCode:code,
			companyCode: OSS.companyCode,
            // userReferee: sessionStorage.getItem('userId'),
            level: "3"
		},
    });
    
    $('#up2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        if (selRecords[0].status == 3||selRecords[0].status == 2) {
            toastr.info("已上架");
            return;
        }
        
        window.location.href = "supplier_up2.html?Code=" + selRecords[0].code;

    });
    
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        if ( selRecords[0].status != 3&&selRecords[0].status != 2 ) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '808205',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
    $('#editBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            
            if (selRecords.length>1) {
                toastr.info("不能多选");
                return;
            }
            
            window.location.href = "supplier_addedit.html?Code=" + selRecords[0].code+"&v=1";
        });    
    $('#detail2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "supplier_detail2.html?Code=" + selRecords[0].code+"&v=1";
    });
 
     //审核
    $('#examineBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        // if (selRecords[0].status != 0) {
        //     toastr.info("当前店铺状态不能审核!");
        //     return;
        // }

        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length == 1 ) {
            window.location.href = "supplier_examine.html?Code=" + selRecords[0].code+"&v=1";
        } else {
            toastr.info("该状态不能审核!");
            return;

        }
    });


	//修改
	$('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "supplier_addedit.html?Code=" + selRecords[0].code+"&dc="+selRecords[0].companyCode;

    });
    
    //产品参数
    $('#productParamBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "supplierParam.html?Code=" + selRecords[0].code+"&pName=" + selRecords[0].name;
    });

    $('#revenueBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "revenue.html?Code=" + selRecords[0].code+"&userId="+selRecords[0].owner;

    });

    $('#cancelBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status == 92) {
            toastr.info("已解约");
            return;
        }
        confirm("确认解约？").then(function() {
            reqApi({
                code: '808210',
                json: { "code": selRecords[0].code,"updater": getUserName(),'remark':"解约"}
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
        window.location.href = "../person/role_pwd_reset.html?userId=" + selRecords[0].user.userId+"&userName="+selRecords[0].user.loginName;
    });  

    $('#referrerBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "../person/custom_referrer.html?userId=" + selRecords[0].user.userId;
    });   

    $('#addressBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "../person/custom_address.html?userId=" + selRecords[0].user.userId;
    });          
    
});