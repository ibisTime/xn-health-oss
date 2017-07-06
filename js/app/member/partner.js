$(function () {
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
    }
    // , {
    //     title : '分成比例',
    //     field : 'divRate',
    // }
    , {
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

        if (selRecords.length == 1 &&  selRecords[0].status >= 3) {
        var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">备注</li></ul>' +
                    '</form>'
            });            
            dw.showModal();
            buildDetail({
                fields: [{
                    field: 'remark',
                    title: '备注',
                    maxlength: 250
                }],
                container: $('#formContainer'),
                buttons: [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data.approveResult = '1';
                        data.userId = selRecords[0].userId;
                        data.approver = getUserName();
                        data.divRate = '0';
                        data.remark = $("#remark").val();
                        reqApi({
                            code: '805183',
                            json: data
                        }).done(function(data) {
                            toastr.info("操作成功");

                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                            setTimeout(function() {
                                dw.close().remove();
                            }, 500)
                        });

                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        var data = [];
                        data.approveResult = '0';
                        data.userId = selRecords[0].userId;
                        data.approver = getUserName();
                        data.divRate = '0';
                        data.remark = $("#remark").val();
                        reqApi({
                            code: '805183',
                            json: data
                        }).done(function(data) {
                            toastr.info("操作成功");
                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                            setTimeout(function() {
                                dw.close().remove();
                            }, 500)
                        });
                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw.close().remove();
                    }
                }]
            });

            dw.__center();
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