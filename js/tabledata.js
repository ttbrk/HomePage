function countup_year(TableIDList, count_year, count_year_sum) {
    result = [0, 0, 0]
    for (var i=0; i < TableIDList.length; i++) {
        console.log(TableIDList[i])
        var table = document.getElementById(TableIDList[i]);
        result = table_td_count(table, result[0], result[1], result[2]);
    }

    var text = document.getElementById(count_year)
    text.textContent = "新規:" + result[0] + ", 継続:" + result[1] + ", 再放送:" + result[2];
    var text = document.getElementById(count_year_sum)
    var all = result[0] + result[1] + result[2]
    text.textContent = "合計視聴数:" + all;
}


function countup_season(TableID, displayID) {
    var table = document.getElementById(TableID);
    var td_new = 0;
    var td_continuation = 0;
    var td_reair = 0;
    result = table_td_count(table, td_new, td_continuation, td_reair);

    var text = document.getElementById(displayID)
    text.textContent = "新規:" + result[0] + ", 継続:" + result[1] + ", 再放送:" + result[2];
}


function table_td_count(table, td_new, td_continuation, td_reair) {
    for (var i=0; i < table.rows.length; i++) {
        for (var j=0; j < table.rows[i].cells.length; j++) {
            var className = table.rows[i].cells[j].className ;
            if (className == "new") {
                td_new = td_new + 1;
            } else if (className == "continuation") {
                td_continuation = td_continuation + 1;
            } else if (className == "reair") {
                td_reair = td_reair + 1;
            }
        }
    }
    return [td_new, td_continuation, td_reair];
}
