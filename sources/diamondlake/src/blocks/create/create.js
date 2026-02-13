/* global document */

import ready from 'Utils/documentReady.js';
import Swiper, {Pagination} from "swiper";
Swiper.use([Pagination]);

ready(function() {
    const gallery = document.querySelector('.create__gallery');
    if (gallery) {
        const breakpoint = window.matchMedia('(max-width:1000px)');

        let mySwiper;

        const breakpointChecker = function () {
            if (breakpoint.matches === true) {
                mySwiper = new Swiper('.create__gallery', {
                    slidesPerView: "auto",
                    spaceBetween: 16,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
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
});
