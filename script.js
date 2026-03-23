// Обработка внешних ссылок
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    // Дополнительная безопасность для внешних ссылок
    if (!link.hasAttribute("rel")) {
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
});

// Оптимизированная анимация появления секций
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add("visible");
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll(".section, .card, .mini-card, .stat-card, .task-card");
  sections.forEach((section) => observer.observe(section));
} else {
  // Для пользователей с prefers-reduced-motion просто показываем всё сразу
  const sections = document.querySelectorAll(".section, .card, .mini-card, .stat-card, .task-card");
  sections.forEach((section) => section.classList.add("visible"));
}

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      
      // Обновляем URL без перезагрузки страницы
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    }
  });
});
