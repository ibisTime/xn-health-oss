$(function() {
	
	var code = getQueryString('code');
	var wjCode = getQueryString('wjCode');
	var dc = getQueryString('dc')
	var view = getQueryString('v');
	var storeCode = sessionStorage.getItem('storeCode')
	
	var dc = getQueryString('dc')
	var view = getQueryString('v');
	var pcode;
	var codeInd=0;
	var paramIndex=0;
	
	
	var fields = [{ 
        field: 'type',
        title: '类别',
		type: 'select',
		listCode: "621906",
		required: true,
		view: view,
		params: {
            parentKey: "question_type",
		},
		keyName: 'dkey',
		valueName: 'dvalue',
		view: view,
		// beforeSet:function(){
		// 	if (data.question.type = 0) {
		// 		return data.question.type;
		// 	}else{
		// 		$("#type").hide();
		// 	}
		// }
		formatter: function(v, data) {
            return data.question.type;
        }
    }, {
        field: 'content',
        title: '题目',
        required: true,
        view: view,
        formatter: function(v, data) {
            return data.question.content;
        }
    }, {
        field: 'weight',
        title: '比重',
        required: true,
        maxlength: 250,
        view: view,
        formatter: function(v, data) {
            return data.question.weight;
        }
    }, {
        field: 'orderNo',
        title: '顺序',
        required: true,
        maxlength: 250,
        view: view,
        formatter: function(v, data) {
            return data.question.orderNo;
        }
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		view: view,
		detailCode: '621226',
		addCode: '621220',
		editCode: '621222',
		// afterData: function(d){
//			$("#type").val(d.type);
		// }
		buttons: {},
		beforeSubmit:function(data){
			// if (storeCode){
			// 	data.storeCode = storeCode;
			// }s
			// return data;
		}
	});

	$('#tableList').bootstrapTable({
	    columns: [
	    {
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'content',
        title: '内容',
        required: true,
    }, {
        field: 'score',
        title: '分数',
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
		reqApi({code:'621226',json:{code:code}}).done(function(d){
			pcode = d.code
			$('#tableList').bootstrapTable('prepend', d.optionsList)
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
	        field: 'content',
	        title: '内容',
	        required: true,
	    }, {
	        field: 'score',
	        title: '分数',
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
			fields: [{
	        field: 'content',
	        title: '内容',
	        required: true,
	    }, {
	        field: 'score',
	        title: '分数',
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

		$('#popForm #content').val(selRecords[0].content)
		$('#popForm #score').val(selRecords[0].score)
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
			data.optionsList = $('#tableList').bootstrapTable("getData",{useCurrentPage:true});
			data.wjCode = wjCode;
			reqApi({
				code: code?'621222':'621220',
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