// js/activities_detail.js
document.addEventListener("DOMContentLoaded", () => {
    // 목록(activities.js)에서 setItem 한 데이터
    const raw = sessionStorage.getItem("activities.current");

    // activities_detail.html에는 .notices-section .container가 없음 → <main>을 컨테이너로 사용
    const container = document.querySelector("main");
    if (!container) return; // 안전 가드

    if (!raw) {
        container.innerHTML = emptyHTML(
            "잘못된 접근입니다. 활동 목록에서 다시 선택해 주세요.",
            "activities.html"
        );
        return;
    }

    const data = JSON.parse(raw);
    const esc = escapeHTML; // 안전 이스케이프 별칭

    // 안전한 필드 추출 (없으면 기본값)
    const title = esc(data.title ?? "제목 없음");
    const desc = esc(data.desc ?? "");
    const date = esc(data.date ?? "날짜 미정");
    const time = esc(data.time ?? "시간 미정");
    const place = esc(data.place || data.location || "장소 미정");
    const statusLabel = esc(data.statusLabel ?? "상태");
    const difficulty = esc(data.difficulty ?? "누구나");
    const duration = esc(data.duration ?? "2시간");

    // 일정/담당자(옵션)
    const schedule = Array.isArray(data.schedule)
        ? data.schedule.map(esc)
        : [
              "OT: 스터디 목표 및 진행 방식 소개",
              "기초 실습",
              "응용 실습",
              "Q&A 및 다음 주 공지",
          ];

    const contact = data.contact || {};
    const contactName = esc(contact.name ?? "담당자 미정");
    const contactRole = esc(contact.role ?? "역할 미정");
    const contactPhone = esc(contact.phone ?? "연락처 미정");
    const contactAvatar = esc(contact.avatar ?? "images/detail-icon.png");

    // 주입할 마크업
    const cardHTML = `
    <div class="top-header">
        <div class="top-title">
            <h2>${title}</h2>
        </div>
        <div class="top-subtitle">
            <p>
                ${desc}
            </p>
        </div>
    </div>

    <section class="info-section">
      <div class="info-grid">
        <!-- 활동 소개 -->
        <div class="info-box">
          <h2>활동소개</h2>
          <div class="info-card">
            ${
                desc
                    ? `<p>${desc}</p>`
                    : `<p>상세 설명이 곧 업데이트 됩니다.</p>`
            }
            <div class="info-subgrid">
              <div class="info-subbox">
                <h4>난이도</h4>
                <button class="badge">${difficulty}</button>
              </div>
              <div class="info-subbox">
                <h4>소요 시간</h4>
                <button class="badge">${duration}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 준비 사항 (데이터가 있으면 교체해서 쓰세요) -->
        <div class="info-box">
          <h2>준비사항</h2>
          <div class="info-card">
            <div class="info-subgrid">
              <div class="info-subbox">
                <h4>제공 자료</h4>
                <ul>
                  <li>웹 개발 개요 자료</li>
                  <li>실습용 예제</li>
                </ul>
              </div>
              <div class="info-subbox">
                <h4>준비물</h4>
                <p>개인 노트북</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 진행 일정 -->
        <div class="info-box">
          <h2>진행일정</h2>
          <div class="info-card">
            <ol class="custom-list">
              ${schedule.map((item) => `<li>${item}</li>`).join("")}
            </ol>
          </div>
        </div>

        <!-- 담당자 정보 -->
        <div class="info-box">
          <h2>담당자 정보</h2>
          <div class="info-card contact-card">
            <div class="contact-flex">
              <div class="avatar">
                <img src="${contactAvatar}" alt="담당자 사진" />
              </div>
              <div class="avatar-1">
                <p><strong>${contactName}</strong></p>
                <p>${contactRole}</p>
                <p>${contactPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    container.innerHTML = cardHTML;

    // 필요 시 상세 진입 후 세션 제거
    // sessionStorage.removeItem("activities.current");
});

// 공통: 빈 상태 UI
function emptyHTML(msg, backHref = "activities.html") {
    return `
    <div class="notice-detail-empty" style="text-align:center; padding:2rem;">
      <p>${escapeHTML(msg)}</p>
      <p><a href="${backHref}" class="pill">목록으로 돌아가기</a></p>
    </div>
  `;
}

// 간단 XSS 방지
function escapeHTML(s = "") {
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
