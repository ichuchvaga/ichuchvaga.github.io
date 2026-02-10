/* global document */

import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

import ready from 'Utils/documentReady.js';

ready(function () {
  examples();
});

function examples(){
  const sliderElement = document.querySelector('.service-examples');

  if (sliderElement) {

    new Swiper(sliderElement.querySelector('.swiper'), {
      slidesPerView: '1',
      spaceBetween: 40,
      autoHeight: true,
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