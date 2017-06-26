$(function() {
	
	var code = getQueryString('code');
	var dc = getQueryString('dc')
	var view = getQueryString('v');
	var storeCode = sessionStorage.getItem('storeCode')
	
	var dc = getQueryString('dc')
	var view = getQueryString('v');
	var pcode;
	var codeInd=0;
	var paramIndex=0;
	
	var provinceData=[];
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	},{
        field: 'storeCode',
		type: 'hidden',
		value: storeCode?storeCode : getUserId(),
    }, {
        field: 'category',
        title: '大类',
		type: 'select',
		listCode: '808007',
        required: true,
		params: {
			// type:"1",
			status: '1',
            parentCode: 0
		},
		keyName: 'code',
		valueName: 'name',
		// hidden: view,
		view:view,
		onChange:function(v,data){
			reqApi({
                code: '808007',
                json: {
					status: '1',
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
			type:1,
			status: '1',
            parentCode: $("#category").val()
		},
		keyName: 'code',
		valueName: 'name',
		required: true,
		view:view,
//		formatter: function(v,data){
//			return data.type;
//		}
    }, {
        field: 'name',
        title: '商品名称',
        view:view,
        required: true,
        maxlength: 20
    }, {
        field: 'slogan',
        title: '广告语',
        view:view,
        required: true,
        maxlength: 250,
    }, {
        field: 'advPic',
        title: '广告图',
        type : 'img',
        view:view,
        single: true,
		required: true
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
        view:view,
		required: true
    }, {
        title: '商品详述',
        field: 'description',
        type: 'textarea',
        required: true,
        view:view,
    },{
        field: 'remark',
        title: '备注',
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		view:view,
		detailCode: '808026',
		addCode: '808010',
		editCode: '808012',
		// afterData: function(d){
//			$("#type").val(d.type);
		// }
		buttons: {},
		beforeSubmit:function(data){
			if (!storeCode){
				data.storeCode = storeCode;
			}
			return data;
		}
	});

	$('#tableList').bootstrapTable({
	    columns: [{
		field : '',
		title : '',
		checkbox : true
	}, {
        field: 'name',
        title: '规格名称',
        required: true,
    }, {
        field: 'originalPrice',
        title: '市场参考价',
        amount: true,
        required: true,
        formatter: moneyFormat,
    }, {
	    field: 'price1',
	    title: '人民币价',
	    amount: true,
	    required: true,
	    formatter: moneyFormat,
    }, {
		field: 'quantity',
		title: '库存',
		required: true,
	}, {
		field: 'orderNo',
		title: '序号',
		required: true,
	}],
		singleSelect: true,//禁止多选
		clickToSelect: true,//自动选中
		uniqueId: 'id',
		onClickRow : function(row, $element) {
		    paramIndex = $element.data('index')
		}
	});
	
	if(code){
		reqApi({code:'808026',json:{code:code}}).done(function(d){
			pcode = d.code
			$('#tableList').bootstrapTable('prepend', d.productSpecsList)
		})
		
	}

	//添加
	$("#addBtn").click(function(){
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});

		dw.showModal();
		buildDetail({
			fields: [ {
	        field: 'name',
	        title: '规格名称',
	        required: true,
	    }, {
	        field: 'originalPrice',
	        title: '市场参考价',
	        amount: true,
	        required: true,
	        formatter: moneyFormat,
	    }, {
		    field: 'price1',
		    title: '人民币价',
		    amount: true,
		    required: true,
		    formatter: moneyFormat,
	    }, {
			field: 'quantity',
			title: '库存',
			required: true,
		}, {
			field: 'orderNo',
			title: '序号',
			required: true,
		}],
				container: $('#formContainer'),
				buttons: [{
					title: '保存',
					handler: function() {
						
						if ($('#popForm').valid()) {
							var data = $('#popForm').serializeObject();
	//						data.id= $('#tableList').bootstrapTable('getData').length+1;
					        
	//				        if(code){
	//				        	data.productCode=pcode;
	//				        	reqApi({code:'808030',json:data}).done(function(res){
	//				        		data.code = res.code
	//				        		$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
	//				        	})
	//				        }else{
					        	data.code = codeInd++;
	//				        }
					        
					        $('#tableList').bootstrapTable('insertRow',{
					        	index:data.code,
					        	row:data
					  		});
					        toastr.info("添加成功");
							dw.close().remove();
						}
					}
				}, {
					title: '取消',
					handler: function() {
						dw.close().remove();
					}
				}]
			});
			dw.__center();
		})

	//删除
	$("#deleteBtn").click(function(){
        
        var selRecords=$('#tableList').bootstrapTable('getSelections');
        
        if (selRecords.length != 1 ) {
            toastr.info("请选择记录");
            return;
        }
        $('#tableList').bootstrapTable('remove', {
        	field:"code",
        	values:[selRecords[0].code]
        });
//      if(code){
//      	reqApi({code:'808031',json:{code:selRecords[0].code}}).done(function(res){
//      		$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
//      	})
//      }
        toastr.info("删除成功");
	})

	$("#edit2Btn").click(function(){
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		
		 if (selRecords.length != 1 ) {
            toastr.info("请选择记录");
            return;
        }
		
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		buildDetail({
			fields: [ {
	        field: 'name',
	        title: '规格名称',
	        required: true,
	    }, {
	        field: 'originalPrice',
	        title: '市场参考价',
	        amount: true,
	        required: true,
	        formatter: moneyFormat,
	    }, {
		    field: 'price1',
		    title: '人民币价',
		    amount: true,
		    required: true,
		    formatter: moneyFormat,
	    }, {
			field: 'quantity',
			title: '库存',
			required: true,
		}, {
			field: 'orderNo',
			title: '序号',
			required: true,
		}],
			container: $('#formContainer'),
			buttons: [{
				title: '保存',
				handler: function() {
					
					if ($('#popForm').valid()) {
						var data = $('#popForm').serializeObject();
						
//				        if(code){
//				        	data.code = selRecords[0].code
//				        	reqApi({code:'808032',json:data}).done(function(res){
//				        		
//				        		$('#tableList').bootstrapTable('updateRow', {
//						        	index:paramIndex,
//						        	row:data
//						        })
//				        		toastr.info("修改成功");
//				        		$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
//				        	})
//				        }else{
				        	$('#tableList').bootstrapTable('updateRow', {
					        	index:paramIndex,
					        	row:data
					        })
			        		toastr.info("修改成功");
			        		$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
//				        }
				        
						dw.close().remove();
					}
				}
			}, {
				title: '取消',
				handler: function() {
					dw.close().remove();
				}
			}]
		});

		$('#popForm #name').val(selRecords[0].name)
		$('#popForm #originalPrice').val(moneyFormat(selRecords[0].originalPrice))
		$('#popForm #price1').val(moneyFormat(selRecords[0].price1))
		$('#popForm #quantity').val(selRecords[0].quantity)
		$('#popForm #orderNo').val(selRecords[0].orderNo)
		
		dw.showModal();
		dw.__center();
	})

	$('#sub1Btn').off("click").click(function() {
		
		if ($('#jsForm').valid()) {
			var data = $('#jsForm').serializeObject();
			$('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
				var values = [];
				var imgs = $(el).find('.img-ctn');
				imgs.each(function(index, img) {
					values.push($(img).attr('data-src') || $(img).find('img').attr('data-src'));
				});
				data[el.id] = values.join('||');
			});
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
			}
			data['id'] = data['code'];
			data.productSpecsList = $('#tableList').bootstrapTable("getData",{useCurrentPage:true});
			
			reqApi({
				code: code?'808012':'808010',
				json: data
			}).done(function(data) {
				sucDetail();
			});

		}
	});

	$('#back1Btn').off("click").click(function() {
		goBack();
	});


});