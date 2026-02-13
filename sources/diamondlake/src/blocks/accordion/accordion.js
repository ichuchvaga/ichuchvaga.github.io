/* global document */

import ready from 'Utils/documentReady.js';

ready(function () {
    document.addEventListener('click', (event) => {
        const accordion__title = event.target.closest('.accordion__title');
        const accordion_item = event.target.closest('.accordion__item');
        const accordion_close = event.target.closest('.accordion__close');

        const classname = 'accordion__item--collapsed';

        if (accordion__title && accordion_item) {
            event.preventDefault();

            const isCollapsed = accordion_item.classList.contains(classname);
            const section = accordion_item.querySelector('.accordion__content');

            let sectionHeight = 0;
            if (isCollapsed) {
                section.classList.add('notransition');
                section.style.height = 'auto';
                section.offsetHeight;
                sectionHeight = section.offsetHeight + 4;
                section.style.height = null;
                section.classList.remove('notransition');
            } else {
                sectionHeight = section.scrollHeight;
            }

            section.style.height = isCollapsed ? 0 : sectionHeight + 'px';
            setTimeout(() => {
                section.style.height = !isCollapsed ? 0 : sectionHeight + 'px';
            }, 1);

            accordion_item.classList.toggle(classname);
        }

        if (accordion_close) {
            event.preventDefault();
            accordion_close.closest('.accordion').querySelectorAll('.accordion__item:not(.'+ classname +')').forEach(item => {
                const section = item.querySelector('.accordion__content');
                let sectionHeight = section.scrollHeight;
                section.style.height = sectionHeight + 'px';
                setTimeout(() => {
                    section.style.height = 0;
                }, 1);

                item.classList.add(classname);
            });
        }
    });
});
