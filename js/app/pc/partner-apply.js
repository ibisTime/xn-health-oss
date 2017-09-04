$(function() {
    
    var userId = getQueryString('userId');
    var loginName = getQueryString('loginName');
    var view = getQueryString('v');
    var level;
    var level1;
    
    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    },{
        title : '登录名/手机号',
        field : 'loginName',
        required: true,
        maxlength: 20,
        readonly: view
    }
    // ,{
    //     title : '手机号',
    //     field : 'mobile',
    //     mobile:true,
    //     required: true,
    //     readonly: view
    // }
    , {
        title: '真实姓名',
        field: 'realName',
        chinese: true,
        required: true,
    }, {
        title: '户籍地址',
        field: "province",
        required: true,
        type: 'citySelect',
    }, {
        title: '管辖地址',
        field: "gxProvince",
        required: true,
        type: 'citySelect1',
    },{
        field: 'userReferee',
        field1: 'tj_mobile',
        title: '推荐人类型',
        type: 'select',
        data: {
            "0": "市/区运营商",
            "1": "VIP会员",
        },
        onChange:function(v,data){
            if(v == "1" ){
                kind = "f1";
                level1 = "1";
            }else{
                kind = "operator";
            }

        reqApi({
                code: '805060',
                json: {
                    kind:kind,
                    start:"1",
                    limit:"10",                    
                    level:level1?level1:"",
                    status:"0"
                },
                sync: true
            }).done(function(d) {
                var data1 = {};

                if(d.list.length ){
                    d.list.forEach(function(d,i){
                        data1[d.userId] = d.loginName;

                    })
                }
                $("#tj_mobile").renderDropdown2(data1);

            });            
        }        

    },{
        field: 'tj_mobile',
        title: '推荐人手机号',
        type: 'select',
        // listCode: '805060',
        // params:{
        //     start:"1",
        //     limit:"10",
        //     userId: userId,          
        // },
        // keyName: 'userId',
        // valueName: 'loginName',        

    }, {
        title: '证件类型',
        field: 'idKind',
        type: 'select',
        key: 'id_kind',
        keyCode: "807706",
        view: view
    },{
        title: '证件号',
        field: 'idNo',
        idCard: true,
        view: view
    }
    // ,{
    //     title : '分成比例',
    //     field : 'divRate',
    //     number:true,
    //     max: 1,
    //     min: 0,
    //     required: true,
    //     view: view
    // }
    , {
        title: '备注',
        field: 'remark',
        maxlength: 250,
        view: view
    }];
    var options = {
        fields: fields,
        code:{
            userId: userId
        },
        addCode: '805180',
        beforeSubmit: function(data){
            if($("#tj_mobile").text()){
                data.userReferee = $("#tj_mobile").val()
            }
            data.divRate = "0";
            data.mobile = $("#loginName").val();
            
            return data;
        }
    }    

    buildDetail(options);
    
    var h ="<br/><p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>初始密码为 888888</p>";
    $(h).insertAfter("#loginName");

        $('#subBtn').show().css({"background-color":"#19BF96","margin-top": "50px"})
        $('#backBtn').show().css({"background-color":"#19BF96","margin-left": "100px","margin-top": "50px"})
        $('#backBtn').click(function() {
              goBack();
        });
        
        $('#subBtn').off("click").click(function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                    var values = [];
                    var imgs = $(el).find('.img-ctn');
                    imgs.each(function(index, img) {
                        values.push($(img).attr('data-src') || $(img).find('img').attr('src'));
                    });
                    data[el.id] = values.join('||');
                });
                if ($('#jsForm').find('#gxProvince')[0]) {
                    var gxProvince = $('#gxProvince').val();
                    var gxCity = $('#gxCity').val();
                    var gxArea = $('#gxArea').val();
                    if (!gxCity) {
                        toastr.info("请补全管辖地址");
                        return
                    } else if (!gxArea) {
                        data['gxArea'] = '-';
                    }
                }

                if ($('#jsForm').find('#province')[0]) {
                    var province = $('#province').val();
                    var city = $('#city').val();
                    var area = $('#area').val();
                    if (!city) {
                        toastr.info("请补全户籍地址");
                        return
                    } else if (!area) {
                        data['city'] = province;
                        data['area'] = city;
                    }
                }                
                for (var i = 0, len = fields.length; i < len; i++) {
                    var item = fields[i];
                    if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                        data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                    } else if (item.emptyValue && !data[item.field]) {
                        data[item.field] = item.emptyValue;
                    } else if (item.readonly && item.pass) {
                        data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                    }
                    if (item.type == 'select' && item.passValue) {
                        data[item.field] = $('#' + item.field).find('option:selected').html();
                    }
                    if (item.type == "checkbox") {
                        data[item.field] = $.isArray(data[item.field]) ? data[item.field].join(",") : data[item.field];
                    }
                }
                data['id'] = data['code'];

                var addr = data.province + data.city + data.area + data.detail;
                var myGeo = new BMap.Geocoder();
                myGeo.getPoint(addr, function(point) {
                    if(point){
                        data.updater = "自助申请"
                        if($("#tj_mobile").text()){
                            data.userReferee = $("#tj_mobile").val()
                        }else{
                            data.userReferee = ""
                        }
                        data.divRate = "0";
                        data.mobile = $("#loginName").val();                        
                        reqApi({
                            code: options.addCode,
                            json: data
                        }).done(function(data) {
                            sucDetail();
                        });       
                    } else {
                        alert("无法解析当前地址的经纬度!");
                    }
                });

            }
        });    
    
});