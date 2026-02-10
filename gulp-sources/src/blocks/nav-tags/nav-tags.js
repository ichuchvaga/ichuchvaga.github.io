/* global document */

import ready from 'Utils/documentReady.js';

ready(function () {
  const navs = document.querySelectorAll('.nav-tags');

  if (!navs.length) {
    return false;
  }

  document.addEventListener('click', event => {
    const btn = event.target.closest('.js-nav-tag-more');
    if (btn) {
      event.preventDefault();
      btn.closest('.nav-tags').classList.toggle('nav-tags--show');
    }

    if (window.innerWidth >= 768) {
      const link = event.target.closest('.nav-tag__link');
      if (link) {
        event.preventDefault();
        link.closest('.nav-tags__list').querySelectorAll('.nav-tag__link').forEach(elem => elem.classList.remove('active'));
        link.classList.add('active');
      }
    }

    const link = event.target.closest('.nav-tag__link');
    if (link) {
      event.preventDefault();
      const selected = link.dataset.tag;
      if (selected) {
        const parent = link.closest('.nav-tags');
        let container = document.querySelector(parent.dataset.container);
        if (!container) container = document.querySelector('body');
        const items = container.querySelectorAll('[data-tag]');
        if (items.length) {
          if (container.classList.contains('filter-grid-container')) {
            if (!container.dataset.width) container.dataset.width = items[0].getBoundingClientRect().width;
            if (!container.dataset.height) container.dataset.height = items[0].getBoundingClientRect().height;

            items.forEach(item => {
              item.style.width = container.dataset.width + 'px';
              item.style.height = container.dataset.height + 'px';
            });
            const containerRect = container.getBoundingClientRect();
            const itemsPerRow = Math.floor(containerRect.width / container.dataset.width);

              let i = 0;

            const transitionListener = (event) => {
              event.target.classList.remove('animate');
              event.target.removeEventListener('transitionend', transitionListener);
            }
            items.forEach(item => {
              const itemRect = item.getBoundingClientRect();
              const tag = item.dataset.tag;
              const showItem = selected === 'all' || tag.split(',').includes(selected);
              if (showItem) {
                item.style.top = Math.floor(i / itemsPerRow) * container.dataset.height + 'px';
                item.style.left = (i % itemsPerRow) * container.dataset.width + 'px';
                item.classList.add('animate');
                setTimeout(() => transitionListener({target:item}), 300);
                //item.addEventListener('transitionend', transitionListener);
                item.classList.remove('hidden');
                i++;
              } else {
                item.style.top = itemRect.top - containerRect.top + 'px';
                item.style.left = itemRect.left - containerRect.left + 'px';
                item.classList.add('animate');
                setTimeout(() => transitionListener({target:item}), 300);
                // item.addEventListener('transitionend', transitionListener);
                item.classList.add('hidden');
              }
            });
            container.style.height = Math.ceil(i / itemsPerRow) * container.dataset.height + 'px';
          } else {
            items.forEach(item => {
              const tag = item.dataset.tag;
              const showItem = selected === 'all' || tag.split(',').includes(selected);
              item.style.display = showItem ? null : 'none';
            });
          }
        }
      }
    }
  });

  const updateNav = () => {
    navs.forEach(nav => {
      const list = nav.querySelector('.nav-tags__list');
      const listRect = list.getBoundingClientRect();
      const gap = parseInt(getComputedStyle(list).gap);
      const moreButton = nav.querySelector('.nav-tag--more');
      const space = list.clientWidth - moreButton.clientWidth - gap;
      const lines = list.closest('.nav-tags').classList.contains('nav-tags--reviews') ? 2 : 3;

      const maxTop = window.innerWidth >= 769 ? listRect.top : (listRect.top + (lines - 1) * (moreButton.getBoundingClientRect().height + gap));

      list.querySelectorAll('.nav-tag').forEach(tag => {
        if (tag.classList.contains('nav-tag--more')) return;
        tag.classList.add('nav-tag--hide');
      });

      list.querySelectorAll('.nav-tag').forEach(tag => {
        if (tag.classList.contains('nav-tag--more')) return;
        tag.classList.remove('nav-tag--hide');
        const moreButtonRect = moreButton.getBoundingClientRect();
        if (moreButtonRect.top > maxTop) {
          tag.classList.add('nav-tag--hide');
        }
      });

      list.querySelector('.nav-tag--more').classList.toggle('hidden', !list.querySelectorAll('.nav-tag--hide').length);
    });
  }
  updateNav();

  window.addEventListener('load', updateNav, true);
  window.addEventListener('resize', updateNav, true);
});
