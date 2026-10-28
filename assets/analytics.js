(function () {
  var models = {
    basic: { item_id: 'basic', item_name: '멍냥랩 베이직', price: 59000 },
    dual: { item_id: 'dual', item_name: '멍냥랩 듀얼', price: 89000 },
    smart: { item_id: 'smart', item_name: '멍냥랩 스마트', price: 169000 }
  };
  var selectedModel = '';

  function track(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  }

  function navigation(el, location, name) {
    track('navigation_click', {
      nav_location: location,
      nav_name: name,
      link_url: el.getAttribute('href') || ''
    });
  }

  document.querySelectorAll('.header .logo').forEach(function (el) {
    el.addEventListener('click', function () { navigation(el, 'header', 'home'); });
  });
  document.querySelectorAll('.header nav a').forEach(function (el) {
    el.addEventListener('click', function () {
      navigation(el, 'header', (el.getAttribute('href') || '').replace('#', ''));
    });
  });
  document.querySelectorAll('.header .tools a').forEach(function (el, index) {
    var names = ['product_search', 'customer_info', 'pre_purchase_compare'];
    el.addEventListener('click', function () { navigation(el, 'header_icon', names[index]); });
  });

  var heroCta = document.getElementById('cta-main');
  if (heroCta) {
    heroCta.addEventListener('click', function () {
      track('cta_click', {
        cta_name: 'hero_purchase',
        cta_location: 'hero',
        destination: 'products'
      });
    });
  }

  document.querySelectorAll('[data-model]').forEach(function (button) {
    button.addEventListener('click', function () {
      selectedModel = button.getAttribute('data-model') || '';
      var item = models[selectedModel];
      if (!item) return;
      track('select_item', {
        item_list_id: 'best_products',
        item_list_name: 'best_products',
        items: [{
          item_id: item.item_id,
          item_name: item.item_name,
          price: item.price,
          currency: 'KRW'
        }]
      });
    });
  });

  var smartCta = document.querySelector('.smart-cta');
  if (smartCta) {
    smartCta.addEventListener('click', function () {
      track('cta_click', {
        cta_name: 'smart_compare',
        cta_location: 'smart_banner',
        destination: 'compare'
      });
    });
  }

  document.querySelectorAll('.faq details').forEach(function (item, index) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      var summary = item.querySelector('summary');
      track('faq_open', {
        faq_id: ['model_configuration', 'app_supported_model', 'delivery_as'][index],
        faq_question: summary ? summary.textContent.trim() : '',
        faq_position: index + 1
      });
    });
  });

  var applicationButton = document.getElementById('show-application');
  if (applicationButton) {
    applicationButton.addEventListener('click', function () {
      var item = models[selectedModel] || {};
      track('lead_form_start', {
        form_id: 'lead-form',
        form_name: 'purchase_interest',
        item_id: item.item_id || 'unknown',
        item_name: item.item_name || 'unknown',
        entry_point: 'product_dialog'
      });
    });
  }

  document.querySelectorAll('[data-privacy-open]').forEach(function (button) {
    button.addEventListener('click', function () {
      track('privacy_notice_open', {
        notice_location: button.closest('footer') ? 'footer' : 'lead_form',
        notice_mode: 'info'
      });
    });
  });

  var policyButton = document.querySelector('[data-policy]');
  if (policyButton) {
    policyButton.addEventListener('click', function () {
      track('policy_open', { policy_type: 'terms', link_location: 'footer' });
    });
  }

  document.querySelectorAll('.dialog-close').forEach(function (button) {
    button.addEventListener('click', function () {
      var dialog = button.closest('dialog');
      track('modal_close', {
        modal_name: dialog && dialog.id === 'product-dialog' ? 'product_detail' : 'terms',
        close_method: 'button'
      });
    });
  });

  var footerLogo = document.querySelector('.footer .logo');
  if (footerLogo) {
    footerLogo.addEventListener('click', function () { navigation(footerLogo, 'footer', 'home'); });
  }
  var customerCenter = document.querySelector('.footer a[href="#faq"]');
  if (customerCenter) {
    customerCenter.addEventListener('click', function () {
      navigation(customerCenter, 'footer', 'customer_center');
    });
  }
})();