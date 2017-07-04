$(function() {
	
	var code = getQueryString('code');
	var view = getQueryString('v');
    var wjCode = getQueryString('wjCode');
	
	var fields = [{
        field: 'title',
        title: '标题',
        required: true,
        view: view,
    }, {
        field: 'content',
        title: '结果',
        type: 'textarea',
        normalArea: true,
        required: true,
        view: view,
    }, {
        field: 'minScore',
        title: '最小值',
        required: true,
        view: view,
    }, {
        field: 'maxScore',
        title: '最大值',
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
             data.wjCode = wjCode,
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