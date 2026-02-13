/* global document window performance requestAnimationFrame */

import ready from 'Utils/documentReady.js';
//import 'simplebar';
import Swiper, {Scrollbar} from "swiper";
Swiper.use([Scrollbar]);

ready(function () {
    const slider = document.querySelector('.main-reasons__slider');
    if (slider) {
        new Swiper(slider, {
            slidesPerView: 1,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: false,
            }
        });
    }
});