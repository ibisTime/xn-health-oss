$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'category',
        title: '分类',
        type: 'select',
        required: true
    }, {
        field: 'kind',
        title: '类别',
        type: "select",
        key: "",
        formatter: Dict.getNameForList(''),
        required: true
    }, {
        field: 'type',
        title: '类型',
        type: "select",
        data: {
            "1": "资讯",
            "2": "文章"
        },
        required: true
    }, {
        field: 'title',
        title: "标题",
        maxlength: 255,
        required: true
    }, {
        field: 'advPic',
        title: '广告图',
        type: 'img',
        required: true
    }, {
        type: "textarea",
        field: "content",
        title: "内容"
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '621106',
        addCode: '621100',
        editCode: '621102'
    });

});