AllFileList = ["../archive/2015.html",
               "../archive/2016.html",
               "../archive/2017.html",
               "../archive/2018.html",
               "../archive/2019.html",
               "../archive/2020.html",
               "../archive/2021.html",
               "../archive/2022.html",
               "../archive/2023.html"];

AllYearList = ["2015", "2016", "2017", "2018", "2019",
               "2020", "2021", "2022", "2023"];


function countup_all(count_year_sum, count_year) {
    var td_new = 0;
    var td_continuation = 0;
    var td_reair = 0;
    var result = [0, 0, 0];

    for (var i=0; i < AllFileList.length; i++) {
        result = getPage(AllFileList[i], result[0], result[1], result[2]);
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


function bar_graph() {
    var ctx = document.getElementById("watch-history").getContext('2d');
    // graph_dataは以下の形式
    // 　　　|2015 | 2016 | …2023
    // 新規　|     |      |
    // 継続　|     |      |
    // 再放送|     |      | 
    // archiveから集計データを取得しgraph_dataに格納
    var result = [0, 0, 0];
    var graph_data = new Array(3);
    for (var i = 0; i < 3; i++) {
        graph_data[i] = new Array(AllFileList.length);
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < AllFileList.length; j++) {
            graph_data[i][j] = 0;
        }
    }
    for (var i = 0; i < AllFileList.length; i++) {
        result = getPage(AllFileList[i], graph_data[0][i], graph_data[1][i], graph_data[2][i]);
        graph_data[0][i] = result[0]
        graph_data[1][i] = result[1]
        graph_data[2][i] = result[2]
    }
    var myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: AllYearList,
            datasets: [
                {
                    barPercentage: 0.5,
                    label: "新規",
                    data: graph_data[0],
                    backgroundColor: "#fb9966"
                },
                {
                    barPercentage: 0.5,
                    label: "継続",
                    data: graph_data[1],
                    backgroundColor: "#2ea9df"
                },
                {
                    barPercentage: 0.5,
                    label: "再放送",
                    data: graph_data[2],
                    backgroundColor: "#00aa90"
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "white"
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    stacked: true,
                    grid: {
                        color: "black" 
                    },
                    title: {
                        color: "white",
                        display: true,
                        text: "year"
                    },
                    ticks: {
                        color: "white"
                    }
                },
                yAxes: {
                    display: true,
                    stacked: true,
                    grid: {
                        color: "black" 
                    },
                    title: {
                        color: "white",
                        display: true,
                        text: "視聴数"
                    },
                    ticks: {
                        color: "white"
                    }
                },
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
}
