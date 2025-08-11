<script>
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.replace(/\/+$/, '');
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (path.endsWith(href)) a.classList.add('active');
  });
});
</script>
