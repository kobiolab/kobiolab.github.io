document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.kobiol-slide');
  const prevBtn = document.querySelector('.kobiol-prev');
  const nextBtn = document.querySelector('.kobiol-next');
  const dots = document.querySelectorAll('.kobiol-slider-dot');

  if (!slides.length) return;

  let currentSlide = 0;
  let autoTimer = null;
  const AUTO_DELAY = 5000; // 5 secondi

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('kobiol-slide-active', 'kobiol-slide-fade'));
    dots.forEach(d => d.classList.remove('kobiol-slider-dot-active'));

    slides[index].classList.add('kobiol-slide-active', 'kobiol-slide-fade');
    if (dots[index]) {
      dots[index].classList.add('kobiol-slider-dot-active');
    }

    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, AUTO_DELAY);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextSlide();
      startAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevSlide();
      startAuto();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-kobiol-slide'), 10);
      if (!isNaN(index)) {
        showSlide(index);
        startAuto();
      }
    });
  });

  // Partenza automatica
  startAuto();
});
