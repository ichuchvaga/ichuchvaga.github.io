/* global document */

import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

import ready from 'Utils/documentReady.js';
import getScrollSize from 'Utils/getScrollSize.js';

ready(function () {
  offers();
  popups();
});

function offers(){
  const sliderTabs = document.querySelectorAll('.offer-tab');

  if (!sliderTabs) {
    return false;
  }

  sliderTabs.forEach((tab) => {
    if (tab) {
      const breakpoint = window.matchMedia('(min-width:1230px)');
      let mySwiper;
      let swiperConfig = {
        slidesPerView: '1',
        spaceBetween: 40,
        autoHeight: true,
        loop: false,
        modules: [Navigation],
        navigation: {
          enabled: true,
          nextEl: tab.querySelector('.nav-arrow.next'),
          prevEl: tab.querySelector('.nav-arrow.prev')
        }
      };
  
      const breakpointChecker = function () {
        if (breakpoint.matches === true) {
          swiperConfig.slidesPerView = 'auto';
          if (mySwiper !== undefined) {
            mySwiper.destroy(true, true);
          }
  
          return enableSwiper();
        } else if (breakpoint.matches === false) {
          return enableSwiper();
        }
      };
  
      const enableSwiper = function () {
        mySwiper = new Swiper(tab.querySelector('.swiper'), swiperConfig);
      };
  
      breakpoint.addListener(breakpointChecker);
      breakpointChecker();
    }
  });

  
  const tabLinks = document.querySelectorAll('.offer-tab-link');
  if (tabLinks) {
    tabLinks.forEach((tabLink) => {
      tabLink.addEventListener('click', function(e){
        e.preventDefault();

        if (tabLink.classList.contains("active")) {
          return false;
        }

        var tabId = tabLink.dataset.id;

        // upd links
        tabLinks.forEach((link) => {
          if (link.dataset.id == tabId) {
            if (!link.classList.contains('active')) {
              link.classList.add('active');
            }
          } else {
            if (link.classList.contains('active')) {
              link.classList.remove('active');
            }
          }
        });

        // upd tabs
        sliderTabs.forEach((tabPanel) => {
          if (tabPanel.dataset.id == tabId) {
            if (!tabPanel.classList.contains('active')) {
              tabPanel.classList.add('active');
            }
          } else {
            if (tabPanel.classList.contains('active')) {
              tabPanel.classList.remove('active');
            }
          }
        });
      }, false);
    });
  }
}

function popups(){
  const popups = document.querySelector('.service-offer-popups');
  if (!popups) {
    return false;
  }

  const overlay = document.querySelector('.service-offer-popups__bg');
  const bodyPaddingRightOriginal = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right'));

  const offers = document.querySelectorAll('.js-offer-popup-trigger');
  if (offers) {
    offers.forEach(function(offer) {
      offer.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        
        showPopup(offer.dataset.id);
      }, false);
    }); 
  }

  const closeButtons = document.querySelectorAll('.offer-popup__close');
  if (closeButtons) {
    closeButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        
        closeAll();
      }, false);
    }); 
  }

  if (overlay) {
    overlay.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      
      closeAll();
    }, false);
  }

  popups.addEventListener('click', function(e){
    e.stopPropagation();
  }, false);

  function showPopup(popupId) {
    if ((document.body.clientHeight - document.documentElement.clientHeight) > 0) {
      document.body.style.paddingRight = bodyPaddingRightOriginal + getScrollSize() + 'px';
    }

    document.body.classList.add('modal-open');

    document.querySelectorAll('.offer-popup').forEach(function (popup) {
      if (popup.dataset.id == popupId) {
        popup.classList.add('popup--active');
      }      
    });

    overlay.style.display = 'block';
    popups.style.display = 'block';
  }

  function closeAll() {
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';

    document.querySelectorAll('.offer-popup').forEach(function (popup) {
      popup.classList.remove('popup--active');
    });

    if (overlay) {
      overlay.style.display = 'none';
    }

    popups.style.display = 'none';
  }
  
}