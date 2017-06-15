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
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
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

    $('#gobackBtn').click(function() {
        goBack();
    });
});