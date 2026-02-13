/* global document */

import ready from 'Utils/documentReady.js';
import Swiper, {Pagination} from "swiper";
Swiper.use([Pagination]);

ready(function() {
    const buttonCart = document.querySelector('.page-header__cart');
    if (buttonCart) {
        buttonCart.addEventListener('click', event => {
            event.preventDefault();
            document.documentElement.classList.toggle('cart-open');
            document.documentElement.classList.remove('menu-opened');
        })
    }

    document.addEventListener('click', event => {
        const miniCartWrapper = event.target.closest('.mini-cart');
        const miniCartInner = event.target.closest('.mini-cart__inner');

        const close = event.target.closest('.mini-cart__close');
        const closeBtn = event.target.closest('.mini-cart__close-button');

        if ((miniCartWrapper && !miniCartInner) || close || closeBtn) {
            event.preventDefault();
            document.documentElement.classList.remove('cart-open');
        }
    });

    const recommendSlider = document.querySelector('.mini-cart-recommend__slider');
    if (recommendSlider) {
        const swiper = new Swiper(recommendSlider, {
            slidesPerView: 1,
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true
            },
        });
    }
});
