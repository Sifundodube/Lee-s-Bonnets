// ---- PARTICLES ----
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedY = -(Math.random() * 0.4 + 0.1);
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.color = Math.random() > 0.6 ? '#c9985a' : '#e0185e';
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.opacity -= 0.0008;
    if (this.y < -10 || this.opacity <= 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ---- SCROLL REVEAL ----
const cards = document.querySelectorAll('.product-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
cards.forEach(c => observer.observe(c));

// ---- ORDER FORM → WHATSAPP ----
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name       = document.getElementById('fname').value.trim();
  const phone      = document.getElementById('fphone').value.trim();
  const type       = document.getElementById('ftype').value;
  const colour     = document.getElementById('fcolour').value.trim();
  const embroidery = document.getElementById('fembroidery').value.trim();
  const notes      = document.getElementById('fnotes').value.trim();

  if (!name || !phone || !type || !colour) {
    alert('Please fill in all required fields.');
    return;
  }

  let message = `Hi Lee's Designs! 👋 I'd like to place an order:\n\n`;
  message += `👤 *Name:* ${name}\n`;
  message += `📱 *My Number:* ${phone}\n`;
  message += `🎀 *Bonnet Type:* ${type}\n`;
  message += `🎨 *Colour:* ${colour}\n`;
  if (embroidery) message += `✍️ *Embroidery Text:* ${embroidery}\n`;
  if (notes) message += `📝 *Notes:* ${notes}\n`;
  message += `\nPlease confirm availability and payment details. Thank you! ✨`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/27610423655?text=${encoded}`, '_blank');
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
