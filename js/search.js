var highlightPos = 0;
var highlightLen = 0;

$(function(){
    $(".btn_search").click(function(){ //.btn_searchをクリックした時
        //#wordの文字を探す
        var word = $("#word").val();
        //#target内の文字をハイライト
        $(".content").highlight(word);

        // 検索結果数を保存
        highlightLen = $(".highlight").length;

        // 検索結果先頭に移動
        var p = $(".highlight").offset();
        // スクロール後にハイライト文字が固定表示ヘッダーに隠れないように-100オフセット
        var ptop = p.top - 100;
        $("html,body").animate({ scrollTop: ptop }, "fast");
        highlightPos = 0;
        return false;
    });
})

$(function() {
    $(".btn_next").click(function () { //.btn_nextをクリックしたとき
        if ( (highlightLen -1) <= highlightPos ) {
            highlightPos = 0;
        } else {
            highlightPos = highlightPos + 1;
        }

        var p = $(".highlight").eq(highlightPos).offset();
        // スクロール後にハイライト文字が固定表示ヘッダーに隠れないように-100オフセット
        var ptop = p.top - 100;
        $("html,body").animate({ scrollTop: ptop }, "fast");

        return false;
    });
});

$(function() {
    $(".btn_prev").click(function () { //.btn_prevをクリックしたとき
        if ( highlightPos <= 0 ) {
            highlightPos = (highlightLen -1);
        } else {
            highlightPos = highlightPos - 1;
        }

        var p = $(".highlight").eq(highlightPos).offset();
        // スクロール後にハイライト文字が固定表示ヘッダーに隠れないように-100オフセット
        var ptop = p.top - 100;
        $("html,body").animate({ scrollTop: ptop }, "fast");
        
        return false;
    });
});

$(function(){
    $(".btn_remove").click(function(){ //.btn_removeをクリックした時
        $(".content").removeHighlight(); //ハイライト削除
        $("#word").val(""); //#wordを空欄に
        highlightPos = 0;
        highlightLen = 0;
    });
})
