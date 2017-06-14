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
    },{
        field: 'slogan',
        title: '广告语',
        required: true,
    },  {
        title: '店铺缩略图',
        field: 'advPic',
        type: 'img',
        required: true,
    },{
        title: '商家图片',
        field: 'pic',
        type: 'img',
        required: true,
    },{
        field: 'description',
        title: '商家描述',
        required: true,
    }, {
        field: 'price',
        title: '价格',
        amount: true,
        formatter: moneyFormat,
        required: true,
    }, {
        field: 'totalNum',
        title: '当天总数',
        required: true,
    }];

    var options = {
        fields: fields,
        view:view,
        addCode:"808400",
        editCode:"808402",
        detailCode: '808416',
        code:code,
        beforeSubmit:function(data){
            data.userId = getUserId();
            return data;
        }
    };

    buildDetail(options);
    
});