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

function getMovieCount(elm) {
    var count = 0;
    $.ajax({
        url: elm,
        async : false,
        dataType: "html",
        success: function(data) {
            var str = data.split(/\r\n|\r|\n/);
            for(var row in str) {
                if (str[row].match("movie-img")) {
                    count = count + 1;
                }
            }
        }
    });
    //視聴本数+1の<td class="movie-img"></td>を設定している為最後に-1する
    count = count - 1;
    return count;
}


function get_movie_watch_history_all() {
    // graph_dataは以下の形式
    // 　　　|2015 | 2016 | …202x
    // 本数　|     |      |
    // archiveから集計データを取得しgraph_dataに格納
    var graph_data = new Array(AllFileList.length);

    for (var i = 0; i < AllFileList.length; i++) {
        graph_data[i]  = getMovieCount(AllFileList[i]);
    }
    return [AllYearList, graph_data]
}


function movie_history_graph(x_title, labellist, graph_data) {
    var cvsChart = document.getElementById("watch-movie-history");
    var ctx = cvsChart.getContext("2d");

    // X軸の1データ当たりの幅（PC:120 sp:60）
    if (window.matchMedia("(max-width: 834px)").matches) {
        // ウィンドウサイズ834px以下のときの処理
        var xAxisStepSize = 70;
    } else {
        // それ以外の処理
        var xAxisStepSize = 120;
    }
    labellist.unshift('');
    graph_data.unshift('null');
    console.log(labellist)

    // グラフ全体の幅を計算
    var chartWidth = labellist.length * xAxisStepSize;
    // Chart用canvasのstyle.width(すなわち実際に描画されるべきサイズ)に上記の幅を設定
    cvsChart.style.width = chartWidth + "px";

    // グラフの描画
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labellist,
            datasets: [
                {
                    barPercentage: 1.0,
                    label: "視聴映画本数",
                    data: graph_data,
                    lineTension: 0.2,
                    pointBorderWidth: 10, 
                    borderColor: "rgb(243, 48, 216)",
                    fill: true,
                    backgroundColor: "rgb(200, 200, 200, 0.2)"
                }
            ]
        },
        options: {
            responsive: false,
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
            ChartDataLabels
        ],
    });
    return myChart;
}