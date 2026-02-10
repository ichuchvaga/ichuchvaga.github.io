/* global document */

import ready from 'Utils/documentReady.js';
import autosize from 'autosize';

ready(function() {
  autosize(document.querySelectorAll('textarea'));

  document.addEventListener('click', event => {
    const toggle = event.target.closest('.field-text__password-toggle');
    if (toggle) {
      event.preventDefault();
      const input = toggle.closest('.field-text').querySelector('.field-text__input')
      toggle.classList.toggle('active');
      input.type = (input.type == 'password' ? 'text' : 'password');
    }
  });
});
