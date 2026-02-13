jQuery(document).ready(function () {
    catalog_filter();
    catalog_sort();
    product_card();
});

function catalog_filter() {
    const filterButton = document.querySelector('.catalog-filter-button');
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
    }
}

function catalog_sort() {
    const sortBlock = document.querySelector('.catalog-sort');
    const sortBlockContent = document.querySelector('.catalog-sort__content');
    const sortButton = document.querySelector('.catalog-sort-button');
    if (sortBlock) {
        if (sortButton) {
            sortButton.addEventListener('click', e => {
                e.preventDefault();

                if (sortButton.classList.contains('active')) {
                    sortButton.classList.remove('active');
                    sortBlockContent.classList.remove('active');
                    document.querySelector('.page').classList.remove('filter-opened');
                } else {
                    sortButton.classList.add('active');
                    sortBlockContent.classList.add('active');
                    document.querySelector('.page').classList.add('filter-opened');
                }
            });
        }

        /*sortBlock.querySelector('.catalog-sort__title').addEventListener('click', e => {
            e.preventDefault();
            sortButton.classList.remove('active');
            sortBlockContent.classList.remove('active');
        });*/

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
    }
}

function product_card() {
    const gallery = document.querySelectorAll('.product-card2__slider');
    if (gallery.length) {
        gallery.forEach(item => {
            new Swiper(item, {
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        })

        const props = document.querySelectorAll('.product-card2__props');
        if (props.length) {
            props.forEach(item => {
                let options = {
                    slidesPerView: 1,
                    loop: false,
                };
                if (item.querySelectorAll('.swiper-slide').length > 1) {
                    options.navigation = {
                        nextEl: item.querySelector(".swiper-button-next"),
                        prevEl: item.querySelector(".swiper-button-prev"),
                    }
                } else {
                    item.querySelector(".swiper-button-next").remove();
                    item.querySelector(".swiper-button-prev").remove();
                }
                new Swiper(item, options);
            })
        }

        const colors = document.querySelectorAll('.product-card2__color');
        if (colors.length) {
            colors.forEach(color => color.addEventListener('click', e => {
                let index = Array.prototype.slice.call(color.parentElement.children).indexOf(color);
                color.closest('.product-card2').querySelector('.product-card2__slider').swiper.slideTo(index);
            }));
        }
    }

    const likes = document.querySelectorAll('.product-card2__likes');
    if (likes.length) {
        const favoriteHeader = document.querySelector('.page-header__favorite');
        favoriteHeader.addEventListener("animationend", e => {
            favoriteHeader.classList.remove('animate');
        });

        likes.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                item.classList.toggle('product-card__likes--in');

                favoriteHeader.classList.add('animate', 'in');
            });
        });
    }
}