/* global document */

import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';

import ready from 'Utils/documentReady.js';

ready(function () {
  historySlider();
});

function historySlider(){
  const sliderElement = document.querySelector('.history');
  let sliderInstance;
  
  if (sliderElement) {

    sliderInstance = new Swiper(sliderElement.querySelector('.swiper'), {
      slidesPerView: 1,
      spaceBetween: 30,
      autoHeight: true,
      loop: false,
      modules: [Navigation, Pagination],
      navigation: {
        enabled: true,
        nextEl: sliderElement.querySelector('.history-nav__arrow.next'),
        prevEl: sliderElement.querySelector('.history-nav__arrow.prev')
      },
      pagination: {
        bulletClass: 'history-nav__dot',
        bulletActiveClass: 'active',
        clickable: true,
        el: sliderElement.querySelector('.history-nav__dots')
      }
    });

    sliderInstance.on('slideChange', function () {
      // console.log('slide changed');
      // console.log(this.activeIndex);
      const imgUrl = this.slides[this.activeIndex].querySelector('.history-card').dataset.image;

      const imgElement = document.querySelector(".history__image img");
      //console.log(imgElement.src);
      const parent = imgElement.parentNode;

      // get the parent height
      const sectionHeight = parent.parentNode.scrollHeight; // Get the full height

      imgElement.classList.add('notransition');
      imgElement.style.opacity = "1";

      // Trigger reflow to apply the opacity change
      imgElement.offsetHeight;

      imgElement.classList.remove('notransition');
      imgElement.style.transition = 'opacity 0.3s ease';
      imgElement.style.opacity = '0';

      parent.parentNode.style.height = sectionHeight + 'px';

      // Create new image
      let newImage = document.createElement('img');
      newImage.src = imgUrl;
      newImage.style.opacity = '0';
      newImage.classList.add('notransition');
      newImage.classList.add('new-image');

      parent.append(newImage);

      // Remove the height after the transition
      imgElement.addEventListener('transitionend', function() {
        imgElement.remove();
        // Trigger reflow to apply the opacity change
        newImage.offsetHeight;

        newImage.classList.remove('notransition');
        newImage.style.transition = 'opacity 0.3s ease';
        newImage.style.opacity = '1';

        newImage.addEventListener('transitionend', function() {
          //newImage.style.position = 'static';
          //newImage.classList.remove('new-image');
          //newImage.offsetHeight;
          //parent.parentNode.style.height = 'unset';          
        });
      }, { once: true });
    });
    
    
  }
}