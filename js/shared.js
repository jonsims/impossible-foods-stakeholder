document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll progress bar ---
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    }, { passive: true });
  }

  // --- Scroll-reveal for intel cards ---
  const revealCards = document.querySelectorAll('.reveal-ready');
  if (revealCards.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealCards.forEach(card => observer.observe(card));
  } else {
    revealCards.forEach(card => card.classList.add('revealed'));
  }

  // --- Copy to clipboard ---
  const toast = document.querySelector('.toast');
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const quote = btn.closest('.pull-quote');
      if (!quote) return;
      const text = quote.childNodes[0]?.textContent?.trim() || quote.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        if (toast) {
          toast.classList.add('visible');
          setTimeout(() => toast.classList.remove('visible'), 1500);
        }
      }).catch(() => {});
    });
  });
});
