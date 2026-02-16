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
