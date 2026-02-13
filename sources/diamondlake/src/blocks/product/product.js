/* global document */

import ready from 'Utils/documentReady.js';
import Swiper, {Navigation} from "swiper";
Swiper.use([Navigation]);

import slideToggle from "./anim.js";

ready(function() {
    const collapseSection = (element) => {
        element.style.height = 0 + 'px';
    }
    const expandSection = (element) => {
        const sectionHeight = element.scrollHeight;
        element.style.height = sectionHeight + 'px';
    }

    const gallery = document.querySelector('.product-photos__slider');
    if (gallery) {
        const breakpoint = window.matchMedia('(max-width:1000px)');

        let mySwiper;

        const breakpointChecker = function () {
            if (breakpoint.matches === true) {
                mySwiper = new Swiper(gallery, {
                    slidesPerView: "auto",
                    spaceBetween: 16,
                    centeredSlides: true,
                    centerInsufficientSlides: true,
                    loop: true,
                });
                return;
            } else if (breakpoint.matches === false) {
                if (mySwiper !== undefined) mySwiper.destroy(true, true);
                return;
            }
        };

        breakpoint.addEventListener('change', breakpointChecker);
        breakpointChecker();
    }

    const reviewsGallery = document.querySelector('.product-reviews__slider');
    if (reviewsGallery) {
        new Swiper(reviewsGallery, {
            slidesPerView: 5,
            spaceBetween: 16,
            navigation: {
                nextEl: reviewsGallery.closest('.product-reviews__slider-wrap').querySelector(".swiper-button-next"),
                prevEl: reviewsGallery.closest('.product-reviews__slider-wrap').querySelector(".swiper-button-prev"),
            },
        });
    }

    const detailsTogglers = document.querySelectorAll('.product-details-toggle__toggler');
    if (detailsTogglers.length) {
        detailsTogglers.forEach(elem => {
            elem.addEventListener('click', e => {
                e.target.closest('.product').querySelectorAll('.product-details-toggle').forEach(child => {
                    child.classList.toggle('active')
                    if (child.classList.contains('active')) expandSection(child.querySelector('.product-details-toggle__content'));
                    else collapseSection(child.querySelector('.product-details-toggle__content'));
                });
            })
        })
    }

    const productOptions = document.querySelectorAll('.product-options__item-input');
    if (productOptions.length) {
        productOptions.forEach(input => {
            input.addEventListener('change', e => {
                const parent = e.target.closest('.product-options');
                const selected = parent.querySelector('.product-options__selected-value');
                const selectedMobile = parent.querySelector('.product-options__trigger-mobile');
                if (selected) selected.innerHTML = e.target.value;
                if (selectedMobile) selectedMobile.innerHTML = (input.getAttribute('name') === 'diamondSize') ? input.nextElementSibling.textContent.trim() : e.target.value;
                // const price = parent.querySelector('.product-options__add-price');
                // if (price) price.innerHTML = (e.target.dataset['price']) ? '+' + e.target.dataset['price'] + '€' : '';

                if (parent.classList.contains('product-options--color')) {
                    const colorSample = e.target.nextSibling.querySelector('span');
                    let colorSampleValue = '';
                    const colorDropdown = parent.querySelector('.product-options__main-options .field-select');
                    if (colorSample && !colorDropdown){
                        colorSampleValue = ' ' + colorSample.innerHTML;
                    }
                    //selectedVal.innerHTML = newVal + colorSampleValue;
                    if (selected) selected.innerHTML = e.target.value + colorSampleValue;
                    if (selectedMobile) selectedMobile.innerHTML = e.target.value + colorSampleValue;
                }
            });


            input.nextSibling.addEventListener('mouseenter', e => {
                const parent = e.target.closest('.product-options');
                const price = parent.querySelector('.product-options__add-price');

                // color fix
                const selectedValueText = input.dataset.selectionText;

                const selectedPrice = parseFloat(parent.querySelector('.product-options__item-input:checked').dataset['price']);
                const hoverPrice = parseFloat(e.target.previousSibling.dataset['price']);
                const diff = hoverPrice - selectedPrice;

                let text = '';
                if (diff < 0) text += diff + ' €'
                else if (diff > 0) text += '+' + diff + ' €'

                if (price) price.innerHTML = text;

                const selectedVal = parent.querySelector('.product-options__selected-value');
                let newVal = e.target.innerText;

                // color fix
                if (selectedValueText && (selectedValueText !== '')) {
                    newVal = selectedValueText;
                }
                //if (e.target.classList.contains('product-options__item-label--color')) selectedVal.innerHTML = e.target.innerText;
                if (e.target.classList.contains('product-options__item-label--color')) {
                    const colorSample = e.target.querySelector('span');
                    let colorSampleValue = '';
                    const colorDropdown = parent.querySelector('.product-options__main-options .field-select');
                    if (colorSample && !colorDropdown){
                        colorSampleValue = ' ' + colorSample.innerHTML;
                    }
                    selectedVal.innerHTML = newVal + colorSampleValue;
                }
            });

            input.nextSibling.addEventListener('mouseleave', e => {
                const parent = e.target.closest('.product-options');
                const price = parent.querySelector('.product-options__add-price');
                const selected = parent.querySelector('.product-options__item-input:checked');
                if (price) price.innerHTML = '';

                const selectedVal = parent.querySelector('.product-options__selected-value');
                //if (e.target.classList.contains('product-options__item-label--color')) selectedVal.innerHTML = selected.nextSibling.innerText;
                if (e.target.classList.contains('product-options__item-label--color')) {
                    const colorSample = selected.nextSibling.querySelector('span');
                    let colorSampleValue = '';
                    const colorDropdown = parent.querySelector('.product-options__main-options .field-select');
                    if (colorSample && !colorDropdown){
                        colorSampleValue = ' ' + colorSample.innerHTML;
                    }

                    //selectedVal.innerHTML = newVal + colorSampleValue;

                    selectedVal.innerHTML = selected.dataset.selectionText ? (selected.dataset.selectionText + colorSampleValue) : (selected.nextSibling.innerText + colorSampleValue);
                }
            });
        })
    }

    // color dropdown change event
    const colorSelect = document.querySelectorAll('.product-options--color .field-select__select');
    if (colorSelect) {
        colorSelect.forEach(colorSelectItem => {
            colorSelectItem.addEventListener('choice', e => {
                //e.detail.choice.value
                //const colorInputs = document.querySelectorAll('.product-options__item-input[name="color"]');
                const colorInputs = colorSelectItem.closest('.product-options').querySelectorAll('.product-options__item-input[name*="color"]');
                if (colorInputs) {
                    colorInputs.forEach(item => {
                        const itemLabel = item.parentNode.querySelector('.product-options__item-label span');
                        if (itemLabel) {
                            itemLabel.textContent = e.detail.choice.value;
                        }
                    });
                }
            });
        });

    }

    const productMadeTabLinks = document.querySelectorAll('.product-made-tabs__link');
    if (productMadeTabLinks.length) {
        if (window.innerWidth < 1000) {
            document.querySelectorAll('.product-made-tabs__tab.active').forEach(item => expandSection(item));
        }

        productMadeTabLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const parent = e.target.closest('.product-made-tabs');

                if (window.innerWidth < 1000) {
                    parent.querySelectorAll('.product-made-tabs__tab.active').forEach(item => collapseSection(item));
                }

                parent.querySelectorAll('.product-made-tabs__link').forEach(item => item.classList.remove('active'));
                parent.querySelectorAll('[href="'+e.target.getAttribute('href')+'"]').forEach(item => item.classList.add('active'));
                parent.querySelectorAll('.product-made-tabs__tab').forEach(item => item.classList.remove('active'));
                parent.querySelectorAll(e.target.getAttribute('href')).forEach(item => item.classList.add('active'));

                if (window.innerWidth < 1000) {
                    parent.querySelectorAll('.product-made-tabs__tab.active').forEach(item => expandSection(item));
                }

                return false;
            });
        });
    }

    const productOptionsWrap = document.querySelectorAll('.product-options__items');
    /*if (productOptionsWrap.length) {
        const fillRows = () => {
            productOptionsWrap.forEach(parent => {
                const elems = parent.querySelectorAll('.product-options__item');
                const elemWidth = elems[0].offsetWidth;
                const width = parent.parentNode.offsetWidth;
                let gap = parseInt(getComputedStyle(parent).gap);
                if (isNaN(gap)) gap = 0;

                const rowMaxCount = Math.floor((width + gap) / (elemWidth + gap));
                const rows = Math.ceil(elems.length / rowMaxCount);
                const rowCount = Math.ceil(elems.length / rows);

                parent.style.display = 'grid';
                parent.style['grid-template-columns'] = `repeat(${rowCount}, 1fr)`;
                parent.style['width'] = `fit-content`;

                if (window.innerWidth < 1000) {
                    if (parent.querySelectorAll('.product-options__item-label--square-wide').length >= 3) {
                        parent.style['width'] = null;
                    }
                    if (parent.querySelectorAll('.product-options__item-label--square:not(.product-options__item-label--square-wide)').length) {
                        parent.style['grid-template-columns'] = `repeat(${rowMaxCount}, 1fr)`;
                    }
                }
            });
        }
        document.addEventListener('readystatechange', fillRows);
        window.addEventListener('resize', fillRows);
    }*/

    const productFavoriteButton = document.querySelector('.product-buttons .btn--favorite');
    if (productFavoriteButton) {
        const favoriteHeader = document.querySelector('.page-header__favorite');
        favoriteHeader.addEventListener("animationend", e => {
            favoriteHeader.classList.remove('animate');
        });

        productFavoriteButton.addEventListener('click', e => {
            e.preventDefault();
            productFavoriteButton.classList.toggle('in');
            favoriteHeader.classList.add('animate', 'in');
        });
    }

    const productOptionDropdown = document.querySelectorAll('.js-option-trigger-mobile');
    if (productOptionDropdown.length) {
        productOptionDropdown.forEach(function(el){
            el.addEventListener('click', e => {
                e.preventDefault();

                productOptionDropdown.forEach(trigger => {
                    if (trigger !== el && trigger.classList.contains('active')) {
                        const items = trigger.parentNode.parentNode.parentNode.querySelector('.product-options__items-wrapper');
                        slideToggle(items, 500, trigger);
                    }
                });

                const items = el.parentNode.parentNode.parentNode.querySelector('.product-options__items-wrapper');
                slideToggle(items, 500, el);
            });
        });

    }

    document.addEventListener('click', e => {
        const link = e.target.closest('.copy-link');
        if (link) {
            e.preventDefault();

            if (navigator.clipboard) { // If normal copy method available, use it
                navigator.clipboard.writeText(location.href);
            } else { // Otherwise fallback to the above function
                const textArea = document.createElement("textarea");
                textArea.value = location.href;
                document.body.appendChild(textArea);
                textArea.focus({preventScroll:true});
                textArea.select();
                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error('Unable to copy to clipboard', err);
                }
                document.body.removeChild(textArea);
            }

            let resultBox = document.createElement('div');
            resultBox.classList.add('copy-link__result');
            resultBox.innerHTML = 'Ссылка скопирована';
            link.append(resultBox);
            setTimeout(() => {
                resultBox.remove();
            }, 3000);
        }
    });
});

