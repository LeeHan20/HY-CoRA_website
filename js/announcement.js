document.addEventListener('DOMContentLoaded', function () {
    // === 공지 데이터 ===
    const announcements = [
        {
            category: 'event',
            category_ko: '행사',
            title: '2025 하반기 정기 총회 안내',
            summary: '2025 상반기 정기 총회가 ....',
            date: '2025.08.20',
        },
        {
            category: 'event',
            category_ko: '행사',
            title: '신입생 OT 및 동아리 설명회 개최',
            summary: 'OT 및 설명회 일정이 확정되었습니다...',
            date: '2025.08.18',
        },
        {
            category: 'recruitment',
            category_ko: '모집',
            title: '2025년 2학기 신규 동아리원 모집',
            summary: 'Hy-CoRA에서 열정적인 동아리원을 모집합니다.',
            date: '2025.08.15',
            // 상세용 추가 필드
            badge: '정기 모집',
            qualifications: [
                '학년/전공 무관, 웹에 관심 있는 분',
                '주 1회 정기 모임 참여 가능자',
                'HTML/CSS/JS 기초 지식(우대)',
            ],
            benefits: [
                '실무형 팀 프로젝트 경험',
                '세미나/스터디 자료 제공',
                '활동 증명서 발급 및 네트워킹',
            ],
        },
        {
            category: 'etc',
            category_ko: '기타',
            title: '교내 해커톤 우승!',
            summary: 'Hy-CoRA 1팀이 교내 해커톤에서 우승했습니다.',
            date: '2025.08.10',
        },
        {
            category: 'etc',
            category_ko: '기타',
            title: '동아리 방 정리 및 청소 안내',
            summary: '쾌적한 동아리 활동을 위해...',
            date: '2025.08.05',
        },
        {
            category: 'event',
            category_ko: '행사',
            title: '야식사업',
            summary: '동방에서 싸이버거가?!',
            date: '2025.08.15',
        },
        {
            category: 'recruitment',
            category_ko: '모집',
            title: '멘토모집',
            summary: '웹개발 멘토 모집',
            date: '2025.09.13',
            // 상세용 추가 필드(각각 다르게!)
            badge: '상시 모집',
            qualifications: [
                'JS/React 중 1개 이상 실무/프로젝트 경험',
                '멘티 코드리뷰/세션 진행 가능자',
                '주 1회 온라인 멘토링 가능자',
            ],
            benefits: [
                '멘토 수당(내규에 따름)',
                '커리큘럼/자료 제공',
                '포트폴리오/추천서 지원',
            ],
        },
    ];

    const noticesTableBody = document.querySelector('.notices-table tbody');
    const navButtons = document.querySelectorAll('.notices-nav .nav-button');

    function renderAnnouncements(items) {
        if (!noticesTableBody) return;
        noticesTableBody.innerHTML = '';

        items.forEach((item) => {
            const tr = document.createElement('tr');

            const titleCell = document.createElement('td');
            titleCell.textContent = item.title;
            tr.appendChild(titleCell);

            const summaryCell = document.createElement('td');
            summaryCell.textContent = item.summary;
            tr.appendChild(summaryCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = item.date;
            tr.appendChild(dateCell);

            const categoryCell = document.createElement('td');
            const tag = document.createElement('div');
            tag.classList.add('notice-tag', item.category);
            tag.textContent = item.category_ko;
            categoryCell.appendChild(tag);
            tr.appendChild(categoryCell);

            // ✅ 모집 공고일 때만 상세 페이지로 이동
            if (item.category === 'recruitment') {
                tr.style.cursor = 'pointer';
                tr.title = '상세 보기';
                tr.addEventListener('click', () => {
                    sessionStorage.setItem(
                        'announcement.current',
                        JSON.stringify(item)
                    );
                    window.location.href = 'announcement_detail.html';
                });
            } else {
                tr.style.cursor = 'default';
            }

            noticesTableBody.appendChild(tr);
        });
    }

    // 필터 버튼
    navButtons.forEach((button) => {
        button.addEventListener('click', function () {
            navButtons.forEach((btn) => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.innerText.trim();
            let filtered = announcements;

            if (filter !== '전체') {
                const map = { 행사: 'event', 모집: 'recruitment', 기타: 'etc' };
                const key = map[filter];
                filtered = announcements.filter(
                    (item) => item.category === key
                );
            }

            renderAnnouncements(filtered);
        });
    });

    // 최초 렌더
    renderAnnouncements(announcements);
});
