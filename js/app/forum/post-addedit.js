$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'nickname',
        title: '发帖人'
    }, {
        field: 'title',
        title: '标题',
    }, {
        field: 'content',
        title: '评论内容',
    }, {
        title: '图片',
        type: "img",
        field: 'pic'
    }, {
        title: '位置',
        field: 'address'
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data: {
            "1": "热门",
            "0": "普通"
        }
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
        title: '审核人',
        field: 'approver',
        required: true,
        maxlength: 250
    }, {
        title: '审核时间',
        field: 'approveDatetime',
        formatter: dateTimeFormat
    }, {
        title: '审核说明',
        field: 'approveNote',
        required: true,
        maxlength: 250
    }];

    var options = {
        fields: fields,
        code: code,
        view:view,
        detailCode: '621061',
    };

    buildDetail(options);

});