const navButtons = document.querySelectorAll(".activities-nav .nav-button");

navButtons.forEach((clickedButton) => {
    clickedButton.addEventListener("click", () => {
        // 먼저 모든 버튼에서 'active' 클래스를 제거합니다.
        navButtons.forEach((button) => {
            button.classList.remove("active");
        });
        // 그 다음 클릭된 버튼에만 'active' 클래스를 추가합니다.
        clickedButton.classList.add("active");
    });
});

const PAGE_SIZE = 20;
let currentFilter = "전체 활동"; // '전체 활동' | '스터디' | '친목 활동'
let currentPage = 1; // 1-base

function getFilteredItems() {
    if (currentFilter === "전체 활동") return announcements;
    const map = { 스터디: "study", 친목활동: "friendship" };
    const key = map[currentFilter];
    return announcements.filter((item) => item.category === key);
}

const activities = [
    {
        category: "study",
        category_ko: "스터디",
        status: "ongoing", // 상태 클래스
        statusLabel: "진행중",
        title: "웹 개발 스터디",
        desc: "웹 개발 기초부터~~",
        date: "20xx.1.15",
        time: "19:00",
        place: "스터디룸 6",
        participants: "6명 참여",
    },
    {
        category: "study",
        category_ko: "스터디",
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
        category: "friendship",
        category_ko: "친목활동",
        status: "ongoing",
        statusLabel: "진행중",
        title: "MT",
        desc: "백준 문제풀이",
        date: "20xx.2.05",
        time: "18:00",
        place: "스터디룸 3",
        participants: "10명 참여",
    },
    // … 추가
];

const container = document.querySelector(".activities-container");
// activity-card들이 들어갈 부모

function renderActivities(items) {
    container.innerHTML = ""; // 초기화

    items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "activity-card";

        // 상태
        const statusDiv = document.createElement("div");
        statusDiv.className = `status ${item.status}`;
        statusDiv.textContent = item.statusLabel;
        card.appendChild(statusDiv);

        // 내용
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

        // 버튼
        const btn = document.createElement("button");
        btn.className = "detail-button";
        btn.textContent = "세부 사항";
        btn.addEventListener("click", () => {
            alert(`${item.title} 상세 페이지로 이동`);
        });
        card.appendChild(btn);

        container.appendChild(card);
    });
}

// 실행
renderActivities(activities);
