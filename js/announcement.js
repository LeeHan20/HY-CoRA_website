document.addEventListener("DOMContentLoaded", function () {
    // === 공지 데이터 ===
    const announcements = [
        {
            category: "recruitment",
            category_ko: "모집",
            title: "2025년 2학기 신규 동아리원 모집",
            summary: "HY-CoRA에서 열정적인 동아리원을 모집합니다.",
            content: "# 2025-2 HY-CoRA 등록 안내
                📌  회비: 20,000원
        📌  총무 계좌: 3333340325822 카카오뱅크 (최재호)

2학기에는 다음과 같은 활동이 예정되어 있습니다.
📌  파이썬, 데이터분석, c/c++, 자료구조 스터디
📌  asv 부스 활동
📌  열공단 활동
📌  회사 방문 프로그램
📌  웹사이트 제작 프로젝트 활동

많은 참여 부탁드립니다!
감사합니다."
            date: "2025.09.09 ~ 2025.12.31",
            lastModified: "2025.09.04",
            // 상세용 추가 필드
            capacity: "0명",
            link: "https://forms.gle/VNBfTQnM1K67MSbH8",
        },
        {
            category: "recruitment",
            category_ko: "모집",
            title: "2025년 2학기 신규 동아리원 모집",
            summary: "HY-CoRA에서 열정적인 동아리원을 모집합니다.",
            date: "2025.09.12 ~ 2025.12.17",
            lastModified: "2025.09.12",
            // 상세용 추가 필드
            capacity: "0명",
            link: "공지글 참고",
        },
        // Design #21 일단 안 보이게 해놓음
        // {
        //     category: "event",
        //     category_ko: "행사",
        //     title: "2025 하반기 정기 총회 안내",
        //     summary: "2025 상반기 정기 총회가 ....",
        //     date: "2025.08.20",
        //     time: "10:00-12:00",
        //     location: "복지관 425호",
        //     lastModified: "2025.08.30",
        //     content: `Q1. 2025 해피무브 지원 동기어릴 적부터 지역사회에서 진행된 소규모 봉사활동에 참여하며,
        //         봉사가 개인의 삶뿐 아니라 공동체 전반에 미치는 영향을 관찰해 왔습니다.
        //         대학 재학 중에는 주기적으로 환경정화 및 학습 멘토링 활동에 참여하며 나눔의 가치를 내면화했습니다.
        //         해피무브는 다양한 문화권의 현장에서 CSR 프로젝트를 기획·실행함으로써,
        //         봉사의 의미를 한층 심화할 수 있는 기회를 제공합니다.
        //         특히 현지 전문가와의 협업 과정을 통해 현실적인 문제 해결 방안을 탐색하고,
        //         이를 문서화하여 정책 제안으로 발전시키는 경험은 장기적으로 사회공헌 역량을 제고하는 기반이 될 것입니다.`,
        // },
        // {
        //     category: "event",
        //     category_ko: "행사",
        //     title: "신입생 OT 및 동아리 설명회 개최",
        //     summary: "OT 및 설명회 일정이 확정되었습니다...",
        //     date: "2025.08.18",
        //     time: "18:00-21:00",
        //     location: "학연산클러스터 501",
        //     lastModified: "2025.08.30",
        //     content:
        //         "Q1. 2025 해피무브 지원 동기어릴 적부터 지역사회에서 진행된 소규모 봉사활동에 참여하며, 봉사가 개인의 삶뿐 아니라 공동체 전반에 미치는 영향을 관찰해 왔습니다. 대학 재학 중에는 주기적으로 환경정화 및 학습 멘토링 활동에 참여하며 나눔의 가치를 내면화했습니다. 해피무브는 다양한 문화권의 현장에서 CSR 프로젝트를 기획·실행함으로써, 봉사의 의미를 한층 심화할 수 있는 기회를 제공합니다. 특히 현지 전문가와의 협업 과정을 통해 현실적인 문제 해결 방안을 탐색하고, 이를 문서화하여 정책 제안으로 발전시키는 경험은 장기적으로 사회공헌 역량을 제고하는 기반이 될 것입니다.",
        // },
        // {
        //     category: "etc",
        //     category_ko: "기타",
        //     title: "교내 해커톤 우승!",
        //     summary: "Hy-CoRA 1팀이 교내 해커톤에서 우승했습니다.",
        //     date: "2025.08.10",
        //     lastModified: "2025.08.30",
        // },
        // {
        //     category: "etc",
        //     category_ko: "기타",
        //     title: "동아리 방 정리 및 청소 안내",
        //     summary: "쾌적한 동아리 활동을 위해...",
        //     date: "2025.08.05",
        //     lastModified: "2025.08.30",
        // },
        // {
        //     category: "event",
        //     category_ko: "행사",
        //     title: "야식사업",
        //     summary: "동방에서 싸이버거가?!",
        //     date: "2025.08.15",
        //     time: "13:00-15:00",
        //     location: "1공학관 304호",
        //     lastModified: "2025.08.30",
        //     content:
        //         "Q1. 2025 해피무브 지원 동기어릴 적부터 지역사회에서 진행된 소규모 봉사활동에 참여하며, 봉사가 개인의 삶뿐 아니라 공동체 전반에 미치는 영향을 관찰해 왔습니다. 대학 재학 중에는 주기적으로 환경정화 및 학습 멘토링 활동에 참여하며 나눔의 가치를 내면화했습니다. 해피무브는 다양한 문화권의 현장에서 CSR 프로젝트를 기획·실행함으로써, 봉사의 의미를 한층 심화할 수 있는 기회를 제공합니다. 특히 현지 전문가와의 협업 과정을 통해 현실적인 문제 해결 방안을 탐색하고, 이를 문서화하여 정책 제안으로 발전시키는 경험은 장기적으로 사회공헌 역량을 제고하는 기반이 될 것입니다.",
        // },
        // {
        //     category: "recruitment",
        //     category_ko: "모집",
        //     title: "멘토모집",
        //     summary: "웹개발 멘토 모집",
        //     date: "2025.09.13 ~ 2025.10.03",
        //     lastModified: "2025.08.12",
        //     // 상세용 추가 필드(각각 다르게!)
        //     capacity: "0명",
        //     link: "https://forms.gle/8z8JUwfnd78wJjTJ8",
        // },
    ];

    const noticesTableBody = document.querySelector(".notices-table tbody");
    const navButtons = document.querySelectorAll(".notices-nav .nav-button");
    const sortButtons = document.querySelectorAll(".notices-sort .sort-button");
    const paginationEl = document.getElementById("pagination");

    // === 상태 ===
    const PAGE_SIZE = 20;
    let currentFilter = "전체"; // '전체' | '행사' | '모집' | '기타'
    let currentSortOrder = "desc"; // 'asc' | 'desc'
    let currentPage = 1; // 1-base

    // === 유틸: 필터링 및 정렬 ===
    function getFilteredItems() {
        if (currentFilter === "전체") return announcements;
        const map = { 행사: "event", 모집: "recruitment", 기타: "etc" };
        const key = map[currentFilter];
        return announcements.filter((item) => item.category === key);
    }

    function getSortedItems(items) {
        return [...items].sort((a, b) => {
            const dateA = new Date(a.lastModified);
            const dateB = new Date(b.lastModified);
            if (currentSortOrder === "asc") {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    }

    function renderTable(itemsSlice) {
        if (!noticesTableBody) return;
        noticesTableBody.innerHTML = "";

        if (itemsSlice.length === 0) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = 4;
            td.textContent = "표시할 공지가 없습니다.";
            td.style.textAlign = "center";
            tr.appendChild(td);
            noticesTableBody.appendChild(tr);
            return;
        }

        itemsSlice.forEach((item) => {
            const tr = document.createElement("tr");

            const titleCell = document.createElement("td");
            titleCell.textContent = item.title;
            tr.appendChild(titleCell);

            const summaryCell = document.createElement("td");
            summaryCell.textContent = item.summary;
            tr.appendChild(summaryCell);

            const dateCell = document.createElement("td");
            dateCell.textContent = item.lastModified;
            tr.appendChild(dateCell);

            const categoryCell = document.createElement("td");
            const tag = document.createElement("div");
            tag.classList.add("notice-tag", item.category);
            tag.textContent = item.category_ko;
            categoryCell.appendChild(tag);
            tr.appendChild(categoryCell);

            // 상세 페이지로 이동
            if (item.category === "recruitment") {
                tr.style.cursor = "pointer";
                tr.title = "상세 보기";
                tr.addEventListener("click", () => {
                    sessionStorage.setItem(
                        "announcement.current",
                        JSON.stringify(item)
                    );
                    window.location.href =
                        "announcement_recruitment_detail.html";
                });
            } else if (item.category === "event") {
                tr.style.cursor = "pointer";
                tr.title = "상세 보기";
                tr.addEventListener("click", () => {
                    sessionStorage.setItem(
                        "announcement.current",
                        JSON.stringify(item)
                    );
                    window.location.href = "announcement_notice_detail.html";
                });
            } else if (item.category === "etc") {
                tr.style.cursor = "pointer";
                tr.title = "상세 보기";
                tr.addEventListener("click", () => {
                    sessionStorage.setItem(
                        "announcement.current",
                        JSON.stringify(item)
                    );
                    window.location.href = "announcement_etc_detail.html";
                });
            } else {
                tr.style.cursor = "default";
            }

            noticesTableBody.appendChild(tr);
        });
    }
    // === 렌더: 페이지네이션 ===
    function renderPagination(totalItems, pageSize, current) {
        if (!paginationEl) return;

        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        currentPage = Math.min(current, totalPages); // 범위 보정

        // 버튼 만들기
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
                    applyAndRender(); // 페이지 이동
                });
            }
            return btn;
        };

        const wrapper = document.createElement("div");
        wrapper.className = "pagination-inner";

        // First / Prev
        wrapper.appendChild(makeBtn("«", 1, currentPage === 1, "첫 페이지"));
        wrapper.appendChild(
            makeBtn(
                "‹",
                Math.max(1, currentPage - 1),
                currentPage === 1,
                "이전 페이지"
            )
        );

        // Page numbers (간단히 1~total 모두 표시; 필요 시 윈도우링으로 바꿔도 됨)
        for (let p = 1; p <= totalPages; p++) {
            const btn = makeBtn(String(p), p, false, `페이지 ${p}`);
            if (p === currentPage) btn.classList.add("active");
            wrapper.appendChild(btn);
        }

        // Next / Last
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

        // 교체 렌더
        paginationEl.innerHTML = "";
        paginationEl.appendChild(wrapper);
    }

    //=== 적용 + 렌더 (단일 진입점) ===
    function applyAndRender() {
        const filtered = getFilteredItems();
        const sorted = getSortedItems(filtered);

        const total = sorted.length;
        const startIdx = (currentPage - 1) * PAGE_SIZE;
        const endIdx = startIdx + PAGE_SIZE;
        const pageItems = sorted.slice(startIdx, endIdx);

        renderTable(pageItems);
        renderPagination(total, PAGE_SIZE, currentPage);

        // 메뉴 선택 시 올라가게 하려면 다시 활성화
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth",
        // });
    }

    // === 필터 버튼 이벤트 ===
    navButtons.forEach((button) => {
        button.addEventListener("click", function () {
            navButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            currentFilter = this.dataset.filter;
            currentPage = 1; // ✅ 필터 바꾸면 첫 페이지로
            applyAndRender();
        });
    });

    // === 정렬 버튼 이벤트 ===
    sortButtons.forEach((button) => {
        button.addEventListener("click", function () {
            sortButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            currentSortOrder = this.dataset.sort;
            currentPage = 1;
            applyAndRender();
        });
    });

    // 최초 렌더
    applyAndRender();
});
