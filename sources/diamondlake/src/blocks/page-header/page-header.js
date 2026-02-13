/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
    document.addEventListener('click', e => {
        if (e.target.closest('.page-header__menu-button')) {
            e.preventDefault();
            document.querySelector('.page').classList.toggle('menu-opened');
        }
    });
});
