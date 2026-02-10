import ready from 'Utils/documentReady.js';
import { addBackToTop } from 'vanilla-back-to-top'
import IMask from 'imask';
//import lazyLoad from './utils/lazyLoad.js';
import 'simplebar';

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;

// sticky blocks
import stickybits from 'stickybits';

ready(function () {
  addBackToTop({
    backgroundColor: 'none',
    cornerOffset: 25, // px
    diameter: 40, // px
    innerHTML: '<svg viewBox="0 0 24 24" fill="none"><path d="M18 10L11.7971 5L6 9.90583" stroke="#3C3C3C" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /><path d="M12 19L12 5" stroke="#3C3C3C" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  });

  document.addEventListener('click', event => {
    const loadMore = event.target.closest('.js-load-more');
    if (loadMore) {
      event.preventDefault();
      const url = loadMore.getAttribute('href');
      const target = loadMore.getAttribute('data-target');

      const accContent = loadMore.closest('.accordion__content');
      if (accContent) accContent.style.height = null;

      fetch(url)
        .then(response => response.text())
        .then((response) => {
          document.querySelector(target).innerHTML += response;

          const event = new Event("ajaxLoadMore", {bubbles: true, composed: true});
          document.dispatchEvent(event);
        })
    }
  });

  function scrollIntoViewWithOffset (element_id, offset) {
    const target_elem = document.getElementById(element_id);

    if (target_elem) {
      window.scrollTo({
        behavior: 'smooth',
        top:
          target_elem.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          offset,
      });
    }
  }

  const menuTrigger = document.querySelector('.burger.page-header__toggler');
  const menu = document.getElementById('mobile-menu');

  const scrollToButtons = document.querySelectorAll('.js-scroll-to');
    if (scrollToButtons) {
      scrollToButtons.forEach(function(scrollToBtn){
        scrollToBtn.addEventListener('click', function(e){
          e.preventDefault();

          const target_href = scrollToBtn.getAttribute('href');
          const target_id = target_href.split('#');
          if (target_id && target_id[1]) {

            // check if mobile menu is active
            if (menuTrigger && menuTrigger.classList.contains('burger--close')) {
              menuTrigger.classList.remove('burger--close');
              if (menu.classList.contains('mobile-menu--open')) {
                menu.classList.remove('mobile-menu--open');
              }              
            }

            // fixed header offset
            let scrollOffset = 0;
            const breakpoint = window.matchMedia('(max-width:1229px)');
            if (breakpoint.matches === true) {
              const headerHeight = document.querySelector('.page-header').offsetHeight;
              if (headerHeight) {
                scrollOffset = parseInt(headerHeight);
              }
            }

            scrollIntoViewWithOffset(target_id[1], scrollOffset);
          }
        });
      });
    }

  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name*="phone"]');
  if (phoneInputs) {

    phoneInputs.forEach(input => {
      IMask(input, {mask: '+{7} (000) 000 00 00'});
      //IMask(input, {mask: '+[000000000000000]'});

      input.addEventListener('focus', function(){
        if (input.value == '') {
          input.placeholder = '+7 (000) 000 00 00';
        }
      });

      input.addEventListener('blur', function(){
        if (input.value == '') {
          input.placeholder = '';
        }
      });
    });
  }

  function scrollToHashOnPageLoad() {
    if (location.hash) {
      const hashSectionElem = document.querySelector(location.hash);

      if (hashSectionElem) {
        setTimeout(() => {
          window.scrollTo({
            behavior: 'smooth',
            top: hashSectionElem.getBoundingClientRect().top + window.scrollY
          });
        }, 300);
      }
    }
  }
  scrollToHashOnPageLoad();

  //
  stickybits('.js-sticky');
});

/* global document */