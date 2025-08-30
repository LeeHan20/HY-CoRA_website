document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll(".activities-nav .nav-button");
    const container = document.querySelector(".activities-container");
    const paginationEl = document.getElementById("pagination");
    if (!container) return;

    // 페이지당 카드 수
    const PAGE_SIZE = 9;
    let currentFilter = "전체"; // '전체' | '모집중' | '진행중' | '예정' | '완료'
    let currentPage = 1; // 1-base

    // 활동 데이터
    const activities = [
        {
            status: "ongoing",
            statusLabel: "진행중",
            title: "웹 개발 스터디",
            desc: "웹 개발 기초부터~~",
            date: "20xx.1.15",
            time: "19:00",
            place: "스터디룸 6",
            participants: "6명 참여",
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
        },
        // … 필요하면 더 추가
    ];

    // 필터
    function getFilteredItems() {
        if (currentFilter === "전체") return activities;
        const map = {
            모집중: "recruiting",
            진행중: "ongoing",
            예정: "scheduled",
            완료: "done",
        };
        return activities.filter((item) => item.status === map[currentFilter]);
    }

    // 카드 렌더
    function renderActivities(items) {
        container.innerHTML = "";

        if (!items.length) {
            container.innerHTML =
                '<p style="padding:20px;text-align:center;">표시할 활동이 없습니다.</p>';
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
                sessionStorage.setItem(
                    "activities.current",
                    JSON.stringify(item)
                );
                window.location.href = "activities_detail.html";
            });
            card.appendChild(btn);

            container.appendChild(card);
        });
    }

    // 페이지네이션 렌더
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
        wrapper.appendChild(
            makeBtn(
                "‹",
                Math.max(1, currentPage - 1),
                currentPage === 1,
                "이전 페이지"
            )
        );

        for (let p = 1; p <= totalPages; p++) {
            const b = makeBtn(String(p), p, false, `페이지 ${p}`);
            if (p === currentPage) b.classList.add("active");
            wrapper.appendChild(b);
        }

        wrapper.appendChild(
            makeBtn(
                "›",
                Math.min(totalPages, currentPage + 1),
                currentPage === totalPages,
                "다음 페이지"
            )
        );
        wrapper.appendChild(
            makeBtn(
                "»",
                totalPages,
                currentPage === totalPages,
                "마지막 페이지"
            )
        );

        paginationEl.innerHTML = "";
        paginationEl.appendChild(wrapper);
    }

    // 중앙 진입점: 필터 + 페이징 동시 처리
    function applyAndRender() {
        const filtered = getFilteredItems();

        const total = filtered.length;
        const startIdx = (currentPage - 1) * PAGE_SIZE;
        const endIdx = startIdx + PAGE_SIZE;
        const pageItems = filtered.slice(startIdx, endIdx);

        renderActivities(pageItems);
        renderPagination(total, PAGE_SIZE, currentPage);

        // 필요하면 스크롤업 활성화
        // window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 필터 버튼 이벤트
    navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            navButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            currentFilter = btn.textContent.trim();
            currentPage = 1;
            applyAndRender();
        });
    });

    // 초기 렌더
    applyAndRender();
});
