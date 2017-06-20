$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'content',
        title: '评论内容',
        search: true
    }, {
        field: 'location',
        title: '针对帖子',
    }, {
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
        detailCode: '621006',
    };

    buildDetail(options);

});