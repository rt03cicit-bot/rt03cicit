// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Last update (for sample announcement)
const lastUpdateEl = document.getElementById("lastUpdate");
if (lastUpdateEl) {
  lastUpdateEl.textContent = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Mobile nav toggle
const navBtn = document.getElementById("navbtn");
const nav = document.getElementById("nav");
if (navBtn && nav) {
  navBtn.addEventListener("click", () => nav.classList.toggle("open"));
}
// ===== Hero Carousel (Auto-slide 3 detik) =====
(function initHeroCarousel(){
  const carousel = document.getElementById("heroCarousel");
  const track = document.getElementById("heroTrack");
  const dotsWrap = document.getElementById("heroDots");
  if (!carousel || !track || !dotsWrap) return;

  const slides = Array.from(track.children);
  if (slides.length <= 1) return;

  let index = 0;
  let timer = null;
  const intervalMs = 3000;

  // build dots
  slides.forEach((_, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "heroCarousel__dot";
    d.setAttribute("aria-label", `Slide ${i+1}`);
    d.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(d);
  });

  const dots = Array.from(dotsWrap.children);

  function render(){
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i, userAction=false){
    index = (i + slides.length) % slides.length;
    render();
    if (userAction) restart();
  }

  function next(){
    goTo(index + 1);
  }

  function start(){
    timer = setInterval(next, intervalMs);
  }

  function stop(){
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restart(){
    stop();
    start();
  }

  // pause on hover (desktop)
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);

  // init
  render();
  start();
})();

// ===== Weather: Cibubur (Open-Meteo, no API key) + timestamp WIB =====
(function initWeatherCibubur(){
  const el = document.getElementById("weatherText");
  const timeEl = document.getElementById("weatherTime");
  if (!el) return;

  // Koordinat kira-kira Cibubur
  const lat = -6.35;
  const lon = 106.88;

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code,time` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=Asia%2FJakarta`;

  function codeToText(code){
    if (code === 0) return "Cerah";
    if ([1,2,3].includes(code)) return "Berawan";
    if ([45,48].includes(code)) return "Berkabut";
    if ([51,53,55,56,57].includes(code)) return "Gerimis";
    if ([61,63,65,66,67].includes(code)) return "Hujan";
    if ([80,81,82].includes(code)) return "Hujan (lokal)";
    if ([95,96,99].includes(code)) return "Badai petir";
    return "Cuaca berubah-ubah";
  }

  function fmtWIB(iso){
    // iso contoh: "2026-02-16T14:05"
    if (!iso) return "";
    const d = new Date(iso);
    // Karena timezone sudah Asia/Jakarta dari API, parsing ini biasanya aman.
    // Tapi untuk jaga-jaga, format hanya jam-menit.
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm} WIB`;
  }

  fetch(url)
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(data => {
      const cur = data.current;
      const daily = data.daily;

      const t = Math.round(cur.temperature_2m);
      const feels = Math.round(cur.apparent_temperature);
      const wind = Math.round(cur.wind_speed_10m);
      const desc = codeToText(cur.weather_code);

      const max = daily?.temperature_2m_max?.[0] != null ? Math.round(daily.temperature_2m_max[0]) : null;
      const min = daily?.temperature_2m_min?.[0] != null ? Math.round(daily.temperature_2m_min[0]) : null;
      const range = (max != null && min != null) ? ` • Hari ini ${min}–${max}°C` : "";

      el.textContent = `${desc} • ${t}°C (terasa ${feels}°C) • Angin ${wind} km/jam${range}`;

      if (timeEl) {
        const ts = fmtWIB(cur.time);
        timeEl.textContent = ts ? `• Update ${ts}` : "";
      }
    })
    .catch(() => {
      el.textContent = "Tidak dapat memuat data cuaca saat ini. Silakan coba lagi nanti.";
      if (timeEl) timeEl.textContent = "";
    });
})();

