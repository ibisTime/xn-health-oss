$(function() {
    var view = 1;
    var accountNumberCNY;
    // var accountNumberJF;
    reqApi({
        code: '802503',
        json: {
            userId: getUserId()
        }
    }).then(function(data) {
        $("#amount-CNY").text("￥" + data[0].amount / 1000);
        accountNumberCNY = data[0].accountNumber;

    });


    $("#CNYaccoutBtn").click(
        function() {
            window.location.href = 'account_detail.html?accountNumber=' + accountNumberCNY;
        }
    );

});