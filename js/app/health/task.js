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
        field: 'summary',
        title: '备注',
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 250
    }];
    buildList({
        router: 'task',
        columns: columns,
        pageCode: '621155',
        deleteCode: '621151'

    });

});