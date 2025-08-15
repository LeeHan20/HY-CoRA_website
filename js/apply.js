const navButtons = document.querySelectorAll('.recruitment-nav .nav-button');

        navButtons.forEach(clickedButton => {
            clickedButton.addEventListener('click', () => {
                // 먼저 모든 버튼에서 'active' 클래스를 제거합니다.
                navButtons.forEach(button => {
                    button.classList.remove('active');
                });
                // 그 다음 클릭된 버튼에만 'active' 클래스를 추가합니다.
                clickedButton.classList.add('active');
            });
        });