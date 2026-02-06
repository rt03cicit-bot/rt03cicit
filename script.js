const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const lastUpdate = document.getElementById("lastUpdate");
lastUpdate.textContent = new Date().toLocaleDateString("id-ID", { day:"2-digit", month:"short", year:"numeric" });

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
