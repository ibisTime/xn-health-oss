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

    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };    


    var fields = [
            {
            field: 'legalPersonName',
            title: '法人姓名',
            required: true,
            formatter: function(v, data) {
                return data[0].store.legalPersonName;
            }            
        },{
            field: 'level',
            title: '商家类型',
            type: 'select',
            required: true,
            keyName: "dkey",
            listCode: '808907',
            valueName: 'dvalue',
            params:{
                 parentKey: "store_level"
            },
            formatter: function(v, data) {   
               return Dict.getNameForList1("store_level", "808907",data[0].store.level)
            }
        },{
            field: 'name',
            title: '民宿名称',
            
            formatter: function(v, data) {
                return data[0].store.name;
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
        },{
            field: 'userReferee',
            title: '推荐人',
            readonly: view,
            formatter: function(v, data) {  
                if(data[0].store.referrer){
                if(data[0].store.referrer){
                    var res1 = data[0].store.referrer.kind ;
                    var res2 = data[0].store.referrer.mobile;
                    if(res1 && res2){
                        return userRefereeType[res1]+ '/' +res2
                    }else{
                       return "-" 
                    }                
                }
            }   
                
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