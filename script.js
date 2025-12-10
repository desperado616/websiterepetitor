const form = document.querySelector(".contact-form");

function buildTelegramUrl(name, topic, contact) {
  const base = "https://t.me/k1ttyklaw";
  const text = `Здравствуйте! Хочу записаться на занятие.%0AИмя: ${name}%0AЗапрос: ${topic}%0AКонтакт: ${contact}%0AУдобное время: `;
  return `${base}?text=${text}`;
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.querySelector("#name")?.value.trim() || "—";
  const topic = form.querySelector("#topic")?.value.trim() || "—";
  const contact = form.querySelector("#contact")?.value.trim() || "—";
  const url = buildTelegramUrl(encodeURIComponent(name), encodeURIComponent(topic), encodeURIComponent(contact));
  window.open(url, "_blank", "noopener");
});

// --- Tick-glow on .dot & .icon ---
[...document.querySelectorAll('.dot,.icon')].forEach((el,i)=>{
  el.animate([
    {filter:'drop-shadow(0 0 6px #eceffc99)',opacity:0.82},
    {filter:'drop-shadow(0 0 20px #6167dc66)',opacity:1},
    {filter:'drop-shadow(0 0 4px #eceffc77)',opacity:0.88}
  ],{
    duration:3400+Math.random()*2400,
    delay:Math.random()*1000,
    iterations:Infinity
  });
});
// Fade-in animation on scroll with staggered spring (disabled on touch / reduce-motion)
const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sections = [...document.querySelectorAll(".section")];

if (isTouch || prefersReducedMotion) {
  sections.forEach((section) => {
    section.classList.add("visible");
    section.style.transition = "none";
    section.style.transform = "none";
  });
} else {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 110 + Math.random()*60); // stagger with a little random
      }
    });
  }, observerOptions);
  sections.forEach((section, i) => {
    observer.observe(section);
    section.style.transitionDelay = `${i*110+Math.random()*60}ms`;
  });
}

// Show hero immediately
const hero = document.querySelector(".hero");
if (hero) {
  hero.style.opacity = "1";
  hero.style.transform = "translateY(0) scale(1.02)";
}

