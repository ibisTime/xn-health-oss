$(function() {
	
	var code = getQueryString('code');
	var view = getQueryString('v');
	
	var fields = [{
        field: 'wjCode',
        title: '问卷编号',
        required: true,
        view: view,
        formatter:function(v,data){
            return data.code
        }
    }, {
        field: 'title',
        title: '标题',
        required: true,
        view: view,
    }, {
        field: 'content',
        title: '内容',
        type: 'textarea',
        required: true,
        view: view,
    }, {
        field: 'maxScore',
        title: '最大值',
        required: true,
        view: view,
    }, {
        field: 'minScore',
        title: '最小值',
        required: true,
        view: view,
    }];
	 
	buildDetail({
		fields: fields,
		code: code,
        view: view,
		detailCode: '621236',
		addCode: '621230',
		editCode: '621232',
		beforeSubmit: function(data) {
             data.verdictList = [{
                title : $("#title").val(),
                content : $("#content").val(),
                maxScore : $("#maxScore").val(),
                minScore : $("#minScore").val(),
            }];

            return data;
        },
	});


});