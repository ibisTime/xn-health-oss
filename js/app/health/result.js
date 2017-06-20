$(function () {
    var code = getQueryString('code');
    var wjCode = getQueryString('wjCode');
    
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'title',
        title: '标题',
        required: true
    }, {
        field: 'content',
        title: '内容',
        required: true
    }, {
        field: 'maxScore',
        title: '最大值',
        required: true
    }, {
        field: 'minScore',
        title: '最小值',
        required: true
    }];

    buildList({
        columns: columns,
        searchParams:{
            companyCode: OSS.companyCode,
            wjCode :wjCode 
        },
        pageCode: '621237',
        deleteCode:'621231',
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
                       '<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>'
                       );
    
    $('#addBtn1').click(function() {
 
        window.location.href = "result_addedit.html?&wjCode="+wjCode;


    });


    //修改
    $('#edit2Btn1').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "result_addedit.html?Code=" + selRecords[0].code+"&dc="+selRecords[0].companyCode;

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
        
        window.location.href = "result_addedit.html?Code=" + selRecords[0].code+"&v=1";

    });


    $('#backBtn').click(function() {
         window.location.href = "question.html?";
    });

    $("#deleteBtn1").click(function(){
        
        var selRecords=$('#tableList').bootstrapTable('getSelections');
        var code = selRecords[0].code;

        if (selRecords.length != 1 ) {
            toastr.info("请选择记录");
            return;
        }
        $('#tableList').bootstrapTable('remove', {
            field:"code",
            values:[selRecords[0].code]
        });
     if(code){
         reqApi({code:'621231',json:{codeList:[selRecords[0].code]}}).done(function(res){
             $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
         })
     }
        toastr.info("删除成功");
    })
    
    
});