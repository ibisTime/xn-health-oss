$(function() {
    var userId = getQueryString('userId');

    var fields = [ {
        title: '审核意见',
        field: 'approveNote',
        maxlength: 250,
        required: true,
        readonly: false
    }];


    var buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.approveResult = '1';
                data.userId = userId;
                data.approveUser = getUserName();
                data.divRate = '0';
                reqApi({
                    code: '805183',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.approveResult = '0';
                data.approveUser = getUserName();
                data.codeList = [data.code];
                reqApi({
                    code: '805183',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

});