$(function() {
    var code;
    reqApi({
        code: "807717",
        json: {
            ckey: "jfPic"
        },
        sync: true
    }).then(function(data) {
        code = data.id;
        src = data.note;
    });

    var fields = [{
        title: '入口广告图',
        field: 'note',
        type: "img",
    }, {
        field: 'cvalue',
        value: "入口广告图",
        type: 'hidden'
    }, {
        field: "id",
        value: code,
        hidden: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '807716',
        buttons: [{
            title: "确定",
            handler: function() {
                if ($('#jsForm').valid()) {
                    // var data =  $('#jsForm').serializeObject();
                    // data["cvalue"] = $("#cvalue").val();
                    // data["id"] = $("#id").val();
                    // data["note"] = $("#note img").val();
                    // if(data.note){
                    //     data["note"] = $("#note img").val();
                    // }else{
                    //     data["note"] = $("#note img").attr("src");
                    // }
                    var data = $('#jsForm').serializeObject();
                    $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                        var values = [];
                        var imgs = $(el).find('.img-ctn');
                        imgs.each(function(index, img) {
                            values.push($(img).attr('data-src') || $(img).find('img').attr('data-src'));
                        });
                        data[el.id] = values.join('||');
                    });
                    reqApi({
                        code: "807711",
                        json: data
                    }).done(function() {
                        toastr.info("操作成功");
                    });
                }
            }
        }]
    };
    buildDetail(options);


});