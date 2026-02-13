/* global document */

import ready from 'Utils/documentReady.js';

function collapseSection(element) {
    const sectionHeight = element.scrollHeight;
    const elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(function() {
        element.style.height = sectionHeight + 'px';
        element.style.transition = elementTransition;

        requestAnimationFrame(function() {
            element.style.height = 0 + 'px';
        });
    });

    element.setAttribute('data-collapsed', 'true');
}

function expandSection(element) {
    const sectionHeight = element.scrollHeight;
    element.style.height = sectionHeight + 'px';

    element.addEventListener('transitionend', function handler(e) {
        element.removeEventListener('transitionend', handler);
        element.style.height = null;
    });

    element.setAttribute('data-collapsed', 'false');
}

ready(function() {
    const togglers = document.querySelectorAll('.show-more__toggle');

    document.addEventListener('click', e => {
        const button = e.target.closest('.show-more__toggle');

        if (button) {
            e.preventDefault();
            const toggle = button.closest('.show-more__toggle');
            const toggle_text = toggle.querySelector('.show-more__toggle-text');
            const section = button.closest('.show-more').querySelector('.show-more__content');
            const isCollapsed = section.getAttribute('data-collapsed') === 'true';

            if(isCollapsed) {
                expandSection(section)
                section.setAttribute('data-collapsed', 'false')
                toggle_text.innerHTML = button.getAttribute('data-text-hide');
            } else {
                collapseSection(section)
                toggle_text.innerHTML = button.getAttribute('data-text-show');
            }

            if (toggle_text.innerHTML.length === 0) toggle.style = 'display: none;';
        }
    });
});
