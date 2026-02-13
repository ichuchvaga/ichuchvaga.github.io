/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
    /* moved filter code to custom.js */
    /*const filterButton = document.querySelector('.catalog-filter-button');
    if (filterButton) {
        filterButton.addEventListener('click', e => {
            e.preventDefault();
            filterButton.classList.toggle('active');
            document.querySelector('.page').classList.toggle('filter-opened');
            document.querySelector('.catalog-filter').classList.toggle('active');
        });

        if (window.innerWidth <= 1000) {
            filterButton.classList.remove('active');
            document.querySelector('.catalog-filter').classList.remove('active');
        }
    }

    const filterCloseButton = document.querySelector('.catalog-filter__close');
    if (filterCloseButton) {
        filterCloseButton.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector('.page').classList.remove('filter-opened');
            document.querySelector('.catalog-filter').classList.remove('active');
            if (filterButton) filterButton.classList.remove('active');
        });
    }

    const filterGroupTitles = document.querySelectorAll('.catalog-filter-group__title');
    if (filterGroupTitles.length) {
        filterGroupTitles.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                document.querySelectorAll('.catalog-filter-group__title').forEach(title => title.classList.remove('active'));
                document.querySelectorAll('.catalog-filter-group__items').forEach(items => items.classList.remove('active'));
                item.classList.add('active');
                item.closest('.catalog-filter-group').querySelector('.catalog-filter-group__input').classList.add('active');
            })
        });
    }

    const filterForm = document.querySelector('.catalog-filter__inner');
    if (filterForm) {
        filterForm.addEventListener('change', e => {
            const formData = new FormData(filterForm);
            let html = '';
            for (const pair of formData.entries()) {
                if (pair[0] === 'price[]') continue;
                html += `<span class="catalog-results-filter"><span class="catalog-results-filter__title">${pair[1]}</span><span class="catalog-results-filter__remove" data-name="${pair[0]}" data-value="${pair[1]}"></span></span>`;
            }
            if (html.length) html += `<span class="catalog-results-filter"><span class="catalog-results-filter__title">Удалить все</span><span class="catalog-results-filter__remove catalog-results-filter__remove--all"></span></span>`;
            document.querySelector('.catalog-results__filters').innerHTML = html;
        });

        document.addEventListener('click', e => {
            const removeFilter = e.target.closest('.catalog-results-filter__remove');
            if (removeFilter) {
                const input = filterForm.querySelector(`[name="${removeFilter.dataset.name}"][value="${removeFilter.dataset.value}"]`);
                if (input) input.checked = false;
                filterForm.dispatchEvent(new Event('change'));
            }

            const removeFilterAll = e.target.closest('.catalog-results-filter__remove--all');
            if (removeFilterAll) {
                document.querySelectorAll('.catalog-results-filter__remove').forEach(elem => {
                    const input = filterForm.querySelector(`[name="${elem.dataset.name}"][value="${elem.dataset.value}"]`);
                    if (input) input.checked = false;
                });
                filterForm.dispatchEvent(new Event('change'));
            }
        });
    }*/
});
