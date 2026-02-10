/* global document window */
import ready from './documentReady.js';
import tippy from 'tippy.js';

ready(function () {
    // init tooltips
    const tooltipItems = document.querySelectorAll('.js-tooltip');
    if (!tooltipItems) {
      return false;
    }

    tooltipItems.forEach(element => {

      const breakpoint = window.matchMedia('(min-width:992px)');
      let tooltipConfig = {
        placement: 'bottom',
        arrow: false,
        theme: 'default',
        trigger: 'click',
      }

      if (breakpoint.matches === true) {
        tooltipConfig.placement = 'right';
        tooltipConfig.trigger = 'mouseenter focus';
      }
      
      tippy(element, tooltipConfig);
    });
});
