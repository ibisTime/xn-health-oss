$(function() {

    var code = getQueryString('code');
    //  var pCode = getQueryString('pCode')

    var typeData = {}
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
        // formatter:Dict.getNameForList("store_level", "808907"),
        onChange:function(v,data){
            if ($("#level_chosen .chosen-single span").text()=="酒店名宿") {
                 $("#category_chosen").parent(".clearfix").hide();
                 $("#type_chosen").parent(".clearfix").hide();
            }else{
                $("#category_chosen").parent(".clearfix").show();
                 $("#type_chosen").parent(".clearfix").show();
            }
        }

    },{
        field: 'category',
        title: '大类',
        type: 'select',
        listCode: '808007',
        params: {
            type:"2",
            // status: '2',
            parentCode: 0
        },
        keyName: 'code',
        valueName: 'name',
        required: true,
        onChange:function(v,data){
            reqApi({
                code: '808007',
                json: {
                    type:"2",
                    // status: '2',
                    parentCode: v
                },
                sync: true
            }).done(function(d) {
                var data1 = {};
                if(d.length && v){
                    
                    d.forEach(function(v,i){
                        data1[v.code] = v.name;
                    })
                }
                $("#type").renderDropdown2(data1);

            });
        },
        afterset: function(v){
            console.log("ss");
        }
    }, {
        field: 'type',
        title: '小类',
        type: 'select',
        listCode: '808007',
        required: true,
        params: {
            type:2,
            // status: '0',
            parentCode: $("#category").val()
        },
        keyName: 'code',
        valueName: 'name',
    },{
        field: 'name',
        title: '店铺名称',
        required: true,
    },{
        field: 'mobile',
        title: '登录名(手机号)',
        required: true,
    },{
        field: 'bookMobile',
        title: '预定联系电话',
        required: true,
    },{
        field: 'smsMobile',
        title: '短信手机号',
        required: true,
    },{
        field: 'slogan',
        title: '广告语',
        required: true,
    },  {
        title: '店铺缩略图',
        field: 'advPic',
        type: 'img',
        required: true,
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
                        data['city'] = province;
                        data['area'] = province;
                    } else if (!area) {
                        data['city'] = province;
                        data['area'] = city;
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
                        data.rate1 = "1";
                        data.rate2 = "0";
                        data.rate3 = "0";
                        data.longitude = point.lng;
                        data.latitude = point.lat;
                        data.storeCode = code;
                        if(!data.category){
                            data.category = "FL2017061017094351316235";
                            data.type = "FL2017061219492431865712";
                            data.level = "2";
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