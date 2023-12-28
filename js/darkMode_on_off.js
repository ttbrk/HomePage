// スイッチのinput要素（checkbox）
var modeSwitch = document.getElementById("myonoffswitch");
// スイッチの操作に応じて切り替え処理
modeSwitch.addEventListener("change", () => {
    if (modeSwitch.checked) {
        darkModeOn();
    } else {
        darkModeOff();
    }
    location.reload()
});

// OSの設定がダークモード
var osDark = window.matchMedia("(prefers-color-scheme: dark)");

// イベントリスナー
var listener = (event) => {
    if (event.matches) {
        darkModeOn();
    } else {
        darkModeOff();
    }
};

// リスナー登録
osDark.addEventListener("change", listener);

// 初期化処理
// listener(osDark);

// ダークモードがオンの時に実行する処理
function darkModeOn() {
    document.documentElement.classList.add("darkmode"); // ルート要素<html>にクラスを追加
    modeSwitch.checked = true;
    charcolor = "white"
    localStorage.setItem("darkMode", "on");
}
// ダークモードがオフの時に実行する処理
function darkModeOff() {
    document.documentElement.classList.remove("darkmode"); // クラスの削除
    modeSwitch.checked = false;
    charcolor = "black"
    localStorage.setItem("darkMode", "off");
}

// ロード時の状況に応じて切り替え
if (localStorage.getItem("darkMode") === "on") {
    darkModeOn();
} else if (localStorage.getItem("darkMode") === "off") {
    darkModeOff();
}

window.globalFunction = {};
// 読み込みは以下
// window.globalFunction.set_char_color
function set_char_color() {
    if (localStorage.getItem("darkMode") === "on") {
        return "white"
    } else if (localStorage.getItem("darkMode") === "off") {
        return "black"
    }
}
window.globalFunction.set_char_color = set_char_color;

// window.globalFunction.set_twitter_theme
function set_twitter_theme() {
    if (localStorage.getItem("darkMode") === "on") {
        return "dark"
    } else if (localStorage.getItem("darkMode") === "off") {
        return "light"
    }
}
window.globalFunction.set_twitter_theme = set_twitter_theme;