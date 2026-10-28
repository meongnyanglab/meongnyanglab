(() => {
  const models = {
    basic: ['멍냥랩 베이직', '예약 급여와 간편한 본체 설정. 한 아이의 규칙적인 식사를 위한 기본 모델입니다.', '59,000원'],
    dual: ['멍냥랩 듀얼', '두 개의 식기와 예약 급여. 함께 사는 아이들의 식사 시간을 챙기는 모델입니다.', '89,000원'],
    smart: ['멍냥랩 스마트 듀얼', '두 아이의 식사 공간과 영상 확인을 함께. 식기 2개, 예약 급여, 앱 연동과 실시간 영상 기능을 갖춘 기획 모델입니다.', '가격 기획 중']
  };
  const dialog = document.querySelector('#product-dialog');
  document.querySelectorAll('[data-model]').forEach(button => button.addEventListener('click', () => {
    const [title, description, price] = models[button.dataset.model];
    document.querySelector('#product-title').textContent = title;
    document.querySelector('#product-description').textContent = description;
    document.querySelector('#product-price').textContent = price;
    const key = button.dataset.model;
    const visual = document.querySelector('#product-visual');
    visual.className = key;
    visual.setAttribute('aria-label', title + ' 전체 모습');
    const features = key === 'smart' ? ['식기 2개 구성', '예약 급여', '앱 연동 · 실시간 영상'] : [key === 'dual' ? '식기 2개 구성' : '식기 1개 구성', '예약 급여', '본체에서 간편하게 설정'];
    document.querySelector('#product-features').replaceChildren(...features.map(text => {
      const li = document.createElement('li'); li.textContent = text; return li;
    }));
    document.querySelector('#product-components').textContent = key === 'basic' ? '본체 · 식기 1개' : '본체 · 식기 2개';
    document.querySelector('#show-application').dataset.selectedModel = key;
    dialog.showModal();
  }));
  document.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(item => item.addEventListener('click', event => { if (event.target === item) { const r = item.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) item.close(); } }));
  document.querySelector('#show-application').addEventListener('click', () => {
    dialog.close();
    const section = document.querySelector('#apply');
    const selected = document.querySelector('[data-interest="' + document.querySelector('#show-application').dataset.selectedModel + '"]');
    if (selected) {
      selected.closest('fieldset').querySelectorAll('input').forEach(input => { input.checked = input === selected; });
    }
    section.hidden = false;
    section.scrollIntoView({behavior: 'smooth'});
    section.querySelector('input').focus({preventScroll: true});
  });
  document.querySelector('[data-policy]').addEventListener('click', () => document.querySelector('#policy-dialog').showModal());
  // Keep survey values browser-only: no names, persistence or external submission.
  document.querySelectorAll('.choice-group input').forEach(input => input.addEventListener('change', () => {
    if (input.checked) input.closest('fieldset').querySelectorAll('input').forEach(other => { if (other !== input) other.checked = false; });
  }));
})();
