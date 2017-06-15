$(function() {
    var code = getQueryString('code');
    var storeCode;
    reqApi({
        code: '808219',
        json: { userId: getUserId() },
        sync: true
    }).done(function(data) {
        storeCode = data[0].store.code;
    });
    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'name',
            title: '房间名称',
            search: true,
        }, {
            field: 'price',
            title: '价格',
            formatter: moneyFormat,
        }, {
            field: 'totalNum',
            title: '总数',
        }, {
            field: 'remainNum',
            title: '剩余房间数'
        }
        // , {
        //     field: 'category',
        //     title: '参与类型',
        //     type: 'select',
        //     listCode: '808007',
        //     params:{
        //         companyCode: OSS.companyCode,
        //         type: '2',
        //         parentCode: '0',
        //         code: "FL2017061016211611994528",
        //     },
        //     keyName: 'code',
        //     valueName: 'name',
        // }
        , {
            field: 'status',
            title: '状态',
            type: "select",
            key: "sproduct_status",
            keyCode: "808907",
            formatter: Dict.getNameForList("sproduct_status", "808907"),
            search: true
        }, {
            field: 'orderNo',
            title: '序号',
            sortable: true,
        }
    ];

    buildList({
        columns: columns,
        pageCode: '808415',
        deleteCode: '808401',
        searchParams: {
            companyCode: OSS.companyCode,
            userId: getUserId(),
            storeCode: storeCode
                // category:"FL2017061016211611994528"
        },
    });

    $('#up2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        }

        if (selRecords[0].status == 2) {
            toastr.info("已上架");
            return;
        }

        window.location.href = "home_up2.html?Code=" + selRecords[0].code;

    });

    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        }

        if (selRecords[0].status != 3 && selRecords[0].status != 2) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '808404',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });

    $('#detail2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        }

        window.location.href = "home_detail2.html?Code=" + selRecords[0].code + "&v=1";
    });

    //审核
    $('#examineBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length == 1 && selRecords[0].status == 0) {

            window.location.href = "home_examine.html?Code=" + selRecords[0].code;
        } else {

            var dataCode = []

            for (var i = 0; i < selRecords.length; i++) {
                dataCode.push(selRecords[i].code)

                if (selRecords[i].status != 0) {
                    toastr.info("商品" + selRecords[i].name + "状态不能审核!");
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
                fields: [],
                container: $('#formContainer'),
                buttons: [{
                    title: '通过',
                    handler: function() {

                        var data = [];
                        data.codeList = dataCode;
                        data.approveResult = "1";
                        data.approver = getUserId();
                        reqApi({
                            code: '808015',
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
                        data.codeList = dataCode;
                        data.approveResult = "1";
                        data.approver = getUserId();
                        reqApi({
                            code: '808015',
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

    //修改
    $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "home_addedit.html?Code=" + selRecords[0].code + "&dc=" + selRecords[0].companyCode;

    });

});