$(function() {

    var code = getQueryString('code');
    //	var pCode = getQueryString('pCode')

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    },{
        field: 'category',
        title: '大类',
		type: 'select',
		listCode: '808007',
        required: true,
		params: {
			type:"2",
			// status: '2',
            parentCode: 0
		},
		keyName: 'code',
		valueName: 'name',
		// hidden: view,
		onChange:function(v,data){
			reqApi({
                code: '808007',
                json: {
                    companyCode: OSS.companyCode,
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
		params: {
			type:2,
			// status: '0',
            parentCode: $("#category").val()
		},
		keyName: 'code',
		valueName: 'name',
		required: true,
		// formatter: function(v,data){
		// 	return data.type;
		// }
    }
    // , {
    //     title: '大类',
    //     field: 'parentCode',
    //     required: true,
    //     type: 'select',
    //     listCode: '808007',
    //     params: {
            // companyCode: OSS.companyCode,
    //         type: "2",
    //         parentCode: 0
    //     },
    //     keyName: 'code',
    //     valueName: 'name',
    //     defaultOption: '选此创建种类',
    // }
    , {
        field: 'name',
        title: '店铺名称',
        required: true,
    }, {
        field: 'level',
        title: '店铺等级',
        type:'select',
        data:{
                "1": "普通商家",
                "2": "理财型商家",
        },
        required: true,
    }
    // , {
    //     field: 'type',
    //     title: '标签',
    //     required: true,
    // }
    ,{
        field: 'slogan',
        title: '广告语',
        required: true,
    },  {
        title: '店铺缩略图',
        field: 'advPic',
        type: 'img'
    },{
        title: '商家图片',
        field: 'pic',
        type: 'img'
    },{
        field: 'description',
        title: '商家描述',
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
        field: 'mobile',
        title: 'B端用户手机号',
        required: true,
    }
    // ,{
    //     field: 'userReferee',
    //     title: '店铺推荐人手机号',
    //     required: true,
    // }
    , {
        field: 'uiOrder',
        title: '次序',
        required: true,
        number: true,
        sortable: true,
    },{
        field: 'uiLocation',
        title: '位置',
        type: 'select',
        key: 'store_location',
        keyCode: '808907',
        formatter: Dict.getNameForList("store_location", "808907"),
    }];

    var options = {
        fields: fields,
        code:{
          code:code,
          companyCode: OSS.companyCode 
        } ,
        detailCode: '808216',
        addCode: '808200',
        editCode: '808203',
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
                        data.userReferee = 'SYS_USER_JKEG';
                        // data.type = "2";
                        data.rate1 = "1";
                        data.rate2 = "0";
                        data.rate3 = "0";
                        data.level = "1";
                        data.longitude = point.lng;
                        data.latitude = point.lat;
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