/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
    const breakpoint = parseInt(getComputedStyle(document.body).getPropertyValue('--breakpoint'));

    document.addEventListener('click', e => {
        if (e.target.closest('.mobile-menu .burger')) {
            document.querySelector('.page').classList.toggle('menu-opened');
            document.body.classList.toggle('menu-opened');
        }
    })

    document.addEventListener('click', e => {
        if (window.matchMedia("(max-width: 1000px)").matches) {
            let menuItem = e.target.closest('.nav-menu__item--has-child');
            if (menuItem) {
                if (!menuItem.classList.contains('nav-menu__item--show-children')) {
                    e.preventDefault();
                    menuItem.classList.add('nav-menu__item--show-children');
                    menuItem.closest('.nav-menu').classList.add('nav-menu--submenu');
                }
            }

            let button = e.target.closest('.nav-menu__link--back');
            if (button) {
                e.preventDefault();
                let nav = button.closest('.nav-menu');
                nav.classList.remove('nav-menu--submenu');
                nav.querySelectorAll('.nav-menu__item--show-children').forEach(item => item.classList.remove('nav-menu__item--show-children'));
            }
        }
    });

    const mobileSubItems = document.querySelectorAll('.mobile-menu__nav-subitem');
    if (mobileSubItems) {
        mobileSubItems.forEach(mobileSubItem => {
            const mobileItem = mobileSubItem.closest('.mobile-menu__nav-item');
            const mobileItemHeading = mobileItem.querySelector('.mobile-menu__nav-heading');

            mobileItemHeading.addEventListener('click', e => {
                const mobileItemToggler = e.target.closest('.mobile-menu__nav-link-icon');
                e.preventDefault();
                e.target.closest('.mobile-menu').classList.toggle('child-opened');
                e.target.closest('.mobile-menu__nav-item').classList.toggle('opened');
            });
        })
    }
});
