$(function () {
    var code = getQueryString('code');
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '商户类别',
        search: true,
    } , {
        field: 'category',
        title: '参与类型',
		type: 'select',
		listCode: '808007',
		params:{
            companyCode: OSS.companyCode,
			type: '2',
			parentCode: '0',
		},
		keyName: 'code',
		valueName: 'name',
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "store_status",
        keyCode:"808907",
        formatter: Dict.getNameForList("store_status","808907"),
        search: true
    } ,{
        field: 'uiOrder',
        title: '序号',
        sortable: true,
    },{
        field: 'uiLocation',
        title: '位置',
        type: 'select',
        key: 'store_location',
        keyCode: '808907',
        formatter: Dict.getNameForList("store_location", "808907"),
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        code: code,
        pageCode: '808215',
        deleteCode:'808011',
		searchParams:{
            storeCode:code,
			companyCode: OSS.companyCode
		},
    });
    
    $('#up2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        if (selRecords[0].status == 3||selRecords[0].status == 2) {
            toastr.info("已上架");
            return;
        }
        
        window.location.href = "productor_up2.html?Code=" + selRecords[0].code;

    });
    
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        if ( selRecords[0].status != 3&&selRecords[0].status != 2 ) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '808205',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });
    
    $('#detail2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "productor_detail2.html?Code=" + selRecords[0].code+"&v=1";
    });
 
     //审核
    $('#examineBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if(selRecords.length==1 && selRecords[0].status == 0){
        	
        	window.location.href = "productor_examine.html?Code=" + selRecords[0].code;
        }else{
        	
	        var dataCode=[]
	        
	        for (var i=0; i<selRecords.length; i++) {
	        	dataCode.push(selRecords[i].code)
	        	
	        	if (selRecords[i].status != 0) {
		            toastr.info("商品"+selRecords[i].name+"状态不能审核!");
		            return;
		        }
	        	
	        }
	        
	        var dw = dialog({
					content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
					'<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量审核</li></ul>'+
					'</form>'
				});
				
			dw.showModal();
			
			buildDetail({
				fields: [],
				container: $('#formContainer'),
				buttons: [{
					title: '通过',
					handler: function() {
						
						var data = [];
						data.codeList = dataCode;
			    		data.approveResult = "1";
			    		data.approver = getUserId();
						reqApi({
							code: '808015',
							json: data
						}).done(function(data) {
							toastr.info("操作成功");
							
							$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
							setTimeout(function(){
								dw.close().remove();
							},500)
						});
						
					}
				}, {
					title: '不通过',
					handler: function() {
						var data = [];
						data.codeList = dataCode;
			    		data.approveResult = "1";
			    		data.approver = getUserId();
						reqApi({
							code: '808015',
							json: data
						}).done(function(data) {
							toastr.info("操作成功");
							$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
							setTimeout(function(){
								dw.close().remove();
							},500)
						});
					}
				}, {
					title: '取消',
					handler: function() {
						dw.close().remove();
					}
				}]
			});
			
			dw.__center();
		}
		
	});

	//修改
	$('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "productor_addedit.html?Code=" + selRecords[0].code+"&dc="+selRecords[0].companyCode;

    });
    
    //产品参数
    $('#productParamBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "productorParam.html?Code=" + selRecords[0].code+"&pName=" + selRecords[0].name;
    });

    $('#revenueBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "revenue.html?Code=" + selRecords[0].code+"&userId="+selRecords[0].owner;

    });
    
});