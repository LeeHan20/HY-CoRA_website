document.addEventListener("DOMContentLoaded", () => {
    const raw = sessionStorage.getItem("announcement.current");
    const container = document.querySelector("main");
    if (!container) return;

    if (!raw) {
        container.innerHTML = emptyHTML("상세 데이터를 찾을 수 없습니다.");
        return;
    }

    const data = JSON.parse(raw);

    // 모집 공고만 보여주기
    if (data.category !== "recruitment") {
        container.innerHTML = emptyHTML("모집 공고가 아닙니다.");
        return;
    }

    // 안전 이스케이프
    const esc = escapeHTML;

    // recruit-card 마크업 구성
    const card = document.createElement("section");
    card.className = "main";
    card.innerHTML = `

    <!-- 상단 소개 배너 -->
    <div class="top-header">
      <div class="top-title">
        <h2>${esc(data.title)}</h2>
      </div>
      <div class="top-subtitle">
        <p>${esc(data.summary)}</p>
      </div>
    </div>

    <section class="notices-section">
      <div class="container">

        <div class="recruit-meta">
          <div class="deadline">
            <!-- 달력 아이콘 -->
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
              <path d="M7 2v2M17 2v2M3 9h18M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <span>마감: ${esc(data.date)}</span>
          </div>

          <button type="button" class="badge-outline">
            ${esc(data.badge ?? "모집")}
          </button>
        </div>

        <div class="recruit-body">
          <div class="recruit-col">
            <h4>지원 자격</h4>
            <ul class="list list-check">
              ${
                  (data.qualifications ?? [])
                      .map((li) => `<li>${esc(li)}</li>`)
                      .join("") ||
                  "<li>자세한 내용은 공지 본문을 참고하세요.</li>"
              }
            </ul>
          </div>
        <div class="recruit-col">
          <h4>활동 혜택</h4>
          <ul class="list list-star">
            ${
                (data.benefits ?? [])
                    .map((li) => `<li>${esc(li)}</li>`)
                    .join("") ||
                "<li>자세한 내용은 공지 본문을 참고하세요.</li>"
            }
          </ul>
        </div>
      </div>
    </div>
  </section>
  `;

    container.innerHTML = "";
    container.appendChild(card);
});

// 공통: 빈 상태 UI
function emptyHTML(msg) {
    return `
    <div class="notice-detail-empty" style="text-align:center; padding:2rem;">
      <p>${escapeHTML(msg)}</p>
      <p><a href="announcement.html" class="btn">목록으로 돌아가기</a></p>
    </div>
  `;
}

// 간단 XSS 방지
function escapeHTML(s) {
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
