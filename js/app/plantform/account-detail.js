$(function() {
    var accountNumber = getQueryString('accountNumber');
    // var accountNumberPing = getQueryString('accountNumberPing');
    // var isPing = getQueryString('ping');
    // var accountNumberValue = isPing ? accountNumberPing : accountNumber;

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: "realName",
            title: "用户名"
        },
        {
            field: 'channelType',
            title: '渠道类型',
            type: "select",
            key: "channel_type",
            keyCode:"802006",
            formatter: Dict.getNameForList("channel_type","802006"),
            search: true,
        },{
            field: 'bizType',
            title: '业务类型',
            key: "biz_type",
            type: "select",
            keyCode: "802006",
            formatter: Dict.getNameForList('biz_type',"802006"),
            search: true,
        }, {
            field: 'status',
            title: '流水状态',
            type: 'select',
            key: "jour_status",
            keyCode: "802006",
            formatter: Dict.getNameForList("jour_status","802006"),
            search: true
        }, {
            field: 'transAmount',
            title: '变动金额',
            formatter: moneyFormat
        }
        // , {
        //     field: 'createDatetime',
        //     title: '创建时间',
        //     formatter: dateTimeFormat,
        //     search: true,
        // }
        ,{
            title: "创建时间",
            field: "createDatetime",
            formatter: dateTimeFormat,
            field1: 'dateStart',
            title1: '创建时间',
            type1: 'date',
            field2: 'dateEnd',
            type2: 'date',   
            twoDate: true,         
            search: true                      
        }, {
            field: 'bizNote',
            title: "备注"
        }
    ];

    buildList({
        columns: columns,
        pageCode: '802520',
        searchParams: {
            companyCode: OSS.companyCode,
            userId: accountNumber ? "" : getUserId(),
            accountNumber: accountNumber,
        }
    });

    
    $('.tools .toolbar').html('<li style="display:block;" id="exportBtn"><span><img src="/static/images/t01.png"></span>导出</li>')
    $('#exportBtn').click(function() {
        $('.export .btn').click();
    });

    $('#gobackBtn').click(function() {
        goBack();
    }); 
           
});