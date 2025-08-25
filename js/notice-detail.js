// js/notice-detail.js
document.addEventListener("DOMContentLoaded", () => {
    // announcement.js의 id와 매칭
    const EVENT_DETAILS = {
        "gm-2025h2": {
            title: "2025 하반기 정기 총회 안내",
            time: "시간 추후 공지",
            date: "2025.08.20",
            place: "동방/학내 강의실",
            content:
                "정기 총회 관련 상세 안내입니다. 안건 공유, 회계 보고, 향후 일정 논의 등이 포함됩니다.",
            images: [],
        },
        "freshman-ot-2025": {
            title: "신입생 OT 및 동아리 설명회 개최",
            time: "18:00-20:00",
            date: "2025.08.18",
            place: "동방/강의실",
            content:
                "신입생 대상 동아리 OT 및 설명회입니다. 활동 소개, 질의응답, 가입 절차 안내를 진행합니다.",
            images: [],
        },
        "night-food-2025-08-15": {
            title: "야식사업",
            time: "20:00-22:00",
            date: "2025.08.15",
            place: "동방",
            content:
                "동방에서 진행하는 야식 사업 공지입니다. 메뉴/가격/수익 사용처 등 세부 내용을 안내합니다.",
            images: [],
        },
    };

    const qs = new URLSearchParams(location.search);
    const id = qs.get("id");
    const data = EVENT_DETAILS[id];

    const root = document.getElementById("detail-root");
    if (!root) return;

    const esc = (s = "") =>
        s
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");

    if (!data) {
        root.innerHTML = `
      <div class="event-title">항목을 찾을 수 없습니다</div>
      <div style="padding:16px 18px">잘못된 접근이거나 삭제된 공지입니다.</div>
      <div style="padding:0 18px 14px"><a class="pill" href="announcement.html">공지 목록으로</a></div>
    `;
        return;
    }

    root.innerHTML = `
    <div class="event-title">${esc(data.title)}</div>

    <a href="#evimg" class="event-photo">
      <div class="photo-inner">
        <div class="photo-text">
          행사 사진<br/><small>(이미지를 클릭하면 크게 볼 수 있습니다)</small>
        </div>
      </div>
    </a>

    <div class="event-pills">
      <div class="pill">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3V2Zm12 6H5v12h14V8Z"/>
        </svg>
        <div class="pill-text">${esc(data.time)}</div>
      </div>
      <div class="pill">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="currentColor" d="M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20Zm1 5h-2v6l5 3l1-1.73l-4-2.27V7Z"/>
        </svg>
        <div class="pill-text">${esc(data.date)}</div>
      </div>
      <div class="pill">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="currentColor" d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z"/>
        </svg>
        <div class="pill-text">${esc(data.place)}</div>
      </div>
    </div>

    ${
        data.content
            ? `<div style="padding:12px 16px;white-space:pre-wrap;line-height:1.6">${esc(
                  data.content
              )}</div>`
            : ""
    }
  `;

    // 라이트박스 이미지 교체
    const lb = document.querySelector(".lightbox-content");
    if (lb) {
        if (Array.isArray(data.images) && data.images.length > 0) {
            lb.innerHTML = `<img src="${data.images[0]}" alt="${esc(
                data.title
            )}"
                       style="max-width:100%;height:auto;border-radius:10px">`;
        }
    }
});
