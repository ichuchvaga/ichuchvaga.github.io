/* global document */

import ready from 'Utils/documentReady.js';
import Swiper, {Pagination} from "swiper";
Swiper.use([Pagination]);

ready(function() {
    /*
    const gallery = document.querySelectorAll('.product-card2__slider');
    if (gallery.length) {
        gallery.forEach(item => {
            new Swiper(item, {
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        })

        const props = document.querySelectorAll('.product-card2__props');
        if (props.length) {
            props.forEach(item => {
                new Swiper(item, {
                    slidesPerView: 1,
                    loop: true,
                    navigation: {
                        nextEl: item.querySelector(".swiper-button-next"),
                        prevEl: item.querySelector(".swiper-button-prev"),
                    },
                });
            })
        }

        const colors = document.querySelectorAll('.product-card2__color');
        if (colors.length) {
            colors.forEach(color => color.addEventListener('click', e => {
                let index = Array.prototype.slice.call(color.parentElement.children).indexOf(color);
                color.closest('.product-card2').querySelector('.product-card2__slider').swiper.slideTo(index);
            }));
        }
    }

    const likes = document.querySelectorAll('.product-card2__likes');
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
    }*/
    document.addEventListener('click', e => {
        const productCardSlider = e.target.closest('.product-card2__slider');
        if (productCardSlider && window.innerWidth < 1000) {
            e.preventDefault();
            const link = productCardSlider.closest('.product-card2').querySelector('.product-card2__heading-title');
            console.log(link, link.getAttribute('href'));
            productCardSlider.closest('.product-card2').querySelector('.product-card2__heading-title').click();
        }
    });
});
