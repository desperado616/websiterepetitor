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

// --- Magic custom cursor ---
const cursor = document.querySelector('.custom-cursor') || (() => {
  const c = document.createElement('div');
  c.className = 'custom-cursor';
  document.body.appendChild(c);
  return c;
})();
window.addEventListener('mousemove', e => {
  cursor.style.left = (e.clientX - 18) + 'px';
  cursor.style.top = (e.clientY - 6) + 'px';
});
[...document.querySelectorAll('a,button,.btn,input,label')].forEach(el => {
  el.addEventListener('mouseenter',()=>cursor.classList.add('grow'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('grow'));
});
window.addEventListener('mousedown',()=>cursor.classList.add('grow'));
window.addEventListener('mouseup',()=>cursor.classList.remove('grow'));
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
// --- 3D animated soft-waves background ---
const three = document.getElementById('three-bg');
if(three){
  const canvas = document.createElement('canvas');
  three.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  const ctx = canvas.getContext('2d');
  let t = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let j=0;j<2;j++){
      ctx.globalAlpha = 0.10+j*0.11;
      ctx.beginPath();
      for(let x=0;x<canvas.width;x+=2){
        let y = Math.sin((x/260)+t*0.9+j*0.6) * (40+26*j) + canvas.height*0.28+16*j+Math.cos(t-0.2*x/500)*9;
        ctx.lineTo(x,y);
      }
      ctx.lineTo(canvas.width,canvas.height);
      ctx.lineTo(0,canvas.height);
      ctx.closePath();
      ctx.fillStyle = j===0?'#eceffc':'#6167dc';
      ctx.fill();
    }
    t+=0.012;
    requestAnimationFrame(draw);
  }
  draw();
}
// Fade-in animation on scroll with staggered spring
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
// Observe all sections
[...document.querySelectorAll(".section")].forEach((section, i) => {
  observer.observe(section);
  section.style.transitionDelay = `${i*110+Math.random()*60}ms`;
});
// Show hero immediately
const hero = document.querySelector(".hero");
if (hero) {
  hero.style.opacity = "1";
  hero.style.transform = "translateY(0) scale(1.02)";
}

