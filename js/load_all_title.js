import { AllYearList } from "./define.js";

/**
 * 全年度の番組情報を取得して表示
 */
async function loadAllPrograms() {
    // 番組タイトル => Set(年度)
    const programMap = new Map();

    for (const year of AllYearList) {
        const url = `../archive/${year}.html`;

        try {
            const response = await fetch(url);
            const htmlText = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");

            const titles = doc.querySelectorAll("td.title");

            titles.forEach(td => {
                const title = td.textContent.trim();

                // 条件① "--" を除外
                if (!title || title === "--") return;

                if (!programMap.has(title)) {
                    programMap.set(title, new Set());
                }
                programMap.get(title).add(year);
            });

        } catch (e) {
            console.warn(`読み込み失敗: ${url}`, e);
        }
    }

    // 番組名を昇順ソート（日本語対応）
    const sortedTitles = Array.from(programMap.keys())
        .sort((a, b) => a.localeCompare(b, "ja"));

    renderTable(sortedTitles, programMap);
}

/**
 * テーブル描画
 */
function renderTable(sortedTitles, programMap) {
    const tbody = document.getElementById("program-table-body");
    tbody.innerHTML = "";

    sortedTitles.forEach(title => {
        const tr = document.createElement("tr");

        // カラム[0]：番組タイトル
        const tdTitle = document.createElement("td");
        tdTitle.textContent = title;

        // カラム[1]：年度リンク（複数可）
        const tdYear = document.createElement("td");

        const years = Array.from(programMap.get(title))
            .sort(); // 年度は数値昇順

        years.forEach((year, index) => {
            const a = document.createElement("a");
            a.href = `../archive/${year}.html`;

            tdYear.appendChild(a);

            // 複数年度の場合は改行
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
loadAllPrograms();