$(function() {
    var view = true;
     var d = {},remark,description,pic,advPic,slogan;
    
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
    
    var fields = [{
        field: 'legalPersonName',
        title: '法人姓名',
        readonly:view,
        formatter: function(v, data) { 
            d= data[0].store;
        window.sessionStorage.setItem('storeCode', data[0].store.code);  
            return data[0].store.legalPersonName;
        }         
    }, {
        field: 'name',
        title: '店铺名称',
        readonly:view,
        formatter: function(v, data) {   
            return data[0].store.name;
        }         
    },
    {
        field: 'level',
        title: '商家类型',
        key: "store_level",
        keyCode: '808907',
        readonly:view,
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
        readonly:view,
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
        readonly:view,
        formatter: function(v, data) {
            return data[0].store.type;
        }
    }, {
        field: 'rate1',
        title: '折扣',
        readonly:view,
        formatter: function(v, data) {
            return data[0].store.rate1;
        }
    },{
        field: 'province',
        title: '商户地址',
        readonly:view,
        formatter: function(v, data) {
            province = data[0].store.province;
            city = data[0].store.city;
            area = data[0].store.area;
            address = data[0].store.address;
            var res = province + city + area + address;
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
        readonly:view,
        formatter: function(v, data) {
            return data[0].store.bookMobile;
        }        
    },{
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
        readonly:view,
        formatter: function(v, data) {
            if(data[0].store.referrer){
                if(data[0].store.referrer){
                    var res1 = data[0].store.referrer.kind ;
                    var res2 = data[0].store.referrer.mobile;
                    var level = data[0].store.referrer.level ;
                    if(res1 && res2){
                        if (res1 == 'f1') {
                            return Dict.getNameForList1("user_level","807706",level)+ '/' +res2
                        }else{
                            return userRefereeType[res1]+ '/' +res2
                        }
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
    },{
        title: '营业执照',
        field: 'pdf',
        type: 'img',
        single: true,
        formatter: function(v, data) {
            return data[0].store.pdf;
        }
    }, {
        field: 'advPic',
        title: '广告图',
        type : 'img',
        single: true,
        formatter: function(v, data) {
            return data[0].store.advPic
        }
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
        required: true,
        formatter: function(v, data) {

            return data[0].store.pic;
        }
    }, {
        title: '状态',
        field: "status",
        type: "select",
        readonly:view,
        formatter: function(v, data) {
            var sta = data[0].store.status
            return statusStore[sta];
        }
    }, {
        field: 'description',
        title: '图文描述',
        type:'textarea',
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
    
   var options = {
        fields: fields,
        code:{
            userId:getUserId()
        },
        detailCode: '808219',
        editCode: '808208'
    }
    buildDetail(options);

    var h ="<br/><p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>建议上传200×200图片</p>";
    $(h).insertAfter("#advPic"); 
    $(h).insertAfter("#pic");  
    $(h).insertAfter("#pdf");    

 $('#subBtn').off("click").click(function() {
           var data = $('#jsForm').serializeObject();
           // console.log(data)
                // var data = {};
                var addr = d.province + d.city + d.area + d.address;
                var myGeo = new BMap.Geocoder();
                myGeo.getPoint(addr, function(point) {
                    if (point) {
                        data.companyCode = OSS.companyCode,
                        data.id = d.code
                         data.code = d.code
                         data.storeCode = d.code
                         data.legalPersonName = d.legalPersonName
                         data.level = d.level
                         data.category = d.category
                         data.type = d.type
                         data.rate1 = d.rate1
                         data.rate2 = d.rate2
                         data.rate3 = d.rate3
                         data.province = d.province
                         data.city = d.city
                         data.area = d.area
                         data.address = d.address
                         data.longitude = point.lng
                         data.latitude = point.lat
                         data.name = d.name
                         data.bookMobile = d.bookMobile
                         data.smsMobile = d.bookMobile
                         data.userReferee = d.userReferee
                         data.status = d.status
                         // data.slogan = $("#slogan").val()?$("#slogan").val():d.slogan
                         // data.description = description?description:d.description
                         data.remark = remark?remark:d.remark;
                         data.pdf = $("#pdf .img-ctn").attr("data-src")?$("#pdf .img-ctn").attr("data-src"):d.pdf;
                         data.advPic = $("#advPic .img-ctn").attr("data-src")?$("#advPic .img-ctn").attr("data-src"):d.advPic;
                         var values = [];
                         var imgs = $("#pic").find('.img-ctn');
                        imgs.each(function(index, img) {
                            values.push($(img).attr('data-src') || $(img).find('img').attr('data-src'));
                        });                       
                         data.pic = values.join('||')?values.join('||'):d.pic                         
                        reqApi({
                            code: code ? options.editCode : options.addCode,
                            json: data
                        }).done(function(data) {
                            sucDetail();
                        });
                    } else {
                        alert("无法解析当前地址的经纬度!");
                    }
                });

            })  

            $("#backBtn").hide();  
});