/* global document */

import ready from 'Utils/documentReady.js';
import Swiper, {Pagination, Autoplay} from "swiper";
Swiper.use([Pagination, Autoplay]);

ready(function() {
    const swiper = new Swiper('.main-slider', {
        pagination: {
            el: '.main-hero__pagination',
            type: 'bullets',
            clickable: true,
        },
        autoplay: {
            delay: 7000,
        },
        loop: true,
    });
});
