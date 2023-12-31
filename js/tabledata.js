AllFileList = ["../archive/2015.html",
               "../archive/2016.html",
               "../archive/2017.html",
               "../archive/2018.html",
               "../archive/2019.html",
               "../archive/2020.html",
               "../archive/2021.html",
               "../archive/2022.html",
               "../archive/2023.html",
               "../archive/2024.html"];

AllYearList = ["2015", "2016", "2017", "2018", "2019",
               "2020", "2021", "2022", "2023", "2024"];

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
    return [result[0], result[1], result[2]];
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


function get_watch_history_all() {
    // graph_dataは以下の形式
    // 　　　|2015 | 2016 | …202x
    // 新規　|     |      |
    // 継続　|     |      |
    // 再放送|     |      | 
    // 合計　|     |      | 
    // archiveから集計データを取得しgraph_dataに格納
    var result = [0, 0, 0, 0];
    var graph_data = new Array(4);
    for (var i = 0; i < 4; i++) {
        graph_data[i] = new Array(AllFileList.length);
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < AllFileList.length; j++) {
            graph_data[i][j] = 0;
        }
    }
    for (var i = 0; i < AllFileList.length; i++) {
        result = getPage(AllFileList[i], graph_data[0][i], graph_data[1][i], graph_data[2][i]);
        graph_data[0][i] = result[0]
        graph_data[1][i] = result[1]
        graph_data[2][i] = result[2]
        graph_data[3][i] = result[0] + result[1] + result[2]
    }
    return [AllYearList, graph_data]
}


function get_watch_history_year(year) {
    // graph_dataは以下の形式
    // 　　　|20xx冬 | 20xx春 | …20xx秋
    // 新規　|     　|      　|
    // 継続　|     　|      　|
    // 再放送|     　|      　| 
    // 合計　|     　|      　| 
    // archiveから集計データを取得しgraph_dataに格納
    TableIDList = ["table_winter_" + year,
                   "table_spring_" + year,
                   "table_summer_" + year,
                   "table_autumn_" + year]
    var result = [0, 0, 0, 0];
    var graph_data = new Array(4);
    for (var i = 0; i < 4; i++) {
        graph_data[i] = new Array(TableIDList.length);
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < TableIDList.length; j++) {
            graph_data[i][j] = 0;
        }
    }
    for (var i = 0; i < TableIDList.length; i++) {
        var table = document.getElementById(TableIDList[i]);
        result = table_td_count(table, graph_data[0][i], graph_data[1][i], graph_data[2][i]);
        graph_data[0][i] = result[0]
        graph_data[1][i] = result[1]
        graph_data[2][i] = result[2]
        graph_data[3][i] = result[0] + result[1] + result[2]
    }
    labellist =[year + "冬", year + "春", year + "夏", year + "秋"]
    return [labellist, graph_data]
}

// https://qiita.com/okatako/items/94a769a0925337c79483参考
function history_graph(x_title, labellist, graph_data, bResponsiveFlg) {
    var cvsChart = document.getElementById("watch-history");
    var ctx = cvsChart.getContext("2d");

    // X軸の1データ当たりの幅（PC:120 sp:60）
    if (window.matchMedia("(max-width: 834px)").matches) {
        // ウィンドウサイズ834px以下のときの処理
        var xAxisStepSize = 60;
    } else {
        // それ以外の処理
        var xAxisStepSize = 120;
    }

    // グラフ全体の幅を計算
    var chartWidth = labellist.length * xAxisStepSize;
    // Chart用canvasのstyle.width(すなわち実際に描画されるべきサイズ)に上記の幅を設定
    cvsChart.style.width = chartWidth + "px";

    function copyYAxisImage(chart) {
        if (bResponsiveFlg) {
            return
        }

        var cvsYAxis = document.getElementById("yAxis");
        var ctxYAxis = cvsYAxis.getContext("2d");
        // グラフ描画後は、canvas.width(height):canvas.style.width(height) 比は、下記 scale の値になっている
        var scale = window.devicePixelRatio;
    
        // Y軸のスケール情報
        var yAxScale = chart.scales.yAxes;

        // Y軸部分としてグラフからコピーすべき幅
        var yAxisStyleWidth0 = yAxScale.width - 10;
    
        // canvas におけるコピー幅(yAxisStyleWidth0を直接使うと微妙にずれるので、整数値に切り上げる)
        var copyWidth = Math.ceil(yAxisStyleWidth0 * scale);

        // Y軸canvas の幅(右側に少し空白部を残す)
        var yAxisCvsWidth = copyWidth + 4;

        // 実際の描画幅(styleに設定する)
        var yAxisStyleWidth = yAxisCvsWidth / scale;

        // Y軸部分としてグラフからコピーすべき高さ⇒これを実際の描画高とする(styleに設定)
        var yAxisStyleHeight = yAxScale.height + yAxScale.top + 10;

        // canvas におけるコピー高
        var copyHeight = yAxisStyleHeight * scale;

        // Y軸canvas の高さ
        var yAxisCvsHeight = copyHeight;

        // Y軸canvas の幅と高さを設定
        cvsYAxis.width = yAxisCvsWidth;
        cvsYAxis.height = yAxisCvsHeight;
    
        // Y軸canvas.style(実際に描画される大きさ)の幅と高さを設定
        cvsYAxis.style.width = yAxisStyleWidth + "px";
        cvsYAxis.style.height = yAxisStyleHeight + "px";
    
        // グラフcanvasからY軸部分のイメージをコピーする
        ctxYAxis.drawImage(cvsChart, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
    
        // 軸ラベルのフォント色を透明に変更して、以降、再表示されても見えないようにする
        chart.options.scales.yAxes[0].ticks.fontColor = "rgba(0,0,0,0)";
        chart.update();

        // 最初に描画されたグラフのY軸ラベル部分をクリアする
        ctx.clearRect(0, 0, yAxisStyleWidth, yAxisStyleHeight);
    }

    // グラフの描画
    var myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labellist,
            datasets: [
                {
                    barPercentage: 0.9,
                    label: "新規",
                    data: graph_data[0],
                    borderColor: "rgb(251, 153, 102)",
                    // fill: true,
                    backgroundColor: "rgb(251, 153, 102, 1.0)"
                },
                {
                    barPercentage: 0.9,
                    label: "継続",
                    data: graph_data[1],
                    borderColor: "rgb(46, 169, 223)",
                    // fill: true,
                    backgroundColor: "rgb(46, 169, 223, 1.0)"
                },
                {
                    barPercentage: 0.9,
                    label: "再放送",
                    data: graph_data[2],
                    borderColor: "rgb(0, 170, 144)",
                    // fill: true,
                    backgroundColor: "rgb(0, 170, 144, 1.0)"
                },
                {
                    type: "line",
                    barPercentage: 1.0,
                    label: "合計",
                    data: graph_data[3],
                    lineTension: 0.2,
                    pointBorderWidth: 7, 
                    borderColor: "rgb(243, 48, 216)",
                    fill: true,
                    backgroundColor: "rgb(200, 200, 200, 0.2)"
                }
            ]
        },
        options: {
            responsive: bResponsiveFlg,
            plugins: {
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    color: window.globalFunction.set_char_color(),
                    font: {
                        size: 15,
                    },
                    formatter: function(value, context) {
                        return value.toString();
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        color: window.globalFunction.set_char_color()
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    // stacked: true,
                    grid: {
                        color: "black" 
                    },
                    title: {
                        color: window.globalFunction.set_char_color(),
                        display: true,
                        text: x_title
                    },
                    ticks: {
                        color: window.globalFunction.set_char_color()
                    }
                },
                yAxes: {
                    display: true,
                    // stacked: true,
                    grid: {
                        color: "black" 
                    },
                    title: {
                        color: window.globalFunction.set_char_color(),
                        display: true,
                        text: "視聴数"
                    },
                    ticks: {
                        color: window.globalFunction.set_char_color()
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
        },
        plugins: [
            ChartDataLabels,
            {
                afterRender: copyYAxisImage
            }
        ],
    });
}


function category_division_graph() {
    var ctx = document.getElementById("category-division").getContext("2d");
    // 各データののラベル
    var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["新規", "継続", "再放送"],
            datasets: [
                {
                    backgroundColor: ["rgb(251, 153, 102)",
                                      "rgb(46, 169, 223)",
                                      "rgb(0, 170, 144)"],
                    borderColor: "transparent",
                    data: result
                }
            ]
        },
        options: {
            plugins: {
                datalabels: {
                    color: window.globalFunction.set_char_color(),
                    font: {
                        size: 15,
                    },
                    formatter: function(value, context) {
                        return value.toString() + "%";
                    }
                },
                legend: {
                    display: true,
                    position: "right",
                    labels: {
                        color: window.globalFunction.set_char_color()
                    }
                }
            },
        },
        plugins: [
            ChartDataLabels,
        ],
    });
}


function get_week_division_year(year) {
    TableIDList = ["table_winter_" + year,
                   "table_spring_" + year,
                   "table_summer_" + year,
                   "table_autumn_" + year]
    var graph_data = [0, 0, 0, 0, 0, 0, 0];
    for (const TableID of TableIDList) {
        var table = document.getElementById(TableID);
        for (var i=0; i < table.rows.length; i++) {
            for (var j=0; j < table.rows[i].cells.length; j++) {
                var className = table.rows[i].cells[j].className ;
                if (className == "new" ||
                    className == "continuation" || 
                    className == "reair") {
                    graph_data[i] = graph_data[i] + 1
                }
            }
        }
    }
    return graph_data
}


function week_division_graph(graph_data) {
    var ctx = document.getElementById("week-division").getContext("2d");
    // 各データののラベル
    var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
            datasets: [
                {
                    backgroundColor: ["rgb(231, 0, 18)",
                                      "rgb(156, 51, 133)",
                                      "rgb(240, 131, 0)",
                                      "rgb(0, 170, 232)",
                                      "rgb(16, 168, 59)",
                                      "rgb(249, 190, 0)",
                                      "rgb(70, 82, 161)"],
                    borderColor: "transparent",
                    data: graph_data
                }
            ]
        },
        options: {
            plugins: {
                datalabels: {
                    color: window.globalFunction.set_char_color(),
                    font: {
                        size: 15,
                    },
                    formatter: function(value, context) {
                        return value.toString() + "%";
                    }
                },
                legend: {
                    display: true,
                    position: "right",
                    labels: {
                        color: window.globalFunction.set_char_color()
                    }
                }
            },
        },
        plugins: [
            ChartDataLabels,
        ],
    });
}

window.globalFunction = {};

// Dark Mode時のグラフ文字色設定
function set_char_color() {
    if (localStorage.getItem("darkMode") === "on") {
        return "white"
    } else if (localStorage.getItem("darkMode") === "off") {
        return "black"
    }
}
window.globalFunction.set_char_color = set_char_color;

// Dark Mode時のTwitterカラーテーマ設定
function set_twitter_theme() {
    if (localStorage.getItem("darkMode") === "on") {
        return "dark"
    } else if (localStorage.getItem("darkMode") === "off") {
        return "light"
    }
}
window.globalFunction.set_twitter_theme = set_twitter_theme;