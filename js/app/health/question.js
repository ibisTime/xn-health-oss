$(function () {
    
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
    }, {
        field: 'type',
        title: '类别',
        type: 'select',
        listCode: "621906",
        keyName:'dkey',
        valueName:'dvalue',
    }, {
        field: 'title',
        title: '标题',
        search: true
    }, {
        field: 'summary',
        title: '摘要',
    }, {
        field: 'content',
        title: '内容',
    }, {
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
    

    

    $('#detail2Btn').click(function() {
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
	$('#edit2Btn').click(function() {
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
        
        window.location.href = "problem.html?Code=" + selRecords[0].code+"&pName=" + selRecords[0].name;
    
    });
    
    
});