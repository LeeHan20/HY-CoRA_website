// js/activities_detail.js
document.addEventListener("DOMContentLoaded", () => {
    const q = (sel, root = document) => root.querySelector(sel);
    const esc = (s) => String(s ?? "");
    const norm = (s) =>
        String(s ?? "")
            .replace(/\s+/g, "")
            .trim();
    const byH2 = (label) => {
        const h2s = Array.from(document.querySelectorAll("h2"));
        const hit = h2s.find((h) => norm(h.textContent) === norm(label));
        return hit ? hit.closest(".info-box") : null;
    };

    // === 세션 로드 ===
    const raw =
        sessionStorage.getItem("activities.current") ||
        sessionStorage.getItem("activity.current");
    if (!raw) return;
    const data = JSON.parse(raw);

    // === 상단 타이틀/메타 ===
    const h2 = q(".top-header h2");
    const h5 = q(".top-header h5:last-of-type");
    if (h2) h2.textContent = data.title || "";
    if (h5)
        h5.textContent = [data.date, data.time, data.place]
            .filter(Boolean)
            .join(" · ");

    // === 활동소개: intro 우선, 없으면 desc ===
    const secIntro = byH2("활동소개") || byH2("활동 소개");
    if (secIntro) {
        const p = q(".info-card > p", secIntro);
        if (p) p.textContent = data.intro || "소개 미등록";
        const durBadge = q(".info-subbox:nth-of-type(2) .badge", secIntro);
        if (durBadge && data.duration)
            durBadge.textContent = esc(data.duration);
    }

    // === 진행일정 ===
    const secTime = byH2("진행일정");
    if (secTime) {
        const ol = q("ol.custom-list, ol", secTime);
        const items = Array.isArray(data.schedule)
            ? data.schedule
            : typeof data.timeline === "string"
            ? data.timeline
                  .split("|")
                  .map((s) => s.trim())
                  .filter(Boolean)
            : [];
        if (ol) {
            const lis = (items || []).map((txt) => {
                const li = document.createElement("li");
                li.textContent = txt;
                return li;
            });
            ol.replaceChildren(...lis);
        }
    }

    // === 담당자 (멘토 사진 있으면 사진, 없거나 로드 실패면 아이콘) === check
    (function renderMentor() {
        const secMentor = byH2("담당자 정보") || byH2("담당자정보");
        if (!secMentor) return;

        // 아바타 컨테이너 (둘 중 있는 쪽 사용)
        const avatarBox =
            q(".contact-card .avatar-mentor", secMentor) ||
            q(".contact-card .avatar", secMentor);
        if (!avatarBox) return;

        const nameEl = q(
            ".contact-card .avatar-1 p:nth-of-type(1) strong",
            secMentor
        );
        const roleEl = q(".contact-card .avatar-1 p:nth-of-type(2)", secMentor);
        const phoneEl = q(
            ".contact-card .avatar-1 p:nth-of-type(3)",
            secMentor
        );

        const mentor = (data.mentor ?? "담당자 정보 미등록").trim();
        const role = (data.role ?? "").trim();
        const phone = (data.phone ?? "연락처 미등록").trim();
        const mentorImg = (data.mentorImg || data.avatarUrl || "").trim();

        // 아이콘 인라인 SVG (Lucide circle-user-round)
        const ICON_SVG = `
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24" fill="none" stroke="#000"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-circle-user-round"
           style="width:100%;height:100%;display:block;">
        <path d="M18 20a6 6 0 0 0-12 0"/>
        <circle cx="12" cy="10" r="4"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
    `;

        // 아이콘으로 채우는 함수
        function showIcon() {
            avatarBox.innerHTML = ICON_SVG;
        }

        // 먼저 박스 비우고 시작 (중복 DOM 방지)
        avatarBox.innerHTML = "";

        if (mentorImg) {
            // 이미지 시도: 실패(onerror)하면 즉시 아이콘 폴백
            const imgEl = document.createElement("img");
            imgEl.alt = "멘토 사진";
            imgEl.style.width = "100%";
            imgEl.style.height = "100%";
            imgEl.style.objectFit = "cover";
            imgEl.onerror = showIcon;
            imgEl.src = mentorImg;
            avatarBox.appendChild(imgEl);
        } else {
            // 경로 자체가 없으면 바로 아이콘
            showIcon();
        }

        if (nameEl && mentor) nameEl.textContent = mentor;
        if (roleEl && role) roleEl.textContent = role;
        if (phoneEl && phone) phoneEl.textContent = phone;
    })();

    // === 행사 사진 (원래 구조 유지) ===
    const galleryCard =
        q(".info-box.gallery .info-card") ||
        (byH2("행사 사진") || byH2("행사사진"))?.querySelector(".info-card");

    const imgs = Array.isArray(data.images)
        ? data.images.filter(Boolean)
        : data.imageUrl
        ? [data.imageUrl]
        : [];

    if (galleryCard) {
        galleryCard.innerHTML = "";
        if (imgs.length) {
            const cover = document.createElement("img");
            cover.className = "event-cover";
            cover.src = imgs[0];
            cover.alt = (data.title || "행사") + " 대표 이미지";
            cover.style.width = "100%";
            cover.style.display = "block";
            cover.style.objectFit = "cover";
            galleryCard.appendChild(cover);
        }
        // 이미지가 없으면 비워둠 (요청대로)
    }
=======
  const q    = (sel, root=document) => root.querySelector(sel);
  const esc  = (s) => String(s ?? "");
  const norm = (s) => String(s ?? "").replace(/\s+/g, "").trim();
  const byH2 = (label) => {
    const h2s = Array.from(document.querySelectorAll("h2"));
    const hit = h2s.find(h => norm(h.textContent) === norm(label));
    return hit ? hit.closest(".info-box") : null;
  };

  // ① 세션 로드
  const raw = sessionStorage.getItem("activities.current") || sessionStorage.getItem("activity.current");
  if (!raw) return;
  const data = JSON.parse(raw);

  // ② 상단 타이틀/메타
  const h2 = q(".top-header h2");
  const h5 = q(".top-header h5:last-of-type");
  if (h2) h2.textContent = data.title || "";
  if (h5) h5.textContent = [data.date, data.time, data.place].filter(Boolean).join(" · ");

  // ③ 활동소개 (intro 우선, 없으면 desc)
  const secIntro = byH2("활동소개") || byH2("활동 소개");
  if (secIntro) {
    const p = q(".info-card > p", secIntro);
    if (p) p.textContent = data.intro || data.desc || "";
    const durBadge = q(".info-subbox:nth-of-type(2) .badge", secIntro);
    if (durBadge && data.duration) durBadge.textContent = esc(data.duration);
  }

  // ④ 진행일정
  const secTime = byH2("진행일정");
  if (secTime) {
    const ol = q("ol.custom-list, ol", secTime);
    const items = Array.isArray(data.schedule)
      ? data.schedule
      : (typeof data.timeline === "string" ? data.timeline.split("|").map(s=>s.trim()).filter(Boolean) : []);
    if (ol) {
      const lis = (items || []).map(txt => {
        const li = document.createElement("li");
        li.textContent = txt;
        return li;
      });
      ol.replaceChildren(...lis);
    }
  }

  // ⑤ 담당자 (멘토 사진 있으면 사진, 없거나 로드 실패면 아이콘)
  (function renderMentor() {
    const secMentor = byH2("담당자 정보") || byH2("담당자정보");
    if (!secMentor) return;

    const avatarBox =
      q(".contact-card .avatar-mentor", secMentor) ||
      q(".contact-card .avatar", secMentor);
    if (!avatarBox) return;

    const nameEl  = q(".contact-card .avatar-1 p:nth-of-type(1) strong", secMentor);
    const roleEl  = q(".contact-card .avatar-1 p:nth-of-type(2)", secMentor);
    const phoneEl = q(".contact-card .avatar-1 p:nth-of-type(3)", secMentor);

    const mentor    = (data.mentor ?? "").trim();
    const role      = (data.role ?? "").trim();
    const phone     = (data.phone ?? "").trim();
    const mentorImg = (data.mentorImg || data.avatarUrl || "").trim();

    const ICON_SVG = `
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24" fill="none" stroke="#000"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-circle-user-round"
           style="width:100%;height:100%;display:block;">
        <path d="M18 20a6 6 0 0 0-12 0"/>
        <circle cx="12" cy="10" r="4"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
    `;

    function showIcon(){ avatarBox.innerHTML = ICON_SVG; }

    avatarBox.innerHTML = "";
    if (mentorImg) {
      const imgEl = document.createElement("img");
      imgEl.alt = "멘토 사진";
      imgEl.style.width = "100%";
      imgEl.style.height = "100%";
      imgEl.style.objectFit = "cover";
      imgEl.onerror = showIcon;     // 로드 실패 시 아이콘으로 폴백
      imgEl.src = mentorImg;
      avatarBox.appendChild(imgEl);
    } else {
      showIcon();
    }

    if (nameEl && mentor) nameEl.textContent = mentor;
    if (roleEl && role)   roleEl.textContent = role;
    if (phoneEl && phone) phoneEl.textContent = phone;
  })();

  // ⑥ 행사 사진 (있으면 첫 장, 없으면 기본 이미지 + 로드 실패시에도 기본으로 폴백)
  (function renderGallery() {
    const galleryCard =
      q(".info-box.gallery .info-card") ||
      (byH2("행사 사진") || byH2("행사사진"))?.querySelector(".info-card");

    if (!galleryCard) return;

    const imgs = Array.isArray(data.images)
      ? data.images.filter(Boolean)
      : (data.imageUrl ? [data.imageUrl] : []);

    galleryCard.innerHTML = "";

    const DEFAULT_IMG = "images/no-image.webp"; // 프로젝트에 이 파일이 있어야 함
    const first = imgs[0];

    const cover = document.createElement("img");
    cover.className = "event-cover";
    cover.style.width = "100%";
    cover.style.display = "block";
    cover.style.objectFit = "cover";

    let triedDefault = false;
    cover.onerror = () => {
      if (!triedDefault) {
        triedDefault = true;
        cover.src = DEFAULT_IMG;
      }
    };

    cover.src = first || DEFAULT_IMG;
    galleryCard.appendChild(cover);
  })();
});
