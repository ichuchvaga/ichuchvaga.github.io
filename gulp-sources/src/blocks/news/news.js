/* global document */

import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';

import ready from 'Utils/documentReady.js';

ready(function () {
  newsSlider();
});

function newsSlider(){
  const sliderElement = document.querySelector('.news-slider');

  if (sliderElement) {

    new Swiper(sliderElement.querySelector('.swiper'), {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      loop: false,
      modules: [Navigation],
      /*pagination: {
        el: sliderElement.querySelector('.swiper-pagination'),
        clickable: true
      },*/
      navigation: {
        enabled: true,
        nextEl: sliderElement.querySelector('.nav-arrow.next'),
        prevEl: sliderElement.querySelector('.nav-arrow.prev')
      },
      breakpoints: {
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
        },
        // when window width is >= 1230px
        1230: {
          slidesPerView: 3,
        }
      }
    });
    
  }
}