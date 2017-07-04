$(function() {

    var code = getQueryString('code');
    //  var pCode = getQueryString('pCode')
    var typeData = {}

    $(".logo a").attr("href","http://"+OSS.guideBaseUrl);
    $("#partnerLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=05");
    $("#storeLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=f2");
    $("#storeApply").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/store_apply.html");//商户
    $("#houseApply").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/home_apply.html");//名宿
    $("#houseLongin").attr("href","http://oss."+OSS.guideBaseUrl+"/signin.html?kind=11");
    $("#iosDownload").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/IOS.html");
    $("#androidDownload").attr("href","http://oss."+OSS.guideBaseUrl+"/pc/Android.html");

    reqApi({
        code: '807717',
        json: {
            ckey: 'telephone'
        },
        sync: true
    }).then(function(data) {

        $("#tel").text("欢迎致电："+data.note);
    });

    reqApi({
        code: '807717',
        json: {
            ckey: 'time'
        },
        sync: true
    }).then(function(data) {

        $("#time").text("服务时间："+data.note);
    });

     $("#aboutus").on('click',function(){
            reqApi({
            code: '807717',
            json: {
                ckey: 'aboutUs'
            },
            sync: true
        }).then(function(data) {

            $(".banner").html(data.note).find("img").css({"width": "100%","background-size": "cover","margin-top": "-32px"});
        });
    })


    reqApi({
        code:'808007',
        json: {
          companyCode: OSS.companyCode, 
          systemCode: OSS.companyCode  
        }
    }).done(function(d) {
                    
        d.forEach(function(v,i){
            typeData[v.code] = v.name; 
            
        })
    });


    var fields = [  {
        field: 'mobile',
        title: '登录名(手机号)',
        required: true,
    },{
        field: 'legalPersonName',
        title: '法人姓名',
        required: true,
    }
  //   ,{
  //       field: 'level',
  //       title: '商家类型',
  //       type: 'select',
  //       required: true,
  //       keyName: "dkey",
  //       listCode: '808907',
  //       valueName: 'dvalue',
  //       params:{
  //            parentKey: "store_level"
  //       },
  //       // formatter:Dict.getNameForList("store_level", "808907"),
  //       onChange:function(v,data){
  //           if ($("#level_chosen .chosen-single span").text()=="酒店名宿") {
  //                $("#category_chosen").parent(".clearfix").hide();
  //                $("#type_chosen").parent(".clearfix").hide();
  //           }else{
  //               $("#category_chosen").parent(".clearfix").show();
  //                $("#type_chosen").parent(".clearfix").show();
  //           }
  //       }

  //   },{
  //       field: 'category',
  //       title: '大类',
        // type: 'select',
        // listCode: '808007',
        // params: {
        //  type:"2",
        //  // status: '2',
  //           parentCode: 0
        // },
        // keyName: 'code',
        // valueName: 'name',
  //       required: true,
        // onChange:function(v,data){
        //  reqApi({
  //               code: '808007',
  //               json: {
  //                type:"2",
        //          // status: '2',
  //                parentCode: v
  //               },
  //               sync: true
  //           }).done(function(d) {
  //            var data1 = {};
  //            if(d.length && v){
                    
  //                d.forEach(function(v,i){
  //                    data1[v.code] = v.name;
  //                })
  //            }
  //            $("#type").renderDropdown2(data1);

  //           });
        // },
        // afterset: function(v){
        //  console.log("ss");
        // }
  //   }, {
  //       field: 'type',
  //       title: '小类',
        // type: 'select',
        // listCode: '808007',
  //       required: true,
        // params: {
        //  type:2,
        //  // status: '0',
  //           parentCode: $("#category").val()
        // },
        // keyName: 'code',
        // valueName: 'name',
        // formatter: function(v,data){
        //  return data.type;
        // }
    // }
    // , {
    //     title: '折扣',
    //     field: 'rate1',
    //     required: true,
    // }
    ,{
        field: 'name',
        title: '民宿名称',
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
        title: '申请运营商',
        type: 'select',
        required: true,
        listCode: '805060',
         params: {
            start:"1",
            limit:"10",
        },
        keyName: 'userId',
        valueName: 'loginName',

    },{
        field: 'slogan',
        title: '广告语',
        required: true,
    },  {
        title: '民宿缩略图',
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
        } ,
        addCode: '808200',
        beforeSubmit: function(data) {
            data.type = "2";

            return data;
        }
    }
    buildDetail(options);
        $('#subBtn').show().css({"background-color":"#19BF96","margin-left": "280px","margin-top": "50px"})
        $('#backBtn').show().css({"background-color":"#19BF96","margin-left": "100px","margin-top": "50px"})
        $('#backBtn').click(function() {
              goBack();
        });
        
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
                        // data.type = "2";
                        data.updater = "自助申请"
                        data.rate1 = "0";
                        data.rate2 = "0";
                        data.rate3 = "0";
                        data.longitude = point.lng;
                        data.latitude = point.lat;
                        data.category = "FL2017061016211611994528";
                        data.type = "FL2017061219492431865712";
                        data.level = "2";
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