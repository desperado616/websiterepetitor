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

// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section").forEach(section => {
  observer.observe(section);
});

// Show hero immediately
const hero = document.querySelector(".hero");
if (hero) {
  hero.style.opacity = "1";
  hero.style.transform = "translateY(0)";
}

