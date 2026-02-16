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
