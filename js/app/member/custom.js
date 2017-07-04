$(function() {
    var userKind = {
        "f1": "C端用户",
        "f2": "B端用户"
    }
    var columns = [{
            field: '',
            title: '',
            checkbox: true
        },{
            title: "登录名",
            field: "loginName",
            // search: true
        },{
            title: "昵称",
            field: "nickname",
            // search: true
        }, {
            title: '手机号',
            field: 'mobile',
            search: true
        }, {
            title: '推荐人',
            field: 'userRefereeName',
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
        window.location.href = "custom_addedit.html?Code=" + selRecords[0].code+'&userId='+selRecords[0].userId;
    });
});