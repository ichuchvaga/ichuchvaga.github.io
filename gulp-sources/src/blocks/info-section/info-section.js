/* global document */

import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

import ready from 'Utils/documentReady.js';

ready(function () {
  certSlider();
});

function certSlider(){
  const sliderElement = document.querySelector('.info-features-slider');

  if (sliderElement) {

    new Swiper(sliderElement.querySelector('.swiper'), {
      slidesPerView: 1,
      spaceBetween: 30,
      autoHeight: false,
      loop: false,
      modules: [Navigation],
      navigation: {
        enabled: true,
        nextEl: sliderElement.querySelector('.nav-arrow.next'),
        prevEl: sliderElement.querySelector('.nav-arrow.prev')
      }
    });
    
  }
}