$(function() {

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        },{
            title: '参数说明',
            field: 'remark',
        }, {
            title: '参数值',
            field: 'cvalue',
            search: true
        }
    ];
    buildList({
        columns: columns,
        pageCode: "802025",
        searchParams: {
            type: "2,3",
            companyCode: OSS.companyCode
        }
    });
});