$(function() {

    

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '食物名称',
        required: true,
        maxlength: 32,
        search: true
    }, {
        field: 'type',
        title: '类别',
        type: "select",
        listCode: "621906",
        keyName:'dkey',
        valueName:'dvalue',
        params:{
            parentKey: "calorie_kind",
        },
        search: true
    }, {
        field: 'calorie',
        title: '每100克卡路里的含量'
    }, {
        field: 'orderNo',
        title: "次序"
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 250
    }];
    buildList({
        columns: columns,
        pageCode: '621115',
        deleteCode: '621111'
    });

});