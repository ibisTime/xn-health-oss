$(function() {
    var view = 1;

    reqApi({
        code: '802503',
        json: {
            userId: getUserId()
        }
    }).then(function(data) {
        $("#amount-CNY").text("￥" + data[0].amount / 1000);
        $("#amount-JF").text("￥" + data[1].amount / 1000);
    });


    // $("#accoutBtn").click(
    //     function() {
    //         window.location.href = 'account_detail.html?accountNumber=' + accountNumber;
    //     }
    // );
    // $("#accoutPingBtn").click(
    //     function() {
    //         window.location.href = 'account_detail.html?ping=1&accountNumberPing=' + accountNumberPing;
    //     }
    // );
    // $("#accouBtn").click(
    //     function() {
    //         window.location.href = 'account_quxian.html?accountNumber=' + accountNumberPing;
    //     }
    // );
});