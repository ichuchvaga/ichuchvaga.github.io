/* global document */

import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';

import ready from 'Utils/documentReady.js';

ready(function () {
  projectsSlider();
});

function projectsSlider(){
  const sliderElement = document.querySelector('.main-projects');

  if (!sliderElement) {
    return false;
  }

  const breakpoint = window.matchMedia('(min-width:1230px)');
  let mySwiper;
  let swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    modules: [Navigation],
    navigation: {
      enabled: true,
      nextEl: sliderElement.querySelector('.gallery .nav-arrow.next'),
      prevEl: sliderElement.querySelector('.gallery .nav-arrow.prev')
    }
  };

  const breakpointChecker = function () {
    if (breakpoint.matches === true) {
      if (mySwiper !== undefined) {
        mySwiper.destroy(true, true);
      }
      
      swiperConfig.navigation.nextEl = sliderElement.querySelector('.main-projects__buttons .nav-arrow.next');
      swiperConfig.navigation.prevEl = sliderElement.querySelector('.main-projects__buttons .nav-arrow.prev');
      return enableSwiper();
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