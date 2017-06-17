$(function() {
	
	var code = getQueryString('code');
	
	reqApi({
		code:'808066',
		json:{
			code:code
		}
	}).done(function(data){
		
		//订单编号
		$("#orderCode").text(data.code);
		//订单状态
		$("#status").text(Dict.getNameForList1("order_status","808907",data.status));
		//下单用户
		$("#applyUser").text(data.applyUser);
		//下单说明
		$("#applyNote").text(data.applyNote);
		//下单时间
		$("#applyDatetime").text(dateTimeFormat(data.applyDatetime));
		//购买数量
		$("#quantity").text(data.quantity);
		//已支付人民币总额
		$("#payAmount1").text(moneyFormat(data.payAmount1));
		//已支付购物币总额
		$("#payAmount2").text(moneyFormat(data.payAmount2));
		//已支付钱包币总额
		$("#payAmount3").text(moneyFormat(data.payAmount3));
		//运费
		$("#yunfei").text(moneyFormat(data.yunfei));
		
		
		//商品名称
		$("#name").text(data.product.name);
		//规格名称
		$("#paramName").text(data.productName);
		//人民币总额
		$("#amount1").text(moneyFormat(data.amount1));
		//购物币总额
		$("#amount2").text(moneyFormat(data.amount2));
		//钱包币总额
		$("#amount3").text(moneyFormat(data.amount3));
//		//重量（kg）
//		$("#weight").text(data.productSpecs.weight);
//		//发货地
//		$("#province").text(data.productSpecs.province);
		
		
		//收货人姓名
		$("#receiver").text(data.receiver);
		//收件人电话
		$("#reMobile").text(data.reMobile);
		//收货地址
		$("#reAddress").text(data.reAddress);
		//发货人
		$("#deliverer").text(data.deliverer);
		//发货时间
		$("#deliveryDatetime").text(dateTimeFormat(data.deliveryDatetime));
		//物流编号
		$("#logisticsCode").text(data.logisticsCode);
		//物流公司
		$("#logisticsCompany").text(Dict.getNameForList1("kd_company","808907",data.logisticsCompany));
		//备注
		$("#remark").text(data.remark);
		
	})
	
	
});