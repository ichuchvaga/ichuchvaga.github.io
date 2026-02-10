/* global document */

// import ready from 'Utils/documentReady.js';
import {defaults} from "goodshare.js";
import tippy from 'tippy.js';

// ready(function() {
//
// });

import ready from 'Utils/documentReady.js';

ready(function() {
  const copyLink = document.querySelector('.js-copy-link');
  let tooltipElem;
  if (copyLink) {

    tooltipElem = tippy(copyLink, {
      content: "Ссылка успешно скопирована!",
      trigger: 'manual',
      showOnCreate: false  
    });
    console.log(tooltipElem);

    copyLink.addEventListener('click', function(e){
        e.preventDefault();

        if (copyLink.dataset.url) {
          updateClipboard(copyLink.dataset.url);
        }        
    });
  }

  function updateClipboard(newClip) {
    let timer;

    navigator.clipboard.writeText(newClip).then(
      () => {
        /* clipboard successfully set */
        console.log(newClip);
        tooltipElem.show();

        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        
        timer = setTimeout(() => {
          tooltipElem.hide();
        }, 5000);
      },
      () => {
        /* clipboard write failed */
      },
    );
  }
});

