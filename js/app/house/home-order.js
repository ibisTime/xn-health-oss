$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
		title: '大类',
		field: 'type',
        type:"hidden",
        value:"FL2017061016211611994528",
        // readonly: true,

	}, {
        field: 'name',
        title: '房间名称',
        required: true,
    }, {
        title: "预定时间起",
        field: "startDate",
        formatter: dateTimeFormat
    }, {
        field: 'endDate',
        title: '预定时间止',
        formatter: dateTimeFormat
    }, {
        field: 'reName',
        title: '入住人',
        required: true,
    }, {
        field: 'reMobile',
        title: '入住人电话',
        required: true,
    }, {
        field: 'applyUser',
        title: '下单人',
        required: true,
    }, {
        field: 'applyNote',
        title: '申请备注',
        required: true,
    }];

    var options = {
        fields: fields,
        view:view,
        addCode:"808450",
        productCode:code,
        beforeSubmit:function(data){
            data.userId = getUserId();
            return data;
        }
    };

    buildDetail(options);
    
});