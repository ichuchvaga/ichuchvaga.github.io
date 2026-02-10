/* global document Element */

import ready from 'Utils/documentReady.js';

ready(function() {
  const moreLink = document.querySelector('.js-product-specs-more');
  if (moreLink) {

    moreLink.addEventListener('click', function(e){
      e.preventDefault();

      const list = moreLink.closest('.specs-table');
      const targetLinks = (list) ? list.querySelectorAll(".specs-item--mobile-hidden") : null;
      if (!targetLinks) {
        return false;
      }

      if (moreLink.classList.contains('active')) {
        // hide
        targetLinks.forEach((el, index) => {
          el.style.display = 'none';
        });
        moreLink.classList.remove('active');
        moreLink.text = 'Показать полностью характеристики';
      } else {
        // show
        targetLinks.forEach((el, index) => {
          el.style.display = 'flex';
        });
        moreLink.classList.add('active');
        moreLink.text = 'Свернуть';
      }
    }, false);

    
  }
});
