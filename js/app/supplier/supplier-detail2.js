$(function() {
    var view = true;
    
    var typeData = {}
    reqApi({
        code:'808007'
    }).done(function(d) {
                    
        d.forEach(function(v,i){
            typeData[v.code] = v.name;
        })
    });

    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };     

    var statusStore = {
        "0": "待审核",
        '1': "审核通过待上架",
        '2': "已上架,开店",
        '3': "已上架，关店",
        '4': "已下架",
        "91": "审核不通过"
    };
    
    var fields = [
    // {
    //     field: 'kind',
    //     type: 'hidden',
    //     value: '1'
    // },
    // {
    //     field : 'mobile',
    //     title : '登录名',
    //     formatter: function(v, data) { 
    //         window.sessionStorage.setItem('storeCode', data[0].store.code); 
    //         return data[0].store.mobile;
    //     }        
    //     // search: true
    // },
     {
        field: 'legalPersonName',
        title: '法人姓名',
        formatter: function(v, data) { 
        window.sessionStorage.setItem('storeCode', data[0].store.code);  
            return data[0].store.legalPersonName;
        }         
    }, {
        field: 'name',
        title: '店铺名称',
        formatter: function(v, data) {   
            return data[0].store.name;
        }         
    },
    {
        field: 'level',
        title: '商家类型',
        key: "store_level",
        keyCode: '808907',
        formatter: function(v, data) {   
            // return data[0].store.level;
           return Dict.getNameForList1("store_level", "808907",data[0].store.level)
        }

    }, {
        field: 'category',
        title: '大类',
        type:'select',
        data: typeData,
        keyName: 'code',
        valueName: 'name',
        formatter: function(v, data) {   
            return data[0].store.category;
        }
    }, {
        field: 'type',
        title: '小类',
        type:'select',
        data: typeData,
        keyName: 'code',
        valueName: 'name',
        formatter: function(v, data) {
            return data[0].store.type;
        }
    }, {
        field: 'rate1',
        title: '折扣',
        formatter: function(v, data) {
            return data[0].store.rate1;
        }
    },{
        field: 'province',
        title: '商户地址',
        formatter: function(v, data) {
            var res = data[0].store.province + data[0].store.city + data[0].store.area + data[0].store.address;
            return res;
        }
    }
    // , {
    //     field: 'name',
    //     title: '供应商名称',
    //     formatter: function(v, data) {
    //         window.sessionStorage.setItem('storeCode', data[0].store.code);
    //         return data[0].store.name;
    //     }
    // }
    , {
        field: 'bookMobile',
        title: '联系电话',
        formatter: function(v, data) {
            return data[0].store.bookMobile;
        }        
    },{
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
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
        type : 'img',
        formatter: function(v, data) {
            return data[0].store.advPic
        }
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
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
    }];
    
    buildDetail({
        fields: fields,
        view: view,
        code:{
            userId:getUserId()
        },
        detailCode: '808219',
    });
    $("#subBtn").hide();
    $("#backBtn").hide();
});