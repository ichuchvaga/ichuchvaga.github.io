/* global document */
/* global window */

import ready from 'Utils/documentReady.js';
import Swiper from "swiper";
import lightGallery from "lightgallery";

ready(function() {
    let galleries = document.querySelectorAll('.blog-single-gallery');
    if (galleries.length) {
        galleries.forEach(gallery => {
            lightGallery(gallery, {
                selector: '.blog-single-gallery__link',
                loop: false
            });
        });

        const breakpoint = window.matchMedia('(max-width:1000px)');

        let sliders = [];

        const breakpointChecker = function () {
            if (breakpoint.matches === true) {
                galleries.forEach(gallery => {
                    sliders.push(new Swiper(gallery, {
                        slidesPerView: 'auto',
                        spaceBetween: 16,
                        pagination: {
                            el: gallery.querySelector(".swiper-pagination"),
                            clickable: true,
                        },
                    }));
                })
            } else if (breakpoint.matches === false) {
                if (sliders.length) {
                    sliders.forEach(slider => {
                        slider.destroy(true, true);
                    });
                    sliders = [];
                }
            }
        };

        breakpoint.addEventListener('change', breakpointChecker);
        breakpointChecker();
    }
});
