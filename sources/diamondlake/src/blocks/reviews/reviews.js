/* global document */

import ready from 'Utils/documentReady.js';
import Swiper, {Pagination} from "swiper";
Swiper.use([Pagination]);

ready(function() {
    const reviewSlider = document.getElementById('reviews-slider');
    if (reviewSlider) {
        const swiper = new Swiper(reviewSlider, {
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true
            },
            /*autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },*/
            autoplay: false,
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: "auto",
                    spaceBetween: 10
                },
                1001: {
                    slidesPerView: "auto",
                    spaceBetween: 10
                }
            }
        });
    }
});
