$(function () {
    var dictData;
    reqApi({
        code: "621906",
        sync: true
    }).then(function(data){
        dictData = data;
    })
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'kind',
        title: '类别',
        type: 'select',
        listCode: "621906",
        keyName:'dkey',
        valueName:'dvalue',
        params: {
            parentKey: "questionare_kind",
        },
        search: true,
            
    }, {
        field: 'type',
        title: '分类',
        formatter: function(v, data){
            if(v == "0"){
                return "-";
            }
            var result = dictData.filter(function (d) {
                return d.parentKey == data.kind;
            }).filter(function (d) {
                return d.dkey == v;
            })
            return result.length ? result[0].dvalue : "-";
        }
    }, {
        field: 'title',
        title: '标题',
        search: true,
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        listCode: "621906",
        keyName:'dkey',
        valueName:'dvalue',
        params: {
            parentKey: "questionare_status",
        },
        search: true,
    } ,{
        field: 'orderNo',
        title: '顺序',
    }];

    buildList({
        columns: columns,
        searchParams:{
            companyCode: OSS.companyCode,
        },
        pageCode: '621207',
        deleteCode:'621201',
    });
    

    

    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "question_detail2.html?Code=" + selRecords[0].code+"&v=1";
    });
 

	//修改
	$('#edit2Btn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "question_addedit.html?Code=" + selRecords[0].code+"&dc="+selRecords[0].companyCode;

    });

    $('#addQuestionBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status == 1) {
            toastr.info("请先下架");
            return;
        }

        window.location.href = "problem.html?code=" + selRecords[0].code+"&pName=" + selRecords[0].name+"&wjCode="+selRecords[0].code;

    
    });

    
    $('#addResultBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status == 1) {
            toastr.info("请先下架");
            return;
        }
        
        window.location.href = "result.html?Code=" + selRecords[0].code+"&pName=" + selRecords[0].name+"&wjCode="+selRecords[0].code;

    
    });
    
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        if (selRecords[0].status == 1) {
            toastr.info("已上架");
            return;
        }
        
        confirm("确认上架？").then(function() {
            reqApi({
                code: '621203',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        },function(){});

    });
    
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        if (selRecords[0].status != 1) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '621203',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        },function(){});

    });
    
});