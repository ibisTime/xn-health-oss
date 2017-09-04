$(function() {
	
	var code = getQueryString('code');
	var view = true;
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };    

    // var typeData = {}
    // reqApi({
    //     code:'808007'
    // }).done(function(d) {
                    
    //     d.forEach(function(v,i){
    //         typeData[v.code] = v.name;
    //     })
    // });
	
	var fields = [{
        field: 'mobile',
        title: '登录名(手机号)',
        required: true,
    },{
        field: 'name',
        title: '店铺名称',
        required: true,
    },{
        field: 'legalPersonName',
        title: '法人姓名',
        required: true,
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
        // formatter:Dict.getNameForList("store_level", "808907"),
        afterSet:function(v,data){
            if (data.level =="2") {
                 $("#category").parent(".clearfix").hide();
                 $("#type").parent(".clearfix").hide();
                 $("#rate1").parent(".clearfix").hide();
                 $("#rate2").parent(".clearfix").hide();
            }else if(data.level =="1"){
                $("#category").parent(".clearfix").show();
                 $("#type").parent(".clearfix").show();
                 $("#rate1").parent(".clearfix").show();
                 $("#rate1").parent(".clearfix").show();
            }else if(data.level =="3"){
                $("#category").parent(".clearfix").hide();
                $("#type").parent(".clearfix").hide();                
                $("#rate1").parent(".clearfix").show();
                $("#rate2").parent(".clearfix").hide();
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
        formatter: function(v,data){
            return data.type;
        }
    }, {
        field: 'rate1',
        title: '折扣',
        required: true,
        formatter: function(v,data){
            return data.rate1;
        }        
    }, {
        field: 'rate2',
        title: '分润',
        required: true,
        formatter: function(v,data){
            return data.rate2;
        }        
    }, {
        title: '地址',
        field: "province1",
        type:'select',
        key:"product_location",
        keyCode:'808907',
        required: true,
        type: 'citySelect',
        formatter: function(v, data) {
             province = data.province
             city = data.city;
             area = data.area
            if (data.province == data.area) {
                var res = province + city
            }else{
                var res = province + city +     area;
            }
            return res;
        }        
    }, {
        title: '详细地址',
        field: 'address',
        required: true,
        maxlength: 255,
    }, {
        field: 'bookMobile',
        title: '联系电话',
    }, {
        field: 'smsMobile',
        title: '短信手机号',
    },{
        field: 'userReferee',
        title: '推荐人',
        readonly: view,
        formatter: function(v, data) {
            if(data.referrer){
                userReferee = data.referrer.userId;
                var res1 = data.referrer.kind ;
                var res2 = data.referrer.mobile;
                var level = data.referrer.level ;
                if(res1 && res2){
                    if (res1 == 'f1') {
                        return Dict.getNameForList1("user_level","807706",level)+ '/' +res2
                    }else{
                        return userRefereeType[res1]+ '/' +res2
                    }
                }else{
                   return "-" 
                }                
            }else{
               return "-" 
            }        
        }        
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
		readonly: view
    }, {
        field: 'pdf',
        title: '营业执照',
        type : 'img',
        required: true,
        readonly: view
    }, {
        field: 'advPic',
        title: '广告图',
        type : 'img',
		required: true,
		readonly: view
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
		required: true,
		readonly: view
    }, {
        field: 'description',
        title: '图文描述',
        type: 'textarea',
        required: true,
		readonly: view
    }, {
//      field: 'price1',
//      title: '人民币价',
//      amount: true,
//      formatter: moneyFormat,
//      required: true,
//  }, {
//      field: 'price2',
//      title: '购物币价',
//      amount: true,
//      formatter: moneyFormat,
//      required: true,
//  }, {
//      field: 'price3',
//      title: '钱包币价',
//      amount: true,
//      formatter: moneyFormat,
//      required: true,
//  }, {
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
	
	buildDetail({
		fields: fields,
		code: code,
		view: view,
		detailCode: '808216',
	});  
	
});