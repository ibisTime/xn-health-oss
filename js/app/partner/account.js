$(function() {
    var view = 1;
    var accountNumberCNY;
    var accountNumberJF;
    reqApi({
        code: '802503',
        json: {
            userId: sessionStorage.getItem('userId')
        }
    }).done(function(data) {
        $("#amount-CNY").text("￥" + data[0].amount / 1000);
        accountNumberCNY = data[0].accountNumber;

        $("#amount-JF").text("￥" + data[1].amount / 1000);
        accountNumberJF = data[1].accountNumber;
    });


    $("#CNYaccoutBtn").click(
        function() {
            window.location.href = 'account_detail.html?accountNumber='+ accountNumberCNY;
        }
    );
    $("#JFaccoutBtn").click(
        function() {
            window.location.href = 'account_detail.html?accountNumber='+ accountNumberJF;
        }
    );

});