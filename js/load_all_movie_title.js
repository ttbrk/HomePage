import { AllYearList } from "./define.js";

/**
 * 全年度の映画タイトルを取得して表示
 */
async function loadAllMovieTitles() {
    // 映画タイトル => Set(年度)
    const movieMap = new Map();

    for (const year of AllYearList) {
        const url = `../archive/${year}.html`;

        try {
            const response = await fetch(url);
            const htmlText = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");

            // 各 movie ブロック
            const movieTables = doc.querySelectorAll(".movie table");

            movieTables.forEach(table => {
                const rows = table.querySelectorAll("tr");
                if (rows.length < 2) return;

                // 2行目が映画タイトル
                const titleTds = rows[1].querySelectorAll("td");

                titleTds.forEach(td => {
                    const title = td.textContent.trim();

                // 条件① "--" を除外
                if (!title || title === "NO TITLE") return;

                    if (!movieMap.has(title)) {
                        movieMap.set(title, new Set());
                    }
                    movieMap.get(title).add(year);
                });
            });

        } catch (e) {
            console.warn(`読み込み失敗: ${url}`, e);
        }
    }

    // 映画タイトルを昇順ソート（日本語）
    const sortedTitles = Array.from(movieMap.keys())
        .sort((a, b) => a.localeCompare(b, "ja"));

    renderMovieTable(sortedTitles, movieMap);
}

/**
 * 映画テーブル描画
 */
function renderMovieTable(sortedTitles, movieMap) {
    const tbody = document.getElementById("movie-table-body");
    tbody.innerHTML = "";

    sortedTitles.forEach(title => {
        const tr = document.createElement("tr");

        // カラム[0]：映画タイトル
        const tdTitle = document.createElement("td");
        tdTitle.textContent = title;

        // カラム[1]：年度リンク（複数可）
        const tdYear = document.createElement("td");

        const years = Array.from(movieMap.get(title)).sort();

        years.forEach((year, index) => {
            const a = document.createElement("a");
            a.href = `../archive/${year}.html`;

            tdYear.appendChild(a);

            if (index < years.length - 1) {
                tdYear.appendChild(document.createElement("br"));
            }
            a.innerHTML = `${year} <span class="link-icon">🔗</span>`;
        });

        tr.appendChild(tdTitle);
        tr.appendChild(tdYear);
        tbody.appendChild(tr);
    });
}

// 実行
loadAllMovieTitles();