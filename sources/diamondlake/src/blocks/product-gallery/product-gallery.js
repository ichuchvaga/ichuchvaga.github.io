/* global document */

import ready from 'Utils/documentReady.js';
import Swiper, {Pagination, Navigation} from "swiper";
//import AnimateImages from "@its2easy/animate-images";
import AnimateImages from "@its2easy/animate-images";

Swiper.use([Pagination, Navigation]);

ready(function() {
    const gallery = document.querySelector('.product-gallery--mobile');
    if (gallery) {
        const breakpoint = window.matchMedia('(max-width:1000px)');

        let mySwiper;

        const breakpointChecker = function () {
            if (breakpoint.matches === true) {
                mySwiper = new Swiper('.product-gallery--mobile', {
                    slidesPerView: 1,
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

        const threeSixties = document.querySelectorAll('.product-gallery__image--360');
        if (threeSixties.length) {
            const isJson = (str)  => {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }

            threeSixties.forEach(item => {
                let imagesArray = JSON.parse(item.dataset.images);
                let instance = new AnimateImages(item, {
                    images: imagesArray, /* required */
                    preload: "none",
                    loop: true,
                    fps: 20,
                    draggable: true,
                    autoplay: true,
                    inversion: true,
                    fillMode: "contain",
                });
            });
        }

    }

    const innerGallerySwiper = new Swiper('.js-inner-gallery', {
        slidesPerView: 1,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            enabled: true,
            nextEl: ".product-gallery-nav__next .product-gallery-nav-btn",
            prevEl: ".product-gallery-nav__prev .product-gallery-nav-btn",
        }
    });

    /*
    const thumbs = new Swiper('.product-gallery__slides', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        threshold: 30,
        breakpoints: {
            1000: {
                spaceBetween: 16
            },
        },
    });

    const main = new Swiper('.product-gallery__main', {
        thumbs: {
            swiper: thumbs,
        },
    });

    main.controller = {control: thumbs};
    thumbs.controller = {control: main};*/
});
