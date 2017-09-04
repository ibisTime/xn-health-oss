$(function() {

    var router = '/user';
    var data1 ={
        "SRSysAdmin":'系统管理员',
        "SRSuperAdmin":"超级管理员",
    }

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'loginName',
        title: '用户名',
        search: true
    }, {
        field: 'status',
        title: '状态',
        formatter: Dict.getNameForList('user_status'),
        type: 'select',
        key: 'user_status'
    }, {
        field: 'roleCode',
        title: '角色',
        type: 'select',
        data:data1,
        // listCode: '805021',
        // keyName: 'code',
        // valueName: 'name',
        search: true
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        router: 'user',
        columns: columns,
        pageCode: '805054',
        searchParams: {
            kind: '01'
        }
    });

    $('#assignBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "user_role.html?userId=" + selRecords[0].userId + "&loginName=" + encodeURI(encodeURI(selRecords[0].loginName)) + "&kind=" + selRecords[0].kind;
    });
     $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "user_role.html?userId=" + selRecords[0].userId + "&loginName=" + encodeURI(encodeURI(selRecords[0].loginName)) + "&kind=" + selRecords[0].kind;
    });

    $('#resetBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        location.href = "/person/role_pwd_reset.html?userId=" + selRecords[0].userId + '&userName=' + selRecords[0].loginName;
    });

    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        console.log(selRecords)
        var status = selRecords[0].status,
            toStatus;
        status == 0 ? toStatus = 2 : toStatus = 0;
        reqApi({
            code: '805052',
            json: {
                userId: selRecords[0].userId,
                toStatus: toStatus,
                remark: selRecords[0].remark
            }
        }).then(function() {
            sucList();
        });
    });

    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        reqApi({
            code: '805052',
            json: {
                userId: selRecords[0].userId,
                toStatus: '0',
                remark: selRecords[0].remark
            }
        }).then(function() {
            sucList();
        });
    });

});