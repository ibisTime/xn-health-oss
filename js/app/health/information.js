$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'title',
        title: "标题"
    }, {
        field: 'category',
        title: '分类',
        type: 'select',
        key: "category_kind",
        formatter: Dict.getNameForList('category_kind')
    }, {
        field: 'kind',
        title: '类别',
        type: "select",
        key: "information_kind",
        formatter: Dict.getNameForList('information_kind')
    }, {
        field: 'type',
        title: '类别',
        type: "select",
        data: {
            "1": "资讯",
            "2": "文章"
        },
        search: true
    }, {
        title: "状态",
        field: 'status',
        type: "select",
        data: {
            "0": "草稿",
            "1": "发布",
            "2": "下架"
        },
        // key: "",
        // formatter: Dict.getNameForList(''),
        search: true
    }, {
        title: '位置',
        field: 'location',
        type: 'select',
        data: {
            "1": '热门',
            "0": "普通"
        },
        search: true
    }, {
        field: 'orderNo',
        title: "次序"
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        columns: columns,
        pageCode: '621105',
        deleteCode: '621101'
    });
    //发布
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != "0") {
            toastr.info("不是可以发布的状态");
            return;
        }
        window.location.href = "information_up.html?Code=" + selRecords[0].code;

    });
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == "1") {
            reqApi({
                code: "621104",
                json: { code: selRecords[0].code }
            }).done(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        } else {
            toastr.info("不是可以下架的状态");
            return;
        }


    });
});