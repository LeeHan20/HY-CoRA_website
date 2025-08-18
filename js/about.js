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
