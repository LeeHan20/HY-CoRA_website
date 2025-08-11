<script>
document.addEventListener('DOMContentLoaded', async () => {
  const inject = async (sel, url) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const res = await fetch(url);
    el.innerHTML = await res.text();
  };
  await inject('#site-header', '/partials/header.html');
  await inject('#site-footer', '/partials/footer.html');
});
</script>
