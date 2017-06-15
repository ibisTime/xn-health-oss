$(function() {
    var view = 1;
    var accountNumber;
    var accountNumberJF;

    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER
        }
    }).then(function(data) {
        $("#amount1-CNY").text("￥" + data[0].amount / 1000);
        accountNumberCNY = data[0].accountNumber;

        $("#amount1-JF").text("￥" + data[1].amount / 1000);
        accountNumberJF = data[1].accountNumber;
    });


    reqApi({
        code: '802503',
        json: {
            userId: "SYS_USER_JKEG_TG"
        }
    }).then(function(data) {
        $("#amount-CNY").text("￥" + data[0].amount / 1000);
        accountNumberTg = data[0].accountNumber;
    });

    $("#CNYaccoutBtn").click(
        function() {
            window.location.href = 'account_detail.html?accountNumber=' + accountNumberCNY;
        }
    );
    $("#JFaccoutBtn").click(
        function() {
            window.location.href = 'account_detail.html?accountNumber=' + accountNumberJF;
        }
    );
    $("#accoutBtn").click(
        function() {
            window.location.href = 'account_detail.html?accountNumber=' + accountNumberTg;
        }
    );
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