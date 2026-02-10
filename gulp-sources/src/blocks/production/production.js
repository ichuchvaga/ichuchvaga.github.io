/* global document */

import ready from 'Utils/documentReady.js';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {gsap} from "gsap";
gsap.registerPlugin(ScrollTrigger);

ready(function() {
  const section = document.querySelector('.production');
  if (section) {
    const bg = section.querySelector('.production__bg');
    const title = section.querySelector('.production__title');
    const sectionStyle = window.getComputedStyle(section);

    const stickyHeaderHeight = window.innerWidth < 1230 ? document.querySelector('.page-header').offsetHeight : 0;
    const topOffset = parseFloat(sectionStyle.getPropertyValue('padding-top')) + stickyHeaderHeight;

    ScrollTrigger.create({
      trigger: bg,
      start: "bottom bottom",
      endTrigger: bg.parentElement,
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: title,
      start: `top-=${topOffset}px top`,
      endTrigger: title.parentElement,
      end: `bottom+=${sectionStyle.getPropertyValue('padding-bottom')} bottom`,
      pin: true,
      pinSpacing: false,
    });

    const cards = gsap.utils.toArray(".prod-card");
    const lastCardIndex = cards.length - 1;

    const lastCardST = ScrollTrigger.create({
      trigger: cards[cards.length - 1],
      start: `center center`
    });

    cards.forEach((card, index) => {
      const button = card.querySelector('.prod-card__btn .btn');

      const scale = index === lastCardIndex ? 1 : 0.9;
      const scaleDown = gsap.to(card, {
        scale: scale,
      });

      const changeColor = gsap.to(card, {
        color: '#fff',
        borderWidth: '1px',
        borderColor: '#fff',
        borderStyle: 'solid',
        backgroundColor: '#3B61A5',
        duration: 0.3
      });

      ScrollTrigger.create({
        trigger: card,
        start: `center center`,
        end: "center-=10vh center",
        ease: "none",
        animation: changeColor,
        toggleActions: "restart none none reverse",
        onUpdate: self => {
          button.classList.toggle('btn--white', self.progress);
          button.classList.toggle('btn--main', !self.progress);
          card.classList.toggle('prod-card--past', self.progress);
        }
      });

      ScrollTrigger.create({
        trigger: card,
        start: `center-=${topOffset/2}px center`,
        end: () => lastCardST.start,
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        ease: "none",
        animation: scaleDown,
        toggleActions: "restart none none reverse"
      });
    });
  }
});
