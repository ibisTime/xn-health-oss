$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'word',
        title: '关键词',
        search: true,
        required: true,
        view: view,
    }
    , {
        field: 'weight',
        title: '权重',
        required: true,
        view: view,
        type:"hidden",
        value:"1"
    }, {
        field: 'level',
        title: '作用等级',
        required: true,
        view: view,
        type:"hidden",
        value:"0"
    }, {
        field: 'reaction',
        title: '反应',
        required: true,
        view: view,
        type:"hidden",
        value:"0"
    }
    // , {
    //     field: 'updater',
    //     title: '更新人',
    //     required: true,
    //     view: view,
    // }, {
    //     field: 'updateDatetime',
    //     title: '更新时间',
    //     required: true,
    //     type: "datetime",
    //     view: view,
    //     formatter: dateTimeFormat
    // }
    , {
        title: '备注 ',
        field: 'remark',
        view: view,
    }];

    var options = {
        fields: fields,
        code:{
            code: code,
            updater: getUserId(),
        },
        view:view,
        addCode: '621000',
        editCode: '621002',
        detailCode: '621006',
    };

    buildDetail(options);

});