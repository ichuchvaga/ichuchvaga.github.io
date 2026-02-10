/* global document */

import ready from 'Utils/documentReady.js';

ready(function () {

    var burgers = document.querySelectorAll('.burger');

    for (var i = 0; i < burgers.length; i++) {
        var burger = burgers[i];
        burger.addEventListener('click', showBurgerTarget);
    }

    function showBurgerTarget() {
        var targetId = this.getAttribute('data-target-id');
        var targetClassToggle = this.getAttribute('data-target-class-toggle');
        if (targetId && targetClassToggle) {
            this.classList.toggle('burger--close');
            document.getElementById(targetId).classList.toggle(targetClassToggle);

            if ((targetId == 'mobile-menu') && this.classList.contains('burger--close')) {
                hideSearch();
            }
        }
    }


    function hideSearch() {
        const headerSearchBtn = document.querySelector('.search-btn');
        const headerSearchPanel = document.querySelector('.header-search-panel');
        
        let headerSearchInput;
        if (headerSearchPanel) {
          headerSearchPanel.querySelector('.search-field input');
        }
      
        const classname = 'active';
      
        if (headerSearchBtn && headerSearchPanel) {
      
          const isActive = headerSearchPanel.classList.contains(classname);
          const section = headerSearchPanel;
          const sectionContent = headerSearchPanel.querySelector('.search-widget');
      
          let sectionHeight = 0;
        
          // Get the full height of the content
          sectionHeight = sectionContent.scrollHeight;
      
          // Start the slide-up animation
          section.style.transition = 'height 0.3s ease';
          section.style.height = sectionHeight + 'px'; // Set to full height to animate
          
          // Trigger reflow to apply the height change
          section.offsetHeight;
      
          // Animate to height 0
          section.style.height = '0';
          section.style.display = 'none'; // Set display to none after animation
          section.style.height = ''; // Reset height
      
        //   // Hide the element after the transition
        //   section.addEventListener('transitionend', function() {
            
        //   }, { once: true });
      
          headerSearchInput.value = '';
      
          if (headerSearchBtn.classList.contains(classname)) {
            headerSearchBtn.classList.remove(classname);
          }
        }
      }
});
