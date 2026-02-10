/* global document */

import ready from 'Utils/documentReady.js';
import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';

ready(function() {
  const slider = document.querySelector('.read-more__slider');

  if (slider) {
    new Swiper(slider.querySelector('.swiper'), {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      modules: [Navigation, Pagination],
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        1230: {
          slidesPerView: 3,
          spaceBetween: 44,
          pagination: false,
          navigation: {
            nextEl: slider.querySelector(".nav-arrow.next"),
            prevEl: slider.querySelector(".nav-arrow.prev"),
          },
        },
      }
    });
  }
});
