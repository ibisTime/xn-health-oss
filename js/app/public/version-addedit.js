$(function() {
    var code = getQueryString('code');
    var noteConfig = {
        title: '参数说明',
        field: 'note',
        required: true,
        readonly: true,
    };
    reqApi({
        code: '807716',
        json: {
            id: code
        },
        sync: true
    }).then(function(data) {
        if (data.ckey == "aboutus") {
            noteConfig.type = "textarea";
        } else if (data.ckey == "jfPic") {
            noteConfig.type = "img";
        }
    })

    var fields = [{
        title: '参数键',
        field: 'ckey',
        required: true,
        maxlength: 20,
        type: 'hidden',
    },noteConfig,  {
        title: '参数值',
        field: 'cvalue',
        type: 'textarea',
        normalArea: true,        
        required: true,
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: "807710",
        detailCode: '807716',
        editCode: '807711',
        beforeSubmit:function(data){
            data.note = $("#note").text();
            return data
        }
    });
});