$(function() {

    var code = getQueryString('code');
    var level1;


    var fields = [  {
        field: 'mobile',
        title: '登录名/手机号',
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
    // ,{
    //     title: '折扣比例',
    //     field: 'rate1',
    //     required: true,
    // },{
    //     title: '分润比例',
    //     field: 'rate2',
    //     required: true,
    // }
    ,{
        title: '分润比例',
        field: 'rate2',
        required: true,
    },{
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
        title: '推荐人类型',
        type: 'select',
        data: {
            "0": "市/区运营商",
            "1":"VIP会员",
            // "1": "o2o商家",
            // "2":"供应商",
            // "3":"名宿主",
            // "4":"VIP会员",
        },
        onChange:function(v,data){
            if(v == "0" ){
                kind = "operator";
                level1 = ""; 
            }else if (v == "1") {
                // kind = "o2o";
                kind = "f1";
                level1 = "1";                
            }
            // else if (v == "2") {
            //     kind = "supplier";
            // }else if (v == "4") {
            //     kind = "f1";
            //     level1 = "1";
            // }

        reqApi({
                code: '805060',
                json: {
                    kind:kind,
                    start:"1",
                    limit:"10",
                    level:level1?level1:"",
                    status:"0"                    
                },
                sync: true
            }).done(function(d) {
                var data1 = {};

                if(d.list.length ){
                    d.list.forEach(function(d,i){
                        data1[d.userId] = d.loginName;

                    })
                }
                $("#tj_mobile").renderDropdown2(data1);

            });            
        }        

    },{
        field: 'tj_mobile',
        title: '推荐人手机号',
        type: 'select',
        // listCode: '805060',
        // params:{
        //     start:"1",
        //     limit:"10",
        //     userId: userId,          
        // },
        // keyName: 'userId',
        // valueName: 'loginName',        

    },{
        field: 'slogan',
        title: '广告语',
        required: true,
    },{
        title: '营业执照',
        field: 'pdf',
        type: 'img',
        single: true
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
        addCode: '808209',
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

        var h ="<br/><p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>建议上传200×200图片</p>";
        $(h).insertAfter("#advPic"); 
        $(h).insertAfter("#pic");  
        $(h).insertAfter("#pdf");        
        
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
                        // data.type = "2";
                        data.updater = "自助申请"
                        data.rate1 = "0";
                        data.rate3 = "0";
                        data.longitude = point.lng;
                        data.latitude = point.lat;
                        data.category = "FL2017061016211611994528";
                        data.type = "FL2017061219492431865712";
                        data.level = "2";
                        if($("#tj_mobile").text()){
                            data.userReferee = $("#tj_mobile").val()
                        }else{
                            data.userReferee = "";
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