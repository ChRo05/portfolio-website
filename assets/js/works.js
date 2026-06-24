// data/works.json を読み、制作実績カードを生成する
(function () {
  const list = document.getElementById("worksList");
  if (!list) return;

  const BADGE = {
    "公開コード": { cls: "badge--code", label: "公開コード" },
    "成果のみ": { cls: "badge--result", label: "成果のみ" },
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cardHTML(w) {
    const badge = BADGE[w.badge] || BADGE["成果のみ"];
    const thumb = w.thumb
      ? '<img class="works-card__thumb" src="' + esc(w.thumb) + '" alt="" loading="lazy" />'
      : '<div class="works-card__thumb"></div>';
    return (
      '<li class="works-card">' +
      thumb +
      '<div class="works-card__body">' +
      '<span class="badge ' + badge.cls + '">' + esc(badge.label) + "</span>" +
      '<h3 class="works-card__title">' + esc(w.title) + "</h3>" +
      '<p class="works-card__summary">' + esc(w.summary) + "</p>" +
      '<a class="works-card__more" href="works/detail.html?id=' + encodeURIComponent(w.id) + '">詳細を見る →</a>' +
      "</div></li>"
    );
  }

  fetch("data/works.json")
    .then(function (r) {
      if (!r.ok) throw new Error("works.json fetch failed");
      return r.json();
    })
    .then(function (works) {
      if (!Array.isArray(works) || works.length === 0) {
        list.innerHTML = '<li class="works-card works-card--loading">実績は準備中です。</li>';
        return;
      }
      list.innerHTML = works.map(cardHTML).join("");
    })
    .catch(function () {
      list.innerHTML = '<li class="works-card works-card--loading">実績の読み込みに失敗しました。</li>';
    });
})();
