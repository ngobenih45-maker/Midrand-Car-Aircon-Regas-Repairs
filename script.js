const header = document.getElementById("header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();


/* VEHICLE GALLERY LIGHTBOX */
(function () {
  const items = Array.from(document.querySelectorAll('[data-lightbox="vehicle-gallery"]'));
  const lightbox = document.getElementById('vehicleLightbox');
  const image = document.getElementById('lightboxImage');
  const title = document.getElementById('lightboxTitle');
  const counter = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!items.length || !lightbox) return;

  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    const img = item.querySelector('img');
    const strong = item.querySelector('.gallery-caption strong');

    image.src = img ? img.src : item.href;
    image.alt = img ? img.alt : 'Vehicle aircon service work';
    title.textContent = strong ? strong.textContent : 'Vehicle Aircon Service';
    counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function close() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    image.src = '';
  }

  items.forEach((item, index) => {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      show(index);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { show(current - 1); });
  nextBtn.addEventListener('click', function () { show(current + 1); });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) close();
  });

  document.addEventListener('keydown', function (event) {
    if (!lightbox.classList.contains('active')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
})();
