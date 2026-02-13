/* global document */

import ready from 'Utils/documentReady.js';
import Swiper from "swiper";

ready(function() {
    const thumbs = new Swiper('.gallery', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true,
        breakpoints: {
            1000: {
                freeMode: false,
                slidesPerView: 4,
            },
        },
    });
});
