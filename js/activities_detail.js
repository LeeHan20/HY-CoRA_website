// js/activities_detail.js
document.addEventListener("DOMContentLoaded", () => {
    // 목록에서 저장해둔 현재 활동 데이터
    const raw = sessionStorage.getItem("activities.current");

    // 데이터가 없으면 목록으로 안내
    if (!raw) {
        alert("잘못된 접근입니다. 활동 목록에서 다시 선택해 주세요.");
        window.location.href = "activities.html";
        return;
    }

    /** 간단 이스케이프 */
    const esc = (s) =>
        String(s)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");

    const data = JSON.parse(raw);

    // ===== 상단 헤더 =====
    // 예: <div class="top-header"><h5>세부사항</h5><h2>웹 개발 스터디</h2><h4>담당자: 김혜윤</h4></div>
    const titleEl = document.querySelector(".top-header h2");
    if (titleEl && data.title) titleEl.textContent = data.title;

    // h5 영역에 "날짜 · 시간 · 장소" 표시 (있을 때만)
    const subEl = document.querySelector(".top-header h5");
    if (subEl && (data.date || data.time || data.place)) {
        const meta = [data.date, data.time, data.place]
            .filter(Boolean)
            .join(" · ");
        if (meta) subEl.textContent = meta;
    }

    // ===== 활동소개 박스(첫 번째 info-box) =====
    // 본문 p
    const introP = document.querySelector(
        ".info-section .info-box:nth-of-type(1) .info-card p"
    );
    if (introP && data.desc) introP.textContent = data.desc;

    // 난이도/소요시간 배지 (있으면 덮어씀)
    const difficultyBtn = document.querySelector(
        ".info-section .info-box:nth-of-type(1) .info-card .info-subgrid .info-subbox:nth-of-type(1) .badge"
    );
    if (difficultyBtn && data.difficulty)
        difficultyBtn.textContent = esc(data.difficulty);

    const durationBtn = document.querySelector(
        ".info-section .info-box:nth-of-type(1) .info-card .info-subgrid .info-subbox:nth-of-type(2) .badge"
    );
    if (durationBtn && data.duration)
        durationBtn.textContent = esc(data.duration);

    // ===== 진행일정(세 번째 info-box) =====
    // data.schedule이 배열이면 순서대로 렌더
    if (Array.isArray(data.schedule)) {
        const ol = document.querySelector(
            ".info-section .info-box:nth-of-type(3) .info-card .custom-list"
        );
        if (ol) {
            ol.innerHTML = data.schedule
                .map((s) => `<li>${esc(s)}</li>`)
                .join("");
        }
    }

    // ===== 담당자 정보(네 번째 info-box) =====
    // data.contact = { name, role, phone, avatar }
    if (data.contact) {
        const nameEl = document.querySelector(
            ".contact-card .avatar-1 p:nth-of-type(1) strong"
        );
        const roleEl = document.querySelector(
            ".contact-card .avatar-1 p:nth-of-type(2)"
        );
        const phoneEl = document.querySelector(
            ".contact-card .avatar-1 p:nth-of-type(3)"
        );
        const imgEl = document.querySelector(".contact-card .avatar img");

        if (nameEl && data.contact.name) nameEl.textContent = data.contact.name;
        if (roleEl && data.contact.role) roleEl.textContent = data.contact.role;
        if (phoneEl && data.contact.phone)
            phoneEl.textContent = data.contact.phone;
        if (imgEl && data.contact.avatar) imgEl.src = data.contact.avatar;
    }

    // 필요 시: 상세 페이지에 들어왔다면 세션을 비워도 됨
    // sessionStorage.removeItem("activities.current");
});
