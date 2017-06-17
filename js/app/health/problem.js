$(function () {
    
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'wjCode',
        title: '问卷编号',
        
    }, {
        field: 'type',
        title: '类别',
        type: 'select',
        listCode: "621906",
        keyName:'dkey',
        valueName:'dvalue',
        search: true,
    }, {
        field: 'orderNo',
        title: '顺序',
    }];

    buildList({
        columns: columns,
        searchParams:{
            companyCode: OSS.companyCode,
        },
        pageCode: '621227',
        deleteCode:'621221',
    });
    

    $('#addBtn').hide();
    $('#deleteBtn').hide();
    $('#editBtn').hide();
    $('#detailBtn').hide();
    $('#addQuestionBtn').hide();
    $('.toolbar').html('<li style="display:block;" id="addBtn1"><span><img src="/static/images/t01.png"></span>新增</li>'+
                       '<li style="display:block;" id="edit2Btn1"><span><img src="/static/images/t01.png"></span>修改</li>'+
                       '<li style="display:block;" id="deleteBtn1"><span><img src="/static/images/t01.png"></span>删除</li>'+
                       '<li style="display:block;" id="detailBtn1"><span><img src="/static/images/t01.png"></span>详情</li>'+
                       '<li style="display:block;" id="addResultBtn"><span><img src="/static/images/t01.png"></span>添加结论</li>');
    $('#addBtn1').click(function() {
        
        window.location.href = "problem_addedit.html?";

    });


	//修改
	$('#edit2Btn1').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "problem_addedit.html?Code=" + selRecords[0].code+"&dc="+selRecords[0].companyCode;

    });

    $('#detailBtn1').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length>1) {
            toastr.info("不能多选");
            return;
        }
        
        window.location.href = "problem_addedit.html?Code=" + selRecords[0].code+"&v=1";
    });

    $('#addResultBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "problem.html?Code=" + selRecords[0].code+"&pName=" + selRecords[0].name;
    
    });
    
    
});