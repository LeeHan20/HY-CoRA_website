// main.js: 페이지 내 공통 인터랙션 스크립트

document.addEventListener('DOMContentLoaded', () => {
  // 모바일 내비 토글 기능
  const btn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('nav ul');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});
