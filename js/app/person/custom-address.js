$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var userRefereeType = {
        "operator": "市/区运营商",
        "o2o": "o2o商家",
        "supplier":"供应商",
        "mingsu":"民宿主",
        "f1":"VIP会员",
    };    

    
    var fields = [
    {
        title: "地址",
        field: "province",
        type:'citySelect',
        required: true,
        getData: function (data) {
            return data.userExt || {};
        },     
        require: true
    },{
        title: "详细地址",
        field: "address",
        formatter:function(v,data){
           return data.userExt.address         
        },        
        require: true
    }];
    
    buildDetail({
        fields: fields,
        code:{
            userId:userId
        },
        detailCode: "805056",
        editCode: '805186',
        beforeSubmit: function(data){
            data.userId = userId;
            
            return data;
        }
    });
});