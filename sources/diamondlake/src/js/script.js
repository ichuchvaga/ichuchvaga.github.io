// /* global document console */
import lightGallery from 'lightgallery';
window.lightGallery = lightGallery;
import ready from 'Utils/documentReady.js';
//import Inputmask from "inputmask/lib/inputmask";

ready(function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.matches('[class*="tabs"]')) return;
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);

    const setPageHeadingHeight = () => {
        const pageHeadingElem = document.querySelector('.page__heading');
        if (pageHeadingElem) {
            document.documentElement.style.setProperty('--page-heading-height', pageHeadingElem.offsetHeight + `px`)
        }
    }
    setPageHeadingHeight();
    window.addEventListener("resize", setPageHeadingHeight, false);

    //Inputmask("+7 (999) 999 99 99").mask('input[name="phone"]');
    //Inputmask().mask(document.querySelectorAll("input[data-inputmask]")); todo: починить
});

function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}