$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'content',
        title: '评论内容',
        search: true
    }
    // , {
    //     field: 'location',
    //     title: '针对帖子',
        // formatter: function(v, data) {
        //     return data.post.title
        // }
    // }
    , {
        field: 'nickname',
        title: '评论人'
    }, {
        field: 'commDatetime',
        title: '评论时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        listCode: "621906",
        params:{
            parentKey:"post_status",
        },
        keyName:"dkey",
        valueName:"dvalue",
        search: true,
    }];

    buildList({
        router: "comment",
        columns: columns,
        pageCode: "621062",
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
            window.location.href = "comment_check.html?Code=" + selRecords[0].code;
        } else {
            var dataCode = []
            for (var i = 0; i < selRecords.length; i++) {
                dataCode.push(selRecords[i].code)

                if (selRecords[i].status != 'F') {
                    toastr.warning("评论：" + selRecords[i].content + "的状态不能审核!");
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
                        data["type"] = "2";
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
                        data["type"] = "2";
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
        var data = { codeList: codeList, type: '2', userId: sessionStorage.getItem('userName') };
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

})