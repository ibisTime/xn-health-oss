$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var kind
    //	var pCode = getQueryString('pCode')
    var userReferee;
    var legalPersonName;
    var typeData = {};
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };     

    reqApi({
        code:'808007'
    }).done(function(d) {
                    
        d.forEach(function(v,i){
            // if (code ="FL2017061016211611994528") {
            //    continue;
            // }else{
                
            // }
            typeData[v.code] = v.name; 
            
        })
    });


    var fields = [ {
        field: 'mobile',
        title: '登录名(手机号)',
        required: true,
        readonly: view
    },{
        field: 'legalPersonName',
        title: '法人姓名',
        required: true,
        readonly: view,
        formatter: function(v,data){
            legalPersonName = data.legalPersonName
            return legalPersonName
        }
    },{
        field: 'name',
        title: '店铺名称',
        required: true,
    }, {
        title: '地址',
        field: "province1",
        type:'select',
        key:"product_location",
        keyCode:'808907',
        required: true,
        type: 'citySelect',
    }, {
        title: '详细地址',
        field: 'address',
        required: true,
        maxlength: 255,
    }, {
        title: '经度',
        field: 'longitude',
        west: true,
        hidden: true
    }, {
        title: "纬度",
        field: 'latitude',
        north: true,
        hidden: true
    },{
        field: 'bookMobile',
        title: '预定联系电话',
        required: true,
    },{
        field: 'smsMobile',
        title: '短信手机号',
        required: true,
    },{
        field: 'userReferee',
        title: '推荐人',
        readonly: view,
        formatter: function(v, data) {
            if(data.referrer){
                userReferee = data.referrer.userId;
                var res1 = data.referrer.kind ;
                var res2 = data.referrer.mobile;
                if(res1 && res2){
                    return userRefereeType[res1]+ '/' +res2
                }else{
                   return "-" 
                }                
            }
            
        }        
    },{
        field: 'slogan',
        title: '广告语',
        required: true,
    },  {
        title: '店铺缩略图',
        field: 'advPic',
        type: 'img',
        required: true,
        single: true
    },{
        title: '商家图片',
        field: 'pic',
        type: 'img',
        required: true,
    },{
        field: 'description',
        title: '商家描述',
        type:'textarea',
        required: true,
    }
    ];

    var options = {
        fields: fields,
        code:{
          code:code,
          companyCode: OSS.companyCode 
        } ,
        detailCode: '808216',
        addCode: '808200',
        editCode: '808208',
        beforeSubmit: function(data) {
            data.companyCode = OSS.companyCode,
            data.type = "2";

            return data;
        }
    }
    buildDetail(options);

        $('#subBtn').off("click").click(function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                    var values = [];
                    var imgs = $(el).find('.img-ctn');
                    imgs.each(function(index, img) {
                        values.push($(img).attr('data-src') || $(img).find('img').attr('src'));
                    });
                    data[el.id] = values.join('||');
                });
                if ($('#jsForm').find('#province')[0]) {
                    var province = $('#province').val();
                    var city = $('#city').val();
                    var area = $('#area').val();
                    if (!city) {
                        toastr.info("请补全地址");
                        return                       
                    }else if (!area) { 
                        if ($('#area').is(":visible")) {
                                // 直辖市
                                toastr.info("请补全地址");
                                return                                                                 
                            }else{
                                data['city'] = province;
                                data['area'] = city;                                                             
                            }                    
                    }
                }
                for (var i = 0, len = fields.length; i < len; i++) {
                    var item = fields[i];
                    if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                        data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                    } else if (item.emptyValue && !data[item.field]) {
                        data[item.field] = item.emptyValue;
                    } else if (item.readonly && item.pass) {
                        data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                    }
                    if (item.type == 'select' && item.passValue) {
                        data[item.field] = $('#' + item.field).find('option:selected').html();
                    }
                    if (item.type == "checkbox") {
                        data[item.field] = $.isArray(data[item.field]) ? data[item.field].join(",") : data[item.field];
                    }
                }
                data['id'] = data['code'];

                var addr = data.province + data.city + data.area + data.detail;
                var myGeo = new BMap.Geocoder();
                myGeo.getPoint(addr, function(point) {
                    if (point) {
                        data.companyCode = OSS.companyCode,
                        // data.userReferee = userId;
                        data.userReferee = sessionStorage.getItem('userId');
                        // data.type = "2";
                        data.level = "2";
                        data.rate1 = "0";
                        data.rate2 = "0";
                        data.rate3 = "0";
                        data.longitude = point.lng;
                        data.latitude = point.lat;
                        data.storeCode = code;
                        data.userReferee = userReferee;
                        data.legalPersonName = legalPersonName;
                        if(!data.category){
                            data.category = "FL2017061016211611994528";
                            data.type = "FL2017061219492431865712";
                            data.level = "2";
                            data.rate1 = "0";
                        }
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

            }
        });

});