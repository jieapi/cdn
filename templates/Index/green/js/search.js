
/*搜索开始*/
// 是否搜索
var isSearch = true;
// 监听输入
$("#api-search").bind("input propertychange", function (event) {
    clearTimeout(isSearch);
    deldsq()
});

// 定时器(文本框输入后响应时间)
function deldsq() {
    isSearch = setTimeout(function () {
        var search = $("#api-search").val();
        if (search != '') {
            $("#listApi").load("/search.html?search=" + search.trim(), function (responseTxt, statusTxt, xhr) {
                $("#api-search-tu").removeClass("fa fa-search").addClass("fa fa-close x onX");/*改为清空图标*/
                if (statusTxt == "success") { /*console.log(0)*/ console.log("输入字符："+search.trim())}
                if (statusTxt == "error") { console.log(1) }
            });
        } else {
            $("#listApi").load("/search.html", function (responseTxt, statusTxt, xhr) {
                $("#api-search-tu").removeClass("fa fa-close x onX").addClass("fa fa-search");/*改为搜索图标*/
                if (statusTxt == "success") { /*console.log(0)*/ console.log("输入框为空")}
                if (statusTxt == "error") { console.log(1) }
            });
        }
    }, 10);//10毫秒
}

$(function () {
    // 回车事件(文本框回车事件)
    $("body").bind('keyup', function (event) {
        if (event.keyCode == 13) {
            var search = $("#api-search").val();
            if (search != '') {
                $("#listApi").load("/search.html?search=" + search.trim(), function (responseTxt, statusTxt, xhr) {
                    if (statusTxt == "success") { console.log(0) }
                    if (statusTxt == "error") { console.log(1) }
                });
            }
        }
    });
});

/* 搜索框清空事件 */
var text_search = $('#api-search');//将搜索框与变量绑定变量
var search_tu = $('#api-search-tu');//将搜索图标与变量绑定
search_tu.click(function(){
    text_search.val('');//清空搜索文本框
    $("#api-search-tu").removeClass("fa fa-close x onX").addClass("fa fa-search");/*改为搜索图标*/
    deldsq()
});
/*搜索结束*/