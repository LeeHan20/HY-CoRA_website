document.addEventListener('DOMContentLoaded', () => {
        const navButtons = document.querySelectorAll('.notices-nav .nav-button');
        const noticeItems = document.querySelectorAll('.notices-list .notice-item');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. 모든 버튼에서 'active' 클래스 제거
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // 2. 클릭된 버튼에 'active' 클래스 추가
                button.classList.add('active');

                // 3. 버튼의 텍스트에 따라 필터링
                const filter = button.textContent.trim();

                // 모든 공지사항 항목 숨기기
                noticeItems.forEach(item => {
                    item.style.display = 'none';
                });

                // 필터에 맞는 공지사항 항목만 보이게 하기
                if (filter === '전체') {
                    noticeItems.forEach(item => {
                        item.style.display = 'flex'; // 전체는 모두 보여줌
                    });
                } else {
                    const filterClass = getFilterClass(filter);
                    const filteredItems = document.querySelectorAll(`.notices-list .${filterClass}`);
                    filteredItems.forEach(item => {
                        item.style.display = 'flex'; // 필터에 맞는 항목만 보여줌
                    });
                }
            });
        });

        // 텍스트에 해당하는 클래스명을 반환하는 헬퍼 함수
        function getFilterClass(text) {
            switch (text) {
                case '행사': return 'event';
                case '모집': return 'recruitment';
                case '기타': return 'etc';
                default: return '';
            }
        }
    });
    
