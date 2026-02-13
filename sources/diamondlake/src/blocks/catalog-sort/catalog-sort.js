/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
    /*
    const sortBlock = document.querySelector('.catalog-sort');
    const sortBlockContent = document.querySelector('.catalog-sort__content');
    const sortButton = document.querySelector('.catalog-sort-button');
    if (sortBlock) {
        if (sortButton) {
            sortButton.addEventListener('click', e => {
                e.preventDefault();
                sortButton.classList.add('active');
                sortBlockContent.classList.add('active');
                document.querySelector('.page').classList.add('filter-opened');
            });
        }

        sortBlock.querySelector('.catalog-sort__title').addEventListener('click', e => {
            e.preventDefault();
            sortButton.classList.remove('active');
            sortBlockContent.classList.remove('active');
        });

        document.addEventListener('click', e => {
            if (!e.target.closest('.catalog-sort') && sortBlock) {
                sortButton.classList.remove('active');
                sortBlockContent.classList.remove('active');
            }
        });
    }

    const sortCloseButton = document.querySelector('.catalog-sort__close');
    if (sortCloseButton) {
        sortCloseButton.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector('.page').classList.remove('filter-opened');
            document.querySelector('.catalog-sort__content').classList.remove('active');
            if (sortButton) sortButton.classList.remove('active');
        });
    }*/
});
