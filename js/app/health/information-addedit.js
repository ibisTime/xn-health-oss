$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'kind',
        title: '类型',
        type: "select",
        listCode: "621906",
        keyName:'dkey',
        valueName:'dvalue',
        params:{
            parentKey: "news_kind",
        },
        required: true,
        onChange:function(v,data){
            var $kind_chosen = $("#kind_chosen .chosen-single span").text() == "形体资讯";
            reqApi({
                code: '621507',
                json: {
                    type:$kind_chosen?"2":"1",
                    parentCode:"0"
                },
                sync: true
            }).done(function(d) {
                var data1 = {};
                if(d.length && v){
                
                    d.forEach(function(v,i){
                        data1[v.code] = v.name;

                    })
                }
                
                $("#category").renderDropdown2(data1);
                
            });

            if ($("#kind_chosen .chosen-single span").text() == "健康资讯"){
                $("#type_chosen").parents(".clearfix").hide() 
            }else{
                $("#type_chosen").parents(".clearfix").show() 
            }
        },
        view: view,
        required: true,
    }, {
        field: 'category',
        title: '大类',
        type: 'select',
        required: true,
        view: view,
        onChange: function(v, data) {
            var $kind_chosen = $("#kind_chosen .chosen-single span").text() == "形体资讯";
            reqApi({
                code: '621507',
                json: {
                    type:$kind_chosen?"2":"1",
                    parentCode: v
                },
                sync: true
            }).done(function(d) {
                var data2 = {};
                if(d.length && v){
                
                    d.forEach(function(v,i){
                        data2[v.code] = v.name;

                    })
                }
                
                $("#type").renderDropdown2(data2);
                
            });
        },
    }, {
        field: 'type',
        title: '小类',
        type: "select",
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
    }
    // , {
    //     field: 'updater',
    //     title: "更新人",
    //     maxlength: 255,
    //     view: view,
    //     required: true
    // }
    // , {
    //     field: 'updateDatetime',
    //     title: "更新时间",
    //     // type: dateTimeFormat,
    //     formatter: dateTimeFormat,
    //     view: view,
    // }
    // , {
    //     title: '位置',
    //     field: 'location',
    //     type: 'select',
    //     listCode: "621906",
    //     keyName:'dkey',
    //     valueName:'dvalue',
    //     params:{
    //         parentKey: "news_location",
    //     },
        
    //     view: view,
    //     search: true
    // }, {
    //     field: 'orderNo',
    //     title: "次序",
    //     view: view,
    // }
    , {
        title: '备注',
        field: 'remark',
        view: view,
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '621106',
        addCode: '621100',
        editCode: '621102',
        beforeSubmit: function(data) {
            data.updater = getUserId();
            console.log(data.type)
            if(data.type == ""){
                data.type = "0";

            }
            return data;
        }
    });

});