$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }
    // , {
    //     field: 'code ',
    //     title: '关键词编号',
    //     formatter:function(v,data){
    //         return data.code
    //     }
    // }
    , {
        field: 'word',
        title: '关键词',
        search: true,
        formatter:function(v,data){
            return data.word
        }
    }
    // , {
    //     field: 'weight ',
    //     title: '权重',
    //     formatter:function(v,data){
    //         return data.weight
    //     }
    // }, {
    //     field: 'level ',
    //     title: '作用等级',
    //     formatter:function(v,data){
    //         return data.level
    //     }
    // }, {
    //     field: 'reaction ',
    //     title: '反应',
    //     formatter:function(v,data){
    //         return data.reaction
    //     }
    // }
    , {
        field: 'updater  ',
        title: '更新人',
        formatter:function(v,data){
            return data.updater
        }
    }, {
        field: 'updateDatetime  ',
        title: '更新时间',
        formatter:function(v,data){
            return dateTimeFormat(data.updateDatetime)
        }
    }, {
        title: 'remark ',
        field: '备注',
        formatter:function(v,data){
            return data.remark
        }
    }];

    buildList({
        router: "keyWord",
        columns: columns,
        pageCode: "621005",
        deleteCode: '621001',
        searchParams: {
            companyCode: OSS.companyCode
        },

    });

 

    $('#editBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "keyWord_addedit.html?Code=" + selRecords[0].code+"&dc="+selRecords[0].companyCode;

    });

})