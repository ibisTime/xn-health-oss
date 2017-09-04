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
    var remarkField = {
        title: '审核说明',
        field: 'approveNote',
        maxlength: 250,
        readonly: false,
        formatter:function(v,data){
           return  data.approveNote
        }         
    };

    var examineList = [remarkField]   
    var buttons = [{
                    title: '通过',
                    handler: function() {

                        var data = $('#popForm').serializeObject();
                        data.approveResult = '1';
                        data.storeCodeList = [code];
                        data.approver = getUserName();
                        data.remark = $("#approveNote").val();
                        reqApi({
                            code: '808202',
                            json: data
                        }).done(function(data) {
                            sucDetail();
                        });

                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        var data = [];
                        data.approveResult = '0';
                        data.storeCodeList = [code];
                        data.approver = getUserName();
                        // data.divRate = '0';
                        data.remark = $("#approveNote").val();
                        reqApi({
                            code: '808202',
                            json: data
                        }).done(function(data) {
                            sucDetail();
                        });
                    }
                }, {
                    title: '返回',
                    handler: function() {
                        goBack();
                    }
                }];	

	var fields = [{
        field: 'loginName',
        title: '登录名(手机号)',
        required: true,
        formatter: function(v, data) {
            return  data.user.loginName
        },
    },{
        field: 'legalPersonName',
        title: '法人姓名',
        required: true,
    }
   ,{
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
            if (data.category =="FL2017061016211611994528") {
                 $("#category").parent(".clearfix").hide();
                 $("#type").parent(".clearfix").hide();
                 $("#rate1").parent(".clearfix").hide();
            }else{
                $("#category").parent(".clearfix").show();
                 $("#type").parent(".clearfix").show();
                 $("#rate1").parent(".clearfix").show();
            }
        }

    }
    // ,{
    //     field: 'category',
    //     title: '大类',
    //     type: 'select',
    //     listCode: '808007',
    //     params: {
    //         type:"2",
    //         // status: '2',
    //         parentCode: 0
    //     },
    //     keyName: 'code',
    //     valueName: 'name',
    //     required: true,
    //     onChange:function(v,data){
    //         reqApi({
    //             code: '808007',
    //             json: {
    //                 type:"2",
    //                 // status: '2',
    //                 parentCode: v
    //             },
    //             sync: true
    //         }).done(function(d) {
    //             var data1 = {};
    //             if(d.length && v){
                    
    //                 d.forEach(function(v,i){
    //                     data1[v.code] = v.name;
    //                 })
    //             }
    //             $("#type").renderDropdown2(data1);

    //         });
    //     },
    //     afterset: function(v){
    //         console.log("ss");
    //     }
    // }, {
    //     field: 'type',
    //     title: '小类',
    //     type: 'select',
    //     listCode: '808007',
    //     required: true,
    //     params: {
    //         type:2,
    //         // status: '0',
    //         parentCode: $("#category").val()
    //     },
    //     keyName: 'code',
    //     valueName: 'name',
    //     formatter: function(v,data){
    //         return data.type;
    //     }
    // }
    // , {
    //     title: '折扣',
    //     field: 'rate1',
    //     required: true,
    // }
    , {
        field: 'name',
        title: '商话名称',
        required: true,
    },{
        title: '分润',
        field: 'rate2',
        required: true,
        readonly: view
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
        field: 'slogan',
        title: '广告语',
        required: true,
		readonly: view
    },{
        title: '营业执照',
        field: 'pdf',
        type: 'img',
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
        field: 'uiOrder',
        title: '次序',
        required: true,
        number: true,
        sortable: true,
    }, {
        field: 'remark',
        title: '备注',
        readonly: view
    }];

	fields = fields.concat(examineList)
    
	buildDetail({
		fields: fields,
		code: code,
		view: view,
        buttons: buttons,
		detailCode: '808216',
	});
	
});