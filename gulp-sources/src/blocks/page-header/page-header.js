/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
  function hideMenu() {
    var targetId = 'mobile-menu';
    var targetClassToggle = 'mobile-menu--open';
    var menu = document.getElementById(targetId);
    var menuBtn = document.querySelector('.burger[data-target-id="' + targetId  + '"');

    if (targetId && targetClassToggle) {
        //this.classList.toggle('burger--close');

        if (menu && menu.classList.contains(targetClassToggle)) {
          if (menu.classList.contains(targetClassToggle)) {
            menu.classList.remove(targetClassToggle);
          }

          if (menuBtn.classList.contains('burger--close')) {
            menuBtn.classList.remove('burger--close');
          }
          
        }
    }
  }


  document.addEventListener('click', (event) => {
    const headerSearchBtn = event.target.closest('.search-btn');
    const headerSearchPanel = document.querySelector('.header-search-panel');
    let headerSearchInput;
    if (headerSearchPanel) {
      headerSearchPanel.querySelector('.search-field input');
    }

    const classname = 'active';

    if (headerSearchBtn && headerSearchPanel) {
      event.preventDefault();  

      const isActive = headerSearchPanel.classList.contains(classname);
      const section = headerSearchPanel;
      const sectionContent = headerSearchPanel.querySelector('.search-widget');

      let sectionHeight = 0;
      
      if (section.style.display === "none" || section.style.display === "") {
        section.classList.add('notransition');
        section.style.height = "unset";
        section.style.display = "block"; // Set display to block to measure height
        sectionHeight = sectionContent.scrollHeight; // Get the full height
        section.style.height = '0';

        // Trigger reflow to apply the height change
        section.offsetHeight;

        //section.style.height = null;
        section.classList.remove('notransition');
        section.style.transition = 'height 0.3s ease';
        section.style.height = sectionHeight + 'px';

        // Remove the height after the transition
        section.addEventListener('transitionend', function() {
          section.style.height = ''; // Reset height
          //headerSearchInput.focus();
        }, { once: true });

        hideMenu();

      } else {
        // Get the full height of the content
        sectionHeight = sectionContent.scrollHeight;

        // Start the slide-up animation
        section.style.transition = 'height 0.3s ease';
        section.style.height = sectionHeight + 'px'; // Set to full height to animate
        
        // Trigger reflow to apply the height change
        section.offsetHeight;

        // Animate to height 0
        section.style.height = '0';

        // Hide the element after the transition
        section.addEventListener('transitionend', function() {
          section.style.display = 'none'; // Set display to none after animation
          section.style.height = ''; // Reset height
        }, { once: true });

        if (headerSearchInput) {
          headerSearchInput.value = '';
        }
        
      }

      //headerSearchPanel.classList.toggle(classname);
      headerSearchBtn.classList.toggle(classname);
    }
  });
});
