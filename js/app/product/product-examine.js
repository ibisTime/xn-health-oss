$(function() {
	
	var code = getQueryString('code');
	var view= 1;
	var typeData = {}
	reqApi({
		code:'808007'
	}).done(function(d) {
            		
		d.forEach(function(v,i){
			typeData[v.code] = v.name;
		})
    });

	var rollbackNoteField = {
		title: '意见说明',
		field: 'approveNote',
		maxlength: 250,
		readonly: false
	};
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	}, {
        field: 'companyCode',
        title: '商户',
        formatter: function(v ,data){
        	return data.store.name
        }
    }, {
        field: 'name',
        title: '商品名称',
        required: true,
        maxlength: 20
    },{
        field: 'parentCode',
        title: '大类',
		type: 'select',
		listCode: '808007',
        readonly: view,
		data: typeData,
		keyName: 'code',
		valueName: 'name',
    }, {
        field: 'type',
        title: '小类',
		type: 'select',
		listCode: '808007',
        readonly: view,
		data: typeData,
		keyName: 'code',
		valueName: 'name',
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
        maxlength: 250,
    }, {
        field: 'advPic',
        title: '广告图',
        type : 'img',
        single: true,
		required: true
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
		required: true
    }, {
        title: '商品详述',
        field: 'description',
        required: true,
        maxlength: 255,
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
        field: 'orderNo',
        title: '序号',
        required: true,
    }, {
        field: 'remark',
        title: '备注',
    }, rollbackNoteField];
	
	
	var options = {
        fields: fields,
		view: true,
		code: code,
		detailCode: '808026',
		buttons:[{
			title:"通过",
		},{
			title:"不通过",
		},{
			title:"返回",
		}]
    };

    buildDetail(options);
    
    //通过
    $("#btn-0").click(function(){
    	setExamine("1");
    })
    
    //不通过
    $("#btn-1").click(function(){
    	setExamine("0");
    })
    
    //返回
    $("#btn-2").click(function(){
    	goBack();
    })
    
    function setExamine(a){
    	var data = $('#jsForm').serializeObject();
    	var dataCode=[]
    	dataCode.push(data.code)
		data.code='';
		data.codeList = dataCode;
		data.approveResult = a;
		data.approver = getUserId();
    		
    	reqApi({
            code: '808015',
            json: data
        }).then(function() {
            sucDetail();
        });
    }
	
});