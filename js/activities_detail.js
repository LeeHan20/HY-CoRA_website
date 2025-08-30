// js/activities_detail.js
document.addEventListener("DOMContentLoaded", () => {
  const q   = (sel, root=document) => root.querySelector(sel);
  const esc = (s) => String(s ?? "");
  const norm= (s) => String(s ?? "").replace(/\s+/g,"").trim();
  const byH2 = (label) => {
    const h2s = Array.from(document.querySelectorAll("h2"));
    const hit = h2s.find(h => norm(h.textContent) === norm(label));
    return hit ? hit.closest(".info-box") : null;
  };

  const raw = sessionStorage.getItem("activities.current") || sessionStorage.getItem("activity.current");
  if(!raw) return;
  const data = JSON.parse(raw);

  // ===== 상단 =====
  const h2 = q(".top-header h2");
  const h5 = q(".top-header h5:last-of-type");
  if (h2) h2.textContent = data.title || "";
  if (h5) h5.textContent = [data.date, data.time, data.place].filter(Boolean).join(" · ");

  // ===== 활동소개 =====
  const secIntro = byH2("활동소개") || byH2("활동 소개");
  if (secIntro) {
    const introText = data.intro || data.desc || "";
    const p = q(".info-card > p", secIntro);
    if (p) p.textContent = introText;
  }

  // ===== 진행일정 =====
  const secTime = byH2("진행일정");
  if (secTime) {
    const ol = q("ol.custom-list, ol", secTime);
    const items = Array.isArray(data.schedule)
      ? data.schedule
      : (typeof data.timeline === "string"
          ? data.timeline.split("|").map(s => s.trim()).filter(Boolean)
          : []);
    if (ol) {
      ol.replaceChildren(...(items || []).map(txt => {
        const li = document.createElement("li");
        li.textContent = txt;
        return li;
      }));
    }
  }

  // ===== 담당자 (mentor 이미지 없으면 Lucide 아이콘) =====
  const secMentor = byH2("담당자 정보") || byH2("담당자정보");
  if (secMentor) {
    const avatarBox = q(".contact-card .avatar", secMentor);
    const imgEl     = avatarBox ? q("img", avatarBox) : null;
    const nameEl  = q(".contact-card .avatar-1 p:nth-of-type(1) strong", secMentor);
    const roleEl  = q(".contact-card .avatar-1 p:nth-of-type(2)", secMentor);
    const phoneEl = q(".contact-card .avatar-1 p:nth-of-type(3)", secMentor);

    const mentor    = data.mentor;
    const role      = data.role;
    const phone     = data.phone;
    const mentorImg = data.mentorImg || data.avatarUrl;

    if (mentorImg && imgEl) {
      imgEl.src = mentorImg;
      imgEl.style.display = "block";
    } else if (avatarBox) {
      // mentor 이미지 없으면 Lucide 아이콘으로 교체
      avatarBox.innerHTML = `<i data-lucide="circle-user-round"></i>`;
      if (window.lucide?.createIcons) {
        window.lucide.createIcons();
      }
    }

    if (nameEl && mentor) nameEl.textContent = mentor;
    if (roleEl && role)   roleEl.textContent = role;
    if (phoneEl && phone) phoneEl.textContent = phone;
  }

  // ===== 행사 사진 (있는 경우만 표시, 없으면 비워둠) =====
  const galleryCard = q(".info-box.gallery .info-card") ||
    (byH2("행사 사진") || byH2("행사사진"))?.querySelector(".info-card");

  const imgs = Array.isArray(data.images)
    ? data.images.filter(Boolean)
    : (data.imageUrl ? [data.imageUrl] : []);

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
    // 이미지가 없으면 그냥 비워둠
  }
});

/* === 멘토 아바타: 이미지 없으면 Lucide 아이콘으로 대체 (행사사진 코드 건드리지 않음) === */
document.addEventListener("DOMContentLoaded", () => {
  const q = (sel, root = document) => root.querySelector(sel);
  const byH2 = (label) => {
    const norm = (s) => String(s ?? "").replace(/\s+/g, "").trim();
    const h2s = Array.from(document.querySelectorAll("h2"));
    const hit = h2s.find((h) => norm(h.textContent) === norm(label));
    return hit ? hit.closest(".info-box") : null;
  };

  // 세션에서 현재 활동 데이터 읽기 (기존 코드 건드리지 않기 위해 내부에서 재로딩)
  let data = null;
  try {
    const raw = sessionStorage.getItem("activities.current") || sessionStorage.getItem("activity.current");
    if (raw) data = JSON.parse(raw);
  } catch (_) {}

  const secMentor = byH2("담당자 정보") || byH2("담당자정보");
  if (!secMentor) return;

  // .avatar-mentor가 있으면 우선, 없으면 .avatar
  const avatarBox =
    q(".contact-card .avatar-mentor", secMentor) ||
    q(".contact-card .avatar", secMentor);

  if (!avatarBox) return;

  const imgEl = avatarBox.querySelector("img");
  const mentorImg = data?.mentorImg || data?.avatarUrl || "";

  // “사진 없으면” 조건: 세션 데이터에 mentorImg가 없거나 빈 값일 때
  if (!mentorImg) {
    // 기존 이미지태그 제거하고 Lucide 아이콘 삽입
    avatarBox.innerHTML = `<i data-lucide="circle-user-round"></i>`;
    // Lucide가 로드되어 있을 때만 안전하게 실행
    try {
      if (window.lucide?.createIcons) window.lucide.createIcons();
    } catch (_) {}
  } else if (imgEl) {
    // 사진이 있으면 기존 이미지에 경로만 세팅 (기존 동작 유지)
    imgEl.src = mentorImg;
    imgEl.style.display = "block";
  }
});

