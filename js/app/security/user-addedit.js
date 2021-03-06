$(function() {
	
	var code = getQueryString('code');
	var data1 ={
        "SRSysAdmin":'系统管理员',
        "SRSuperAdmin":"超级管理员",
    }	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '01'
	}, {
		title: '用户名',
		field: 'loginName',
		required: true,
		maxlength: 30
	}, {
		title: '角色',
		field: 'roleCode',
		required: true,
		type: 'select',
		data:data1,
		// listCode: '805021',
		// keyName: 'code',
		// valueName: 'name'
	}, 	{
		title: '备注',
		field: 'remark',
		maxlength: 250
	}];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '805056',
		addCode: '805042'
	});
	
});