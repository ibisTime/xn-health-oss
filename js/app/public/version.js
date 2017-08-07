$(function() {



    var columns = [{
            field: '',
            title: '',
            checkbox: true
        },{
            field: 'note',
            title: '参数说明',
            search: true
        },{
            field: 'cvalue',
            title: '参数值'
        }
    ];
    buildList({
        router: 'version',
        columns: columns,
        searchParams:{
            type:"3"
        },
        pageCode: '807715'
    });
});