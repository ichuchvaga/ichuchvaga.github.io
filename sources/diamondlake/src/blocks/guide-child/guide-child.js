/* global document */

import ready from 'Utils/documentReady.js';
import Swiper, { Navigation } from "swiper";
Swiper.use([Navigation]);

ready(function() {
    const guideCaratVars = document.querySelector('.guide-carat-vars');
    if (guideCaratVars) {
        const data = JSON.parse(guideCaratVars.dataset.shapes);
        const image = document.querySelector('.guide-carat-vars__stone');

        const current = document.querySelector('.guide-carat-vars__slider .slider__current');
        const sliderInput = document.querySelector('.guide-carat-vars__slider .slider__input');
        // let current_suffix = guideCaratVars.dataset.label;

        // if (!current_suffix || current_suffix == '') {
        //     current_suffix == '';
        // }

        sliderInput.addEventListener('change', e => {
            const input = e.target;
            const value = parseFloat(input.dataset.start) + parseFloat(input.dataset.step) * parseFloat(input.value);
            current.nodeValue = (Math.round(value * 10) / 10).toFixed(2);
            current.textContent = (Math.round(value * 10) / 10).toFixed(2);

            //const newValue = String(Math.round(value * 10) / 10).concat(" ", current_suffix);
            // current.nodeValue = newValue;
            // current.textContent = newValue;
            updateImage();
        });

        const shapes = document.querySelectorAll('[name="guide-carat-shape"]');
        shapes.forEach(input => {
            input.addEventListener('change', e => {
                updateImage();
            });
        });

        function updateImage() {
            const selectedShape = document.querySelector('[name="guide-carat-shape"]:checked').value;
            const value = (parseFloat(sliderInput.value) + 1) / ((parseFloat(sliderInput.dataset.end) - parseFloat(sliderInput.dataset.start)) / parseFloat(sliderInput.dataset.step));
            const imageWidth = data[selectedShape].minWidth + (data[selectedShape].maxWidth - data[selectedShape].minWidth) * value;
            image.setAttribute('src', data[selectedShape].image);
            image.setAttribute('width', imageWidth);
        }
    }

    const guideCaratSlider = document.querySelector('.guide-carat-slider');
    if (guideCaratSlider) {
        const swipers = [];
        document.querySelectorAll('.guide-carat-slider__images').forEach(item => {
            if (item.querySelectorAll('.swiper-slide').length > 1) {
                swipers.push(new Swiper(item.querySelector('.swiper'), {
                    navigation: {
                        nextEl: item.querySelector(".swiper-button-next"),
                        prevEl: item.querySelector(".swiper-button-prev"),
                    },
                    on: {
                        slideChange: function (swiperObject) {
                            swipers.forEach(swiperElem => {
                                swiperElem.slideTo(swiperObject.activeIndex)
                            });
                        },
                    },
                }));
            } else {
                item.querySelector(".swiper-button-next").remove();
                item.querySelector(".swiper-button-prev").remove();
            }
        })

        document.querySelector('.guide-carat-slider .slider__input').addEventListener('change', e => {
            const val = parseInt(e.target.value);
            document.querySelectorAll('.guide-carat-slider__images').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.guide-carat-slider__content-item').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.guide-carat-slider__images')[val].classList.add('active');
            document.querySelectorAll('.guide-carat-slider__content-item')[val].classList.add('active');
        });
    }
});
