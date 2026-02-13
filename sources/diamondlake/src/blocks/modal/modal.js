/* global document window */

import ready from 'Utils/documentReady.js';
import getScrollSize from 'Utils/getScrollSize.js';
import Swiper, {Pagination, Navigation, Thumbs} from "swiper";
Swiper.use([Pagination, Navigation, Thumbs]);

ready(function () {
    const bodyPaddingRightOriginal = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right'));
    const backdrop = document.createElement('div');

    window.showModal = (targetModalNode) => {
        if ((document.body.clientHeight - document.documentElement.clientHeight) > 0) {
            document.documentElement.style.paddingRight = bodyPaddingRightOriginal + getScrollSize() + 'px';
        }
        document.documentElement.classList.add('modal-open');

        targetModalNode.classList.add('modal--show');
        targetModalNode.style.display = 'block';
        targetModalNode.ariaModal = true;
        targetModalNode.ariaHidden = null;
        targetModalNode.setAttribute('role', 'dialog');

        backdrop.className = 'modal-backdrop';
        document.body.append(backdrop);
    }

    window.closeAllModals = () => {
        document.documentElement.classList.remove('modal-open');
        document.documentElement.style.paddingRight = '';

        document.querySelectorAll('.modal').forEach(function (modal) {
            modal.classList.remove('modal--show');
            modal.style.display = 'none';
            modal.ariaModal = null;
            modal.ariaHidden = true;
            modal.removeAttribute('role');
        });

        backdrop.remove();
    }

    document.addEventListener('click', function (event) {
        const target = event.target.closest('[data-modal]');

        if (target && target.dataset.modal === 'open') {
            event.preventDefault();
            showModal(document.getElementById((target.hash || target.dataset.modalTarget).slice(1)));
        }

        if (target && target.dataset.modal === 'close' || event.target.matches('[aria-modal]') || event.target.matches('.modal')) {
            event.preventDefault();
            closeAllModals();
        }
    });

    const modalGalleries = document.querySelectorAll('.modal-gallery');
    if (modalGalleries.length) {
        const updateArrowsPosition = (swiper, event) => {
            if (window.innerWidth >= 1000) return;

            const activeGallery = document.querySelector('.modal-gallery.modal--show');
            if (!activeGallery) return;

            const arrows = activeGallery.querySelectorAll('.swiper-button-prev, .swiper-button-next');
            if (!arrows.length) return;

            let activeSlideImage = activeGallery.querySelector('.swiper-slide-active .modal-gallery__image');
            if (!activeSlideImage) activeSlideImage = activeGallery.querySelector('.swiper-slide-active .swiper-slide');
            if (!activeSlideImage) return;
            const height = activeSlideImage.getBoundingClientRect().height;

            arrows.forEach(arrow => {
                arrow.style.top = parseInt(height / 2) + 'px';
            });
        }

        modalGalleries.forEach(gallery => {
            const thumbs = gallery.querySelector('.modal-gallery__thumbs');
            const main = gallery.querySelector('.modal-gallery__main');

            const thumbsSlider = new Swiper(thumbs, {
                slidesPerView: 'auto',
                spaceBetween: 16,
                direction: 'horizontal',
                breakpoints: {
                    1000: {
                        direction: 'vertical',
                    }
                }
            });
            const mainSlider = new Swiper(main, {
                slidesPerView: 1,
                thumbs: {
                    swiper: thumbsSlider
                },
                navigation: {
                    nextEl: main.querySelector('.swiper-button-next'),
                    prevEl: main.querySelector('.swiper-button-prev'),
                },
                on: {
                    slideChange: updateArrowsPosition,
                    resize: updateArrowsPosition,
                }
            });

            mainSlider.controller = {control: thumbsSlider};
            thumbsSlider.controller = {control: mainSlider};
        });
    }
});
