(function () {
  const mount = document.getElementById("siteFooter");
  if (!mount) return;

  fetch("footer.html")
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load footer.html");
      return r.text();
    })
    .then((html) => {
      mount.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      // fallback minimal kalau fetch gagal
      mount.innerHTML = `
        <footer class="siteFooter">
          <div class="container footerInner">
            <div class="footerCard">
              <div class="footerPhone"><span class="footerEmoji">📞</span><strong>POS Security:</strong> 021-2933-1957</div>
              <div class="footerText">Yuk kunjungi Instagram RT03 untuk update informasi dan kegiatan warga!</div>
            </div>
          </div>
        </footer>
      `;
    });
})();
