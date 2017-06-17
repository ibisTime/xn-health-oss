$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "任务名称",
        field: "name",
        search: true
    }, {
        title: "顺序",
        field: "orderNo",
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 250
    }];
    buildList({
        router: 'task',
        columns: columns,
        pageCode: '621157',
        deleteCode: '621151'

    });

});