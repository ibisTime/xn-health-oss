$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'content',
        title: '评论内容',
    }, {
        field: 'title',
        title: '针对帖子',
        formatter: function(v, data) {
            return data.post.title
        }
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
        detailCode: '621063',
    };

    buildDetail(options);

});