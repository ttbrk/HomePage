var iHighlightPos = 0;
var iHighlightLen = 0;
var aryLeftValue = [];
var aryTopValue = [];

// ウィンドウサイズ834px以下のときの処理（表の目次の横幅が異なるため）
var iLeftOffset = 0;
if (window.matchMedia("(max-width: 834px)").matches) {
    var iLeftOffset = 70;
} else {
    var iLeftOffset = 100;
}
var iToptOffset = 100;


$(function(){
    $(".btn_search").click(function(){ //.btn_searchをクリックした時
        //#wordの文字を探す
        var word = $("#word").val();
        //#target内の文字をハイライト
        $(".content").highlight(word);

        // 検索結果数を保存
        iHighlightLen = $(".highlight").length;
        // 検索結果位置を保存
        iHighlightPos = 0;

        for (i = 0; i < iHighlightLen; i++) {
            p = $(".highlight").eq(i).offset();
            aryLeftValue.push(p.left);
            aryTopValue.push(p.top);
        }

        // スクロール後にハイライト文字が固定表示ヘッダーに隠れないように-100オフセット
        iTopValue = aryTopValue[iHighlightPos] - iToptOffset;
        iLeftValue = aryLeftValue[iHighlightPos] - iLeftOffset;

        $("html,.table-wrap").animate({ scrollLeft: iLeftValue}, "fast");
        $("html,body").animate({ scrollTop: iTopValue}, "fast");
        return false;
    });
})

$(function() {
    $(".btn_next").click(function () { //.btn_nextをクリックしたとき
        if ( (iHighlightLen -1) <= iHighlightPos ) {
            pre = iHighlightLen -1;
            iHighlightPos = 0;
        } else {
            pre = iHighlightPos;
            iHighlightPos = iHighlightPos + 1;
        }

        // スクロール後にハイライト文字が固定表示ヘッダーに隠れないように-100オフセット
        iTopValue = aryTopValue[iHighlightPos] - iToptOffset;
        iLeftValue = aryLeftValue[iHighlightPos] - iLeftOffset;

        $("html,.table-wrap").animate({ scrollLeft: iLeftValue}, "fast");
        // $("html,.table-wrap").scrollLeft(iLeftValue);
        $("html,body").animate({ scrollTop: iTopValue}, "fast");
        return false;
    });
});

$(function() {
    $(".btn_prev").click(function () { //.btn_prevをクリックしたとき
        if ( iHighlightPos <= 0 ) {
            iHighlightPos = (iHighlightLen -1);
        } else {
            iHighlightPos = iHighlightPos - 1;
        }

        // スクロール後にハイライト文字が固定表示ヘッダーに隠れないように-100オフセット
        iTopValue = aryTopValue[iHighlightPos] - iToptOffset;
        iLeftValue = aryLeftValue[iHighlightPos] - iLeftOffset;

        $("html,.table-wrap").animate({ scrollLeft: iLeftValue}, "fast");
        $("html,body").animate({ scrollTop: iTopValue}, "fast");
        return false;
    });
});

$(function(){
    $(".btn_remove").click(function(){ //.btn_removeをクリックした時
        $(".content").removeHighlight(); //ハイライト削除
        $("#word").val(""); //#wordを空欄に
        iHighlightPos = 0;
        iHighlightLen = 0;
        aryLeftValue = [];
        aryTopValue = [];
    });
})
