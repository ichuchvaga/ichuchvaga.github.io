/* global document */

import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';

import ready from 'Utils/documentReady.js';

ready(function () {
  certSlider();
});

function certSlider(){
  const sliderElement = document.querySelector('.img-banners-slider');

  if (sliderElement) {

    new Swiper(sliderElement.querySelector('.swiper'), {
      slidesPerView: 1,
      spaceBetween: 30,
      autoHeight: true,
      loop: false,
      modules: [Navigation, Pagination],
      navigation: {
        enabled: true,
        nextEl: sliderElement.querySelector('.nav-arrow.next'),
        prevEl: sliderElement.querySelector('.nav-arrow.prev')
      },
      pagination: {
        bulletActiveClass: 'active',
        clickable: true,
        el: sliderElement.querySelector('.nav-dots')
      }
    });
    
  }
}