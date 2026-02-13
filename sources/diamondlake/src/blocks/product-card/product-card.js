/* global document */

import ready from 'Utils/documentReady.js';
import Swiper, {Pagination} from "swiper";
Swiper.use([Pagination]);

ready(function() {
    const gallery = document.querySelectorAll('.product-card__slider');
    if (gallery.length) {
        gallery.forEach(item => {
            new Swiper(item, {
                slidesPerView: 1,
                pagination: {
                    el: item.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                navigation: {
                    nextEl: item.querySelector(".swiper-button-next"),
                    prevEl: item.querySelector(".swiper-button-prev"),
                },
            });
        })
    }

    const likes = document.querySelectorAll('.product-card__likes');
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
});
