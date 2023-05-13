function countup_all(count_year_sum, count_year) {
    var td_new = 0;
    var td_continuation = 0;
    var td_reair = 0;
    var result = [0, 0, 0];

    AllFileList = ["../index/2023.html",
                   "../index/2022.html",
                   "../index/2021.html",
                   "../index/2020.html",
                   "../index/2019.html",
                   "../index/2018.html",
                   "../index/2017.html",
                   "../index/2016.html",
                   "../index/2015.html"];
    for (var i=0; i < AllFileList.length; i++) {
        result = getPage(AllFileList[i], result[0], result[1], result[2]);
        console.log(result[0], result[1], result[2]);
    }

    if (result[0] == 0) {
        td_new = "--";
    } else {
        td_new = result[0];
    }

    if (result[1] == 0) {
        td_continuation = "--";
    } else {
        td_continuation = result[1];
    }

    if (result[2] == 0) {
        td_reair = "--";
    } else {
        td_reair = result[2];
    }

    var text = document.getElementById(count_year);
    text.textContent = "新規:" + td_new + ", 継続:" + td_continuation + ", 再放送:" + td_reair;
    var text = document.getElementById(count_year_sum);
    var all = result[0] + result[1] + result[2];
    text.textContent = "合計視聴数:" + all;
}

function getPage(elm, td_new, td_continuation, td_reair) {
    $.ajax({
        url: elm,
        async : false,
        dataType: "html",
        // context:{
        //     _new: td_new,
        //     _continuation: td_continuation,
        //     _reair: td_reair
        // },
        success: function(data) {
            var str = data.split(/\r\n|\r|\n/);
            for(var row in str) {
                if (str[row].match("<td class=\"new\">")) {
                    td_new = td_new + 1;
                } else if (str[row].match("<td class=\"continuation\">")) {
                    td_continuation = td_continuation + 1;
                } else if (str[row].match("<td class=\"reair\">")) {
                    td_reair = td_reair + 1;
                }
            }
        }
    });
    return [td_new, td_continuation, td_reair];
}


function countup_year(TableIDList, count_year, count_year_sum) {
    var td_new = 0;
    var td_continuation = 0;
    var td_reair = 0;
    result = [0, 0, 0];
    for (var i=0; i < TableIDList.length; i++) {
        var table = document.getElementById(TableIDList[i]);
        result = table_td_count(table, result[0], result[1], result[2]);
    }
    if (result[0] == 0) {
        td_new = "--";
    } else {
        td_new = result[0];
    }

    if (result[1] == 0) {
        td_continuation = "--";
    } else {
        td_continuation = result[1];
    }

    if (result[2] == 0) {
        td_reair = "--";
    } else {
        td_reair = result[2];
    }

    var text = document.getElementById(count_year);
    text.textContent = "新規:" + td_new + ", 継続:" + td_continuation + ", 再放送:" + td_reair;
    var text = document.getElementById(count_year_sum);
    var all = result[0] + result[1] + result[2];
    text.textContent = "合計視聴数:" + all;
}


function countup_season(TableID, displayID) {
    var table = document.getElementById(TableID);
    var td_new = 0;
    var td_continuation = 0;
    var td_reair = 0;
    result = table_td_count(table, td_new, td_continuation, td_reair);
    if (result[0] == 0) {
        td_new = "--";
    } else {
        td_new = result[0];
    }

    if (result[1] == 0) {
        td_continuation = "--";
    } else {
        td_continuation = result[1];
    }

    if (result[2] == 0) {
        td_reair = "--";
    } else {
        td_reair = result[2];
    }

    var text = document.getElementById(displayID);
    text.textContent = "新規:" + td_new + ", 継続:" + td_continuation + ", 再放送:" + td_reair;
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
