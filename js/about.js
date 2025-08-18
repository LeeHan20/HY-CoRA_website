document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.about-nav .nav-button');

    navButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // 기본 링크 이동 방지
                        
            // 모든 버튼에서 'active' 클래스 제거, 클릭된 버튼에만 추가
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
                        
            // data-target 속성에서 스크롤할 대상 ID 가져오기
            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
                        
            if (targetSection) {
                    // 부드러운 스크롤 적용
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // 섹션의 시작 부분으로 스크롤
                });
            }
        });
    });
});

const leaders = [
    {
        name: "홍길동",
        role: "회장 · Club Lead",
        desc: "동아리 총괄, 연간 로드맵/대외 커뮤니케이션.",
        tags: ["운영", "PM"]
    },
    {
        name: "김영희",
        role: "부회장 · Vice Lead",
        desc: "프로젝트 총괄 및 외부 연계 업무를 담당합니다.",
        tags: ["운영", "PM"]
    },
    {
        name: "박철수",
        role: "교육 · Education",
        desc: "스터디 커리큘럼과 교육 세션을 책임집니다.",
        tags: ["운영", "PM"]
    },
    {
        name: "최수진",
        role: "프로젝트 · Project",
        desc: "웹·앱 프로젝트 기획 및 리드 역할을 수행합니다.",
        tags: ["운영", "PM"]
    },
    {
        name: "이민우",
        role: "운영 · Operations",
        desc: "행정 및 대외 일정 조율을 담당합니다.",
        tags: ["운영", "PM"]
    },
    {
        name: "정다은",
        role: "디자인 · Design",
        desc: "브랜딩 및 디자인 리소스를 관리합니다.",
        tags: ["운영", "PM"]
    },
    {
        name: "한지훈",
        role: "홍보 · PR",
        desc: "홍보 및 외부 커뮤니케이션 전략을 담당합니다.",
        tags: ["운영", "PM"]
    }
];
      
function createLeaderCard(leader) {
  const article = document.createElement('article');
  article.className = 'leader-card';

  // avatar
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  // 실제 사진이 있으면 아래처럼 지정:
  // avatar.style.backgroundImage = 'url("path/to/photo.jpg")';
  // avatar.style.backgroundSize = 'cover';

  // meta (name + role)
  const meta = document.createElement('div');
  meta.className = 'card-meta';

  const nameEl = document.createElement('h3');
  nameEl.className = 'name';
  nameEl.textContent = leader.name;

  const roleEl = document.createElement('div');
  roleEl.className = 'role';
  roleEl.textContent = leader.role;

  meta.appendChild(nameEl);
  meta.appendChild(roleEl);

  // desc (중앙 정렬된 한 줄 또는 두 줄)
  const desc = document.createElement('p');
  desc.className = 'desc';
  desc.textContent = leader.desc;

  // buttons
  const btnRow = document.createElement('div');
  btnRow.className = 'btn-row';

  (leader.tags || []).forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'pill';
    btn.type = 'button';
    btn.textContent = tag;
    btn.addEventListener('click', () => btn.classList.toggle('active'));
    btnRow.appendChild(btn);
  });

  // append in order (grid-areas control visual placement)
  article.appendChild(avatar);
  article.appendChild(meta);
  article.appendChild(desc);
  article.appendChild(btnRow);

  return article;
}

function renderLeaders(list) {
  const grid = document.getElementById('leadersGrid');
  grid.innerHTML = '';
  list.forEach(l => grid.appendChild(createLeaderCard(l)));
}

document.addEventListener('DOMContentLoaded', () => {
  renderLeaders(leaders);
});