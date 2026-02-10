/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
  function moreBanimateLoadedItemstnInit() {
    /*const items = document.querySelectorAll('.news-listing-card');
    if (!items) {
      return false;
    }*/

    /*items.forEach(function(el){
      const textboxHeight = textbox.offsetHeight;
      const textboxContentHeight = textboxInner.offsetHeight;
      if (textboxContentHeight > textboxHeight) {
        moreBtn.classList.add('visible');

        moreBtn.querySelector('.reviews-card__more-btn').addEventListener('click', moreBtnClick);
      }
    });*/
  }



  document.addEventListener('ajaxLoadMore', event => {
    animateLoadedItems();
  }, true);  
});
