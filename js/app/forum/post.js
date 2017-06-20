$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    },{
        field: 'nickname',
        title: '发帖人'
    }, {
        field: 'title',
        title: '标题',
        search: true
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data: {
            "1": "热门",
            "0": "普通"
        },
        search: true
    }, {
        title: 'UI次序',
        field: 'orderNo'
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        // key: 'post_status',
        listCode: "621906",
        params:{
            parentKey:"post_status",
        },
        keyName:"dkey",
        valueName:"dvalue",
        search: true,
    }, {
        field: 'publishDatetime',
        title: '发布时间',
        formatter: dateTimeFormat
    }, {
        title: '审核说明',
        field: 'approveNote',
        required: true,
        maxlength: 250
    }];

    buildList({
        router: 'post',
        columns: columns,
        pageCode: "621060",
        searchParams: {
            companyCode: OSS.companyCode
        },
        // singleSelect: false

    });

    //审核
    $('#cheBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length == 1 && selRecords[0].status == "F") {
            window.location.href = "post_check.html?Code=" + selRecords[0].code;
        } else {
            var dataCode = []
            for (var i = 0; i < selRecords.length; i++) {
                dataCode.push(selRecords[i].code)

                if (selRecords[i].status != 'F') {
                    toastr.warning("帖子：" + selRecords[i].title + "的状态不能审核!");
                    return;
                }
            }
            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量审核</li></ul>' +
                    '</form>'
            });
            dw.showModal();
            buildDetail({
                fields: [{
                    field: 'approveNote',
                    title: '审核意见',
                    required: true,
                    maxlength: 250
                }],
                container: $('#formContainer'),
                buttons: [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data['codeList'] = dataCode;
                        data['approver'] = sessionStorage.getItem('userName');
                        data["approveResult"] = "1";
                        data["type"] = "1";
                        data["approveNote"] = $("#approveNote").val();
                        reqApi({
                            code: '621012',
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
                        var data = $('#popForm').serializeObject();
                        data['codeList'] = dataCode;
                        data['approver'] = sessionStorage.getItem('userName');
                        data["approveResult"] = "0";
                        data["type"] = "1";
                        data["approveNote"] = $("#approveNote").val();
                        reqApi({
                            code: '621012',
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
        }

    });

    //热门
    $('#hotBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length >= 2) {
            toastr.info("请选择一条记录");
            return;
        }
        if (selRecords[0].location == '0') {
            window.location.href = "post_hot.html?code=" + selRecords[0].code;
        }

        confirm("确定取消该帖子的热门位置？").then(function() {
            reqApi({
                code: '621014',
                json: { code: selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });
    });
    //删除
    $('#multideleteBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var codeList = [];
        selRecords.forEach(function(item) {
            codeList.push(item.code);
        });
        var data = { codeList: codeList, type: '1', userId: sessionStorage.getItem('userName') };
        confirm("确认删除帖子？").then(function() {
            reqApi({
                code: '621013',
                json: data
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });
    });

    // $('#detailBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }
        
    //     window.location.href = "post_addedit.html?code=" + selRecords[0].code+"&v=1";

    // });

})