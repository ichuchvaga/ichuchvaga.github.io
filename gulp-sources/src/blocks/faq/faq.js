/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
  document.addEventListener('click', (event) => {
    const accordion__title = event.target.closest('.faq-tab-head');
    const accordion_item = event.target.closest('.faq-tab');

    const classname = 'faq-tab--collapsed';

    if (accordion__title && accordion_item) {
      event.preventDefault();

      const isCollapsed = accordion_item.classList.contains(classname);
      const section = accordion_item.querySelector('.faq-tab-panel');
      const sectionContent = accordion_item.querySelector('.faq-tab-panel__inner');

      let sectionHeight = 0;
      if (isCollapsed) {
        section.classList.add('notransition');
        section.style.height = 'auto';
        section.offsetHeight;
        //sectionHeight = section.offsetHeight + 4;
        sectionHeight = sectionContent.offsetHeight + 4;        
        section.style.height = null;
        section.classList.remove('notransition');
      } else {
        //sectionHeight = section.scrollHeight;
        sectionHeight = sectionContent.scrollHeight;
      }

      section.style.height = isCollapsed ? 0 : sectionHeight + 'px';
      setTimeout(() => {
        section.style.height = !isCollapsed ? 0 : sectionHeight + 'px';
      }, 1);

      accordion_item.classList.toggle(classname);
    }
  });
});
