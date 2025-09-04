// js/activities.js
document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll(".activities-nav .nav-button");
    const container = document.querySelector(".activities-container");
    const paginationEl = document.getElementById("pagination");
    if (!container) return;

    const PAGE_SIZE = 9;
    let currentFilter = "전체";
    let currentPage = 1;

    // ✅ 여기: 객체 사이 콤마 빠지면 전체가 죽음!
    const activities = [
        {
            status: "scheduled",
            statusLabel: "예정",
            title: "MT",
            desc: "즐거운 엠티!",
            date: "2025.10.31~2025.11.01",
            time: "18:00",
            place: "대부도 이끌림 펜션",
            participants: "30명 참여",
            images: ["images/mt.jpg"],
            intro: "이번 MT는 팀빌딩과 교류를 위한 프로그램으로 진행됩니다.",
            schedule: ["출발", "바베큐", "게임", "정리"],
            mentorImg: "images/mentoring.jpg",
            mentor: "최관우",
            role: "멘토",
            phone: "010-1234-5678",
        },

        {
            status: "done",
            statusLabel: "완료",
            title: "알고리즘 스터디",
            desc: "백준 문제풀이",
            date: "20xx.2.05",
            time: "18:00",
            place: "스터디룸 3",
            participants: "10명 참여",
            images: ["images/field_trip.jpg"],
            intro: "이번 MT는 팀빌딩과 교류를 위한 프로그램으로 진행됩니다.",
            schedule: ["출발", "바베큐", "게임", "정리"],
            mentorImg: "images/mentor-choi.jpg",
            mentor: "최관우",
            role: "멘토",
            phone: "010-1234-5678",
        },
        {
            status: "scheduled",
            statusLabel: "예정",
            title: "MT",
            desc: "술파티",
            date: "20xx.2.05",
            time: "18:00",
            place: "~~펜션",
            participants: "30명 참여",
            duration: "2시간",
            schedule: ["출발", "바베큐", "게임", "정리"],
            mentor: "최관우",
            role: "멘토",
            phone: "010-1234-5678",
            mentorImg: "images/mentor-choi.jpg",
            images: ["images/mt.jpg", "images/mt2.jpg"]
        },
        {
            status: "recruiting",
            statusLabel: "모집중",
            title: "MT",
            desc: "술파티",
            date: "20xx.2.05",
            time: "18:00",
            place: "~~펜션",
            participants: "30명 참여",
            duration: "2시간",
            schedule: ["출발", "바베큐", "게임", "정리"],
            mentor: "최관우",
            role: "멘토",
            phone: "010-1234-5678",
            mentorImg: "images/mentor-choi.jpg",
            images: ["images/mt.jpg", "images/mt2.jpg"]
        },
        {
            status: "ongoing",
            statusLabel: "진행중",
            title: "웹 개발 스터디",
            desc: "웹 개발 기초부터~~",
            date: "20xx.1.15",
            time: "19:00",
            place: "스터디룸 6",
            participants: "6명 참여",
            duration: "2시간",
            schedule: ["출발", "바베큐", "게임", "정리"],
            mentor: "최관우",
            role: "멘토",
            phone: "010-1234-5678",
            mentorImg: "images/mentor-choi.jpg",
            images: ["images/mt.jpg", "images/mt2.jpg"]
        },

        {
            status: "ongoing",
            statusLabel: "진행중",
            title: "웹 개발 스터디",
            desc: "웹 개발 기초부터~~",
            date: "20xx.1.15",
            time: "19:00",
            place: "스터디룸 1",
            participants: "6명 참여",
            duration: "2시간",
            schedule: ["출발", "바베큐", "게임", "정리"],
            mentor: "최관우",
            role: "멘토",
            phone: "010-1234-5678",
            mentorImg: "images/mentor-choi.jpg",
            images: ["images/mt.jpg", "images/mt2.jpg"]
        },
        // ...필요하면 더 추가
    ];

    function getFilteredItems() {
        if (currentFilter === "전체") return activities;
        const map = { 모집중: "recruiting", 진행중: "ongoing", 예정: "scheduled", 완료: "done" };
        return activities.filter((item) => item.status === map[currentFilter]);
    }

    function renderActivities(items) {
        container.innerHTML = "";
        if (!items.length) {
            container.innerHTML = '<p style="padding:20px;text-align:center;">표시할 활동이 없습니다.</p>';
            return;
        }
        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "activity-card";

            const statusDiv = document.createElement("div");
            statusDiv.className = `status ${item.status}`;
            statusDiv.textContent = item.statusLabel;
            card.appendChild(statusDiv);

            const contentDiv = document.createElement("div");
            contentDiv.className = "card-content";
            contentDiv.innerHTML = `
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
        <p>${item.date}</p>
        <p>${item.time}</p>
        <p>${item.place}</p>
        <p>${item.participants}</p>
      `;
            card.appendChild(contentDiv);

            const btn = document.createElement("button");
            btn.className = "detail-button";
            btn.textContent = "세부 사항";
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                sessionStorage.setItem("activities.current", JSON.stringify(item));
                window.location.href = "activities_detail.html";
            });
            card.appendChild(btn);

            container.appendChild(card);
        });
    }

    function renderPagination(totalItems, pageSize, current) {
        if (!paginationEl) return;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        currentPage = Math.min(current, totalPages);

        const makeBtn = (label, page, disabled = false, aria = "") => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "page-btn";
            btn.textContent = label;
            if (aria) btn.setAttribute("aria-label", aria);
            if (disabled) {
                btn.disabled = true;
                btn.classList.add("disabled");
            } else {
                btn.addEventListener("click", () => {
                    currentPage = page;
                    applyAndRender();
                });
            }
            return btn;
        };

        const wrapper = document.createElement("div");
        wrapper.className = "pagination-inner";
        wrapper.appendChild(makeBtn("«", 1, currentPage === 1, "첫 페이지"));
        wrapper.appendChild(makeBtn("‹", Math.max(1, currentPage - 1), currentPage === 1, "이전 페이지"));
        for (let p = 1; p <= totalPages; p++) {
            const b = makeBtn(String(p), p, false, `페이지 ${p}`);
            if (p === currentPage) b.classList.add("active");
            wrapper.appendChild(b);
        }
        wrapper.appendChild(makeBtn("›", Math.min(totalPages, currentPage + 1), currentPage === totalPages, "다음 페이지"));
        wrapper.appendChild(makeBtn("»", totalPages, currentPage === totalPages, "마지막 페이지"));

        paginationEl.innerHTML = "";
        paginationEl.appendChild(wrapper);
    }

    function applyAndRender() {
        const filtered = getFilteredItems();
        const total = filtered.length;
        const startIdx = (currentPage - 1) * PAGE_SIZE;
        const endIdx = startIdx + PAGE_SIZE;
        renderActivities(filtered.slice(startIdx, endIdx));
        renderPagination(total, PAGE_SIZE, currentPage);
    }

    navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            navButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.textContent.trim();
            currentPage = 1;
            applyAndRender();
        });
    });

    applyAndRender();
});
