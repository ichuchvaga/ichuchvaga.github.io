/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileSubmenusContainer = mobileMenu.querySelector('.mobile-submenus');
  let mobileSubmenus;
  if (mobileSubmenusContainer) {
    mobileSubmenus = mobileSubmenusContainer.querySelectorAll('.mobile-submenu');
  }

  if (mobileMenu && mobileSubmenusContainer) {
    const links = mobileMenu.querySelectorAll('.mobile-menu-nav__item--has-child');
    if (links) {
      links.forEach(function(item){
        const link = item.querySelector('.mobile-menu-nav__link');
        if (link) {
          link.addEventListener('click', function(event) {
            event.preventDefault();
            item.classList.toggle('mobile-menu-nav__item--show-child');

            if (mobileSubmenus) {
              mobileSubmenus.forEach((elem) => {
                if (elem.dataset.id && (elem.dataset.id == link.dataset.id)) {
                  if (elem.style.display != 'block') {
                    elem.style.display = 'block';
                  }
                } else {
                  if (elem.style.display != 'none') {
                    elem.style.display = 'none';
                  }
                }
              });
            }

            if (!mobileSubmenusContainer.classList.contains('mobile-submenus--open')) {
              mobileSubmenusContainer.classList.add('mobile-submenus--open');
            }
          });
        }        
      });
    }
    /*
    const linkClassName = 'mobile-menu-nav__item--has-child';
    const linkClassNameShowChild = 'mobile-menu-nav__item--show-child';
    const findLinkClassName = new RegExp(linkClassName);

    document.addEventListener('click', function(event) {
      if (findLinkClassName.test(event.target.className)) {
        event.preventDefault();
        event.target.classList.toggle(linkClassNameShowChild);
      }

      const parentLink = event.target.closest('.mobile-menu-nav__item--has-child .mobile-menu-nav__link');
      if (parentLink) {
        event.preventDefault();
        const parent = parentLink.closest('.mobile-menu-nav__item--has-child');
        parent.classList.toggle('mobile-menu-nav__item--show-child');
      }
    });*/
  }

  const backBtn = document.querySelectorAll('.js-mobile-submenu-back');
  if (backBtn && mobileSubmenusContainer) {
    backBtn.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();

        if (mobileSubmenusContainer.classList.contains('mobile-submenus--open')) {
          mobileSubmenusContainer.classList.remove('mobile-submenus--open');
        }

        const activeParentLinks = document.querySelectorAll('.mobile-menu-nav__item--show-child');
        if (activeParentLinks) {
          activeParentLinks.forEach((elem) => {
            elem.classList.remove('mobile-menu-nav__item--show-child');
          });
        };
      }, false);
    });
  }
});