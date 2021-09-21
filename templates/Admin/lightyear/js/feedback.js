function submit_feedback() {
    document.getElementById("feedbackbutton").setAttribute("disabled", true); //设置不可点击
    var mail = feedback.mail.value;
    var feedbackcontent = feedback.feedbackcontent.value;
    http_request = new XMLHttpRequest();
    http_request.onreadystatechange = handle;
    http_request.open("POST", "/feedback.php", true);
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.send('mail=' + mail + '&feedbackcontent=' + encodeURIComponent(feedbackcontent));
}

function handle() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            var text = http_request.responseText;
            var content = JSON.parse(text);
            if (content.code == 200) {
                inform(content.msg);
                $("#feedbackcontent").val('');
            } else {
                inform(content.error, null, null, null, "warning");
            }
        } else {
            inform("服务器错误！", null, null, null, "danger");
        }
        document.getElementById("feedbackbutton").removeAttribute("disabled"); //去掉不可点击
        $('#exampleModalChange').modal('hide');
    }
}