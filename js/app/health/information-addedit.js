$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'kind',
        title: '大类',
        type: "select",
        listCode: "621906",
        keyName:'dkey',
        valueName:'dvalue',
        params:{
            parentKey: "news_kind",
        },
        required: true,
        onChange:function(v,data){
            reqApi({
                code: '621906',
                json: {
                    parentKey: v
                },
                sync: true
            }).done(function(d) {
                var data1 = {};
                if(d.length && v){
                
                    d.forEach(function(v,i){
                        data1[v.dkey] = v.dvalue;
                    })
                }
                
                $("#category").renderDropdown2(data1);
                
            });
        },
        view: view,
        required: true
    }, {
        field: 'category',
        title: '小类',
        type: 'select',
        required: true,
        view: view,
    }, {
        field: 'type',
        title: '类型',
        type: "select",
        data: {
            "1": "资讯",
            "2": "文章"
        },
        view: view,
        required: true
    }, {
        field: 'title',
        title: "标题",
        maxlength: 255,
        view: view,
        required: true
    }, {
        field: 'advPic',
        title: '广告图',
        type: 'img',
        view: view,
        required: true
    }, {
        type: "textarea",
        field: "content",
        title: "内容",
        view: view,
        required: true
    }, {
        field: 'updater',
        title: "更新人",
        maxlength: 255,
        view: view,
        required: true
    }, {
        field: 'updateDatetime',
        title: "更新时间",
        type: dateTimeFormat,
        formatter: dateTimeFormat,
        view: view,
    }, {
        title: '位置',
        field: 'location',
        type: 'select',
        data: {
            "1": '热门',
            "0": "普通"
        },
        view: view,
        search: true
    }, {
        field: 'orderNo',
        title: "次序",
        view: view,
    }, {
        title: '备注',
        field: 'remark',
        view: view,
    }];

    buildDetail({
        fields: fields,
        view: view,
        code: code,
        detailCode: '621106',
        addCode: '621100',
        editCode: '621102'
    });

});