/* global document */

import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

import ready from 'Utils/documentReady.js';

ready(function () {
  productsSlider();
});

function productsSlider(){
  const sliderElements = document.querySelectorAll('.products-slider');

  if (sliderElements) {
    sliderElements.forEach(sliderElement => {
      if (sliderElement) {
        new Swiper(sliderElement.querySelector('.swiper'), {
          slidesPerView: 2,
          spaceBetween: 0,
          loop: false,
          modules: [Navigation],
          navigation: {
            enabled: true,
            nextEl: sliderElement.querySelector('.nav-arrow.next'),
            prevEl: sliderElement.querySelector('.nav-arrow.prev')
          },
          breakpoints: {
            // when window width is >= 1230px
            1230: {
              slidesPerView: 4,
            }
          }
        });
        
      }
    });
  }

  
}