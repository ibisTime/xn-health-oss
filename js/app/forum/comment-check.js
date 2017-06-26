$(function() {

    var code = getQueryString('code');


    var fields = [{
        title: '评论内容',
        field: 'content',
        readonly: true
    }, {
        title: '针对帖子',
        field: 'content1',
        formatter: function(v, data) {
            return data.post.title;
        },
        readonly: true
    }, {
        title: "评论人",
        field: "nickname",
        readonly: true
    }, {
        title: "评论时间",
        field: "commDatetime",
        formatter: dateTimeFormat,
        readonly: true
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
        readonly: true
    }, {
        title: '审核说明',
        field: 'approveNote',
        maxlength: 250
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '621063'
    };

    options.buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['codeList'] = [code];
                data['approver'] = sessionStorage.getItem('userName');
                data["approveResult"] = "1";
                data["type"] = "2";
                data["approveNote"] = $("#approveNote").val();
                reqApi({
                    code: "621012",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['codeList'] = [code];
                data['approver'] = sessionStorage.getItem('userName');
                data["approveResult"] = "0";
                data["type"] = "2";
                data["approveNote"] = $("#approveNote").val();
                reqApi({
                    code: "621012",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail(options);

});