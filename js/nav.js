document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav a');
    // 현재 페이지 파일명 (예: "announcement.html")
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach((link) => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
