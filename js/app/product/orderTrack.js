$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: "order_status",
        keyCode:'808907',
        formatter: Dict.getNameForList("order_status","808907"),
        search: true,
    },{
        field: 'companyCode',
        title: '商户',
        formatter: function(v, data){
        	return data.store.name
        }
    },{
		field : 'amount1',
		title : '人民币总额',
		formatter: moneyFormat
	},{
		field : 'amount2',
		title : '钱包币总额',
		formatter: moneyFormat
	},{
		field : 'amount3',
		title : '购物币总额',
		formatter: moneyFormat
	},{
        field: 'yunfei',
        title: '运费',
        formatter: moneyFormat,
    },{
        field: 'applyUser',
        title: '下单用户',
        search: true,
        formatter: function(v, data){
        	return data.user.mobile;
        },
		type: 'select',
        search: true,
		pageCode1: '805054',
		params: {
			kind: 'f1',
    		updater: ''
		},
		keyName: 'userId',
		valueName: 'mobile',
		searchName: 'mobile',
    },{
        field: 'applyDatetime',
        title: '下单时间',
        type: "datetime",
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '808065',
//		searchParams:{
//			companyCode: OSS.company
//		}
    });
    
    $("#zjLedgerBtn").click(function(){
		var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "zjLedger.html?refNo=" + selRecords[0].code;
	})
    
});