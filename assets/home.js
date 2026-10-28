(() => {
  const models = {
    basic: ['멍냥랩 베이직', '예약 급여와 간편한 본체 설정. 한 아이의 규칙적인 식사를 위한 기본 모델입니다.', '59,000원'],
    dual: ['멍냥랩 듀얼', '두 개의 식기와 예약 급여. 함께 사는 아이들의 식사 시간을 챙기는 모델입니다.', '89,000원'],
    smart: ['멍냥랩 스마트', '앱 연동, 실시간 영상, 식사 확인. 외출 중에도 아이의 식사 모습을 확인하는 모델입니다.', '169,000원']
  };
  const dialog = document.querySelector('#product-dialog');
  document.querySelectorAll('[data-model]').forEach(button => button.addEventListener('click', () => {
    const [title, description, price] = models[button.dataset.model];
    document.querySelector('#product-title').textContent = title;
    document.querySelector('#product-description').textContent = description;
    document.querySelector('#product-price').textContent = price;
    dialog.showModal();
  }));
  document.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(item => item.addEventListener('click', event => { if (event.target === item) { const r = item.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) item.close(); } }));
  document.querySelector('#show-application').addEventListener('click', () => {
    dialog.close();
    const section = document.querySelector('#apply');
    section.hidden = false;
    section.scrollIntoView({behavior: 'smooth'});
    section.querySelector('input').focus({preventScroll: true});
  });
  document.querySelector('[data-policy]').addEventListener('click', () => document.querySelector('#policy-dialog').showModal());
  // Reveal once; keep all content visible without JS or when reduced motion is requested.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    document.querySelectorAll('.story, .section-heading, .product, .smart-inner, .features article').forEach(el => {
      el.classList.add('reveal-ready');
      observer.observe(el);
    });
  }
})();
