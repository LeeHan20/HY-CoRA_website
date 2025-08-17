document.addEventListener('DOMContentLoaded', function () {
    const announcements = [
        {
            category: 'event',
            category_ko: '행사',
            title: '2025 하반기 정기 총회 안내',
            summary: '2025 상반기 정기 총회가 ....',
            date: '2025.08.20'
        },
        {
            category: 'event',
            category_ko: '행사',
            title: '신입생 OT 및 동아리 설명회 개최',
            summary: 'OT 및 설명회 일정이 확정되었습니다...',
            date: '2025.08.18'
        },
        {
            category: 'recruitment',
            category_ko: '모집',
            title: '2025년 2학기 신규 동아리원 모집',
            summary: 'Hy-CoRA에서 열정적인 동아리원을 모집합니다.',
            date: '2025.08.15'
        },
        {
            category: 'etc',
            category_ko: '기타',
            title: '교내 해커톤 우승!',
            summary: 'Hy-CoRA 1팀이 교내 해커톤에서 우승했습니다.',
            date: '2025.08.10'
        },
        {
            category: 'etc',
            category_ko: '기타',
            title: '동아리 방 정리 및 청소 안내',
            summary: '쾌적한 동아리 활동을 위해...',
            date: '2025.08.05'
        },
        {
            category: 'event',
            category_ko: '행사',
            title: '야식사업',
            summary: '동방에서 싸이버거가?!',
            date: '2025.08.15'
        }
    ];

    const noticesTableBody = document.querySelector('.notices-table tbody');
    const navButtons = document.querySelectorAll('.notices-nav .nav-button');

    function renderAnnouncements(items) {
        noticesTableBody.innerHTML = ''; // 기존 내용을 초기화합니다.
        items.forEach(item => {
            // 새로운 행(tr)을 생성합니다.
            const noticeRow = document.createElement('tr');
            
            // 제목 셀(td)을 생성하고 텍스트를 추가합니다.
            const titleCell = document.createElement('td');
            titleCell.textContent = item.title;
            noticeRow.appendChild(titleCell);
            
            // 내용 셀(td)을 생성하고 텍스트를 추가합니다.
            const summaryCell = document.createElement('td');
            summaryCell.textContent = item.summary;
            noticeRow.appendChild(summaryCell);
            
            // 일자 셀(td)을 생성하고 텍스트를 추가합니다.
            const dateCell = document.createElement('td');
            dateCell.textContent = item.date;
            noticeRow.appendChild(dateCell);
            
            // 분류 셀(td)을 생성하고, 그 안에 분류 태그(div)를 추가합니다.
            const categoryCell = document.createElement('td');
            const categoryTag = document.createElement('div');
            categoryTag.classList.add('notice-tag', item.category);
            categoryTag.textContent = item.category_ko;
            categoryCell.appendChild(categoryTag);
            noticeRow.appendChild(categoryCell);
            
            // 완성된 행을 테이블 본문(tbody)에 추가합니다.
            noticesTableBody.appendChild(noticeRow);
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            this.classList.add('active');

            const filter = this.innerText;
            let filteredAnnouncements;

            if (filter === '전체') {
                filteredAnnouncements = announcements;
            } else {
                const categoryMap = {
                    '행사': 'event',
                    '모집': 'recruitment',
                    '기타': 'etc'
                };
                const categoryFilter = categoryMap[filter];
                filteredAnnouncements = announcements.filter(item => item.category === categoryFilter);
            }
            renderAnnouncements(filteredAnnouncements);
        });
    });

    // Initial render
    renderAnnouncements(announcements);
});
