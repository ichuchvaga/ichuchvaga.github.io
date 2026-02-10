/* global document */

import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';
import GLightbox from 'glightbox';

import ready from 'Utils/documentReady.js';

ready(function () {
  certSlider();

  const items = document.querySelectorAll('.certificate-item__img');
  if (items.length) {
    const lightbox = GLightbox({
      selector: '.certificate-item__img',
    });
  }
});

function certSlider(){
  const sliderElement = document.querySelector('.certificates-gallery');

  if (!sliderElement) {
    return false;
  }

  /*new Swiper(sliderElement.querySelector('.swiper'), {
    slidesPerView: 5,
    spaceBetween: 0,
    loop: false,
    modules: [Navigation],
    navigation: {
      enabled: true,
      nextEl: sliderElement.querySelector('.nav-arrow.next'),
      prevEl: sliderElement.querySelector('.nav-arrow.prev')
    }
  });*/

  const breakpoint = window.matchMedia('(min-width:1230px)');
  let mySwiper;
  let swiperConfig = {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: false,
    modules: [Navigation],
    navigation: {
      enabled: true,
      nextEl: sliderElement.querySelector('.nav-arrow.next'),
      prevEl: sliderElement.querySelector('.nav-arrow.prev')
    }
  };

  const breakpointChecker = function () {
    if (breakpoint.matches === true) {
      if (mySwiper !== undefined) {
        mySwiper.destroy(true, true);
      }
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };

  const enableSwiper = function () {
    mySwiper = new Swiper(sliderElement.querySelector('.swiper'), swiperConfig);
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
}
