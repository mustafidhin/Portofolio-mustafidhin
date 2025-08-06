// scroll reveal simple
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, {threshold: 0.15});
  revealEls.forEach(el => observer.observe(el));

  // lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.dataset.img;
      const title = card.dataset.title;
      const desc = card.dataset.desc;
      lbImg.src = img;
      lbTitle.textContent = title;
      lbDesc.textContent = desc;
      lightbox.classList.add('active');
    });
  });
  document.getElementById('lb-close').addEventListener('click', ()=> lightbox.classList.remove('active'));
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
});

// PDF-like image slider preview
const pdfLightbox = document.getElementById('pdf-lightbox');
const pdfImg = document.getElementById('pdf-slide-img');
const pdfTitle = document.getElementById('pdf-title');
const pdfPageNum = document.getElementById('pdf-pagenum');
let currentIndex = 1, maxSlides = 1, prefix = '';
function openPdfSlider(card) {
  prefix = card.dataset.sliderPrefix; // e.g. "images/mushaf-imam/page"
  maxSlides = parseInt(card.dataset.sliderCount) || 1;
  currentIndex = 1;
  pdfTitle.textContent = card.dataset.title;
  updateSlide();
  pdfLightbox.classList.add('active');
}
function updateSlide() {
  pdfImg.src = `${prefix}${currentIndex}.jpg`;
  pdfPageNum.textContent = `Halaman ${currentIndex} dari ${maxSlides}`;
}
document.getElementById('prev-slide').addEventListener('click', () => {
  if (currentIndex > 1) currentIndex--;
  updateSlide();
});
document.getElementById('next-slide').addEventListener('click', () => {
  if (currentIndex < maxSlides) currentIndex++;
  updateSlide();
});
document.getElementById('pdf-close').addEventListener('click', () => {
  pdfLightbox.classList.remove('active');
});
pdfLightbox.addEventListener('click', e => {
  if (e.target === pdfLightbox) pdfLightbox.classList.remove('active');
});
