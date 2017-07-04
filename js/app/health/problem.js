$(function () {

    var code = getQueryString('code');
    var wjCode = getQueryString('wjCode');
    var wTCode
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'content',
        title: '题目',
        required: true,
        formatter: function(v, data) {
            return data.content;
        }
    }
    // , {
    //     field: 'type',
    //     title: '类别',
    //     type: 'select',
    //     listCode: "621906",
    //     keyName:'dkey',
    //     valueName:'dvalue',
    //     params: {
    //         parentKey: "question_type",
    //     },
    //     search: true,
    // }
    , {
        field: 'orderNo',
        title: '顺序',
    }];

    buildList({
        columns: columns,
        searchParams:{
            wjCode:wjCode,
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
                       '<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>'
                       );
    
    $('#addBtn1').click(function() {


        window.location.href = "problem_addedit.html?wjCode="+ wjCode;

    });


	//修改
	$('#edit2Btn1').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "problem_addedit.html?code=" + selRecords[0].code+"&dc="+selRecords[0].companyCode+"&wjCode="+ selRecords[0].wjCode;

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
        
        window.location.href = "problem_detail2.html?code=" + selRecords[0].code+"&v=1&wjCode="+ selRecords[0].wjCode;
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
         reqApi({code:'621221',json:{code:code}}).done(function(res){
             $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
         })
     }
        toastr.info("删除成功");
    })
    
    
});