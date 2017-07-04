$(function() {

    var code = getQueryString('code');
    var view = true;

    var typeData = {}
    reqApi({
        code: '808007'
    }).done(function(d) {

        d.forEach(function(v, i) {
            typeData[v.code] = v.name;
        })
    });
    var statusStore = {
        "0": "待审核",
        '1': "审核通过待上架",
        '2': "已上架,开店",
        '3': "已上架，关店",
        '4': "已下架",
        "91": "审核不通过"
    };




    var fields = [{
            field: 'kind',
            type: 'hidden',
            value: '1'
        },
        // , {
        //        field: 'companyCode',
        //        title: '商户',
        // formatter: function(v ,data){
        //  return data.store.name
        // }
        // }
        {
            field: 'name',
            title: '民宿名称',
            formatter: function(v, data) {
                return data[0].store.name;
            }
        }, {
            field: 'category',
            title: '大类',
            type: 'select',
            data: typeData,
            keyName: 'code',
            valueName: 'name',
            formatter: function(v, data) {
                return data[0].store.category;
            }
        }, {
            field: 'type',
            title: '小类',
            type: 'select',
            data: typeData,
            keyName: 'code',
            valueName: 'name',
            formatter: function(v, data) {
                return data[0].store.type;
            }
        }, {
            field: 'province',
            title: '民宿地址',
            formatter: function(v, data) {
                var res = data[0].store.province + data[0].store.city + data[0].store.area + data[0].store.address;
                return res;
            }
        }, {
            title: "预约电话",
            field: "bookMobile",
            formatter: function(v, data) {
                return data[0].store.bookMobile;
            }
        }, {
            field: 'slogan',
            title: '广告语',
            formatter: function(v, data) {
                return data[0].store.slogan;
            }
        }, {
            field: 'advPic',
            title: '广告图',
            type: 'img',
            formatter: function(v, data) {
                return data[0].store.advPic
            }
        }, {
            field: 'pic',
            title: '展示图',
            type: 'img',
            required: true,
            readonly: view,
            formatter: function(v, data) {

                return data[0].store.pic;
            }
        }, {
            title: '状态',
            field: "status",
            type: "select",
            formatter: function(v, data) {
                var sta = data[0].store.status
                return statusStore[sta];
            }
        }, {
            field: 'description',
            title: '图文描述',
            formatter: function(v, data) {
                return data[0].store.description;
            }
        }, {
            field: 'remark',
            title: '备注',
            readonly: view,
            formatter: function(v, data) {
                return data[0].store.remark;
            }
        }
    ];

    buildDetail({
        fields: fields,
        view: view,
        code: {
            userId: getUserId()
        },
        detailCode: '808219',
    });

    $("#subBtn").hide();
    $("#backBtn").hide();

});