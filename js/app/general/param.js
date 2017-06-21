$(function() {



    var columns = [{
            field: '',
            title: '',
            checkbox: true
        },{
            field: 'cvalue',
            title: '参数说明'
        },{
            field: 'note',
            title: '参数值',
            search: true
        }, {
            field: 'remark',
            title: '备注'
        }
    ];
    buildList({
        router: 'param',
        columns: columns,
        pageCode: '807715'
    });
});