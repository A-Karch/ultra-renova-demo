"use strict";

// Optional visual enhancement: content never depends on this module being loaded.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = [...document.querySelectorAll('.section-heading, .project-layout, .company-copy, .company-panel, .contact-copy')];
  const revealed = new Set();
  let observer = null;

  function applyPreference() {
    observer?.disconnect();
    document.body.classList.toggle('motion-ready', !preference.matches);
    if (preference.matches) {
      targets.forEach(target => target.classList.remove('motion-revealed'));
      return;
    }
    if (!('IntersectionObserver' in window)) return;

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('motion-revealed');
        revealed.add(entry.target);
        observer.unobserve(entry.target);
      });
    }, {threshold: 0.05, rootMargin: '0px 0px -20px 0px'});

    targets.forEach(target => {
      if (!revealed.has(target)) observer.observe(target);
    });
  }

  preference.addEventListener('change', applyPreference);
  applyPreference();
})();
