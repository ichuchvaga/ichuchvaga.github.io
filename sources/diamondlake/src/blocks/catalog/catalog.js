/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
    const header = document.querySelector('.catalog__header');
    if (header) {
        let headerTopPosition = Math.floor(header.getBoundingClientRect().top - document.body.getBoundingClientRect().top);
        let headerBottomPosition = Math.floor(headerTopPosition + header.getBoundingClientRect().height);
        let catalogBottom = Math.floor(document.querySelector('.catalog__list').getBoundingClientRect().bottom - document.body.getBoundingClientRect().top);
        let headerStyle = getComputedStyle(header);
        let pageContent = document.querySelector('.page__content');

        window.addEventListener("load", (event) => {
            headerTopPosition = Math.floor(header.getBoundingClientRect().top - document.body.getBoundingClientRect().top);
            headerBottomPosition = Math.floor(headerTopPosition + header.getBoundingClientRect().height);
            catalogBottom = Math.floor(document.querySelector('.catalog__list').getBoundingClientRect().bottom - document.body.getBoundingClientRect().top);
            headerStyle = getComputedStyle(header);
            pageContent = document.querySelector('.page__content');
        });

        let lastScrollTop = 0;
        let lastScrollTimer = 0;
        let scrollTimeout;
        const scrollDuration = 300;
        window.addEventListener('scroll', e => {
            if (window.innerWidth >= 1000) {
                header.classList.remove('sticky');
                pageContent.style.paddingTop = '0px';
                return;
            }

            const headerHeight =  + document.querySelector('.page-header').getBoundingClientRect().height;
            const st = (window.pageYOffset || document.documentElement.scrollTop) + headerHeight;

            if (st < lastScrollTop && st <= headerBottomPosition) {
                header.classList.remove('sticky');
                pageContent.style.paddingTop = '0px';
            } else if (st > lastScrollTop || st > catalogBottom) {
                if (st > headerBottomPosition) {
                    document.querySelector('.catalog__header .catalog-filter-button').classList.remove('active');
                    document.querySelector('.catalog__header .catalog-filter').classList.remove('active');
                }
                let offset = parseFloat(headerStyle['marginTop']) + parseFloat(headerStyle['marginBottom']) + header.offsetHeight;
                header.classList.toggle('sticky', st > headerBottomPosition);
                pageContent.style.paddingTop = (st > headerBottomPosition ? offset : 0) + 'px';
            }
            lastScrollTop = st <= 0 ? 0 : st;

            if (window.innerWidth >= 1000) {
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = null;
                }
                scrollTimeout = setTimeout(() => {
                    if (Math.abs(st - headerTopPosition) < 100) {
                        scrollIt(headerTopPosition - headerHeight)
                        lastScrollTimer = window.performance.now();
                    }
                }, 100);
            }
        });

        function scrollIt(destination, duration = scrollDuration, easing = "linear", callback) {
            const easings = {
                linear(t) {
                    return t;
                },
                easeOutQuad(t) {
                    return t * (2 - t);
                }
            };

            const start = window.pageYOffset;
            const startTime =
                "now" in window.performance ? performance.now() : new Date().getTime();

            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            const windowHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.getElementsByTagName("body")[0].clientHeight;
            const destinationOffset =
                typeof destination === "number" ? destination : destination.offsetTop;
            const destinationOffsetToScroll = Math.round(
                documentHeight - destinationOffset < windowHeight
                    ? documentHeight - windowHeight
                    : destinationOffset
            );

            if ("requestAnimationFrame" in window === false) {
                window.scroll(0, destinationOffsetToScroll);
                if (callback) {
                    callback();
                }
                return;
            }

            function scroll() {
                const now =
                    "now" in window.performance ? performance.now() : new Date().getTime();
                const time = Math.min(1, (now - startTime) / duration);
                const timeFunction = easings[easing](time);
                window.scroll(
                    0,
                    Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
                );

                if (window.pageYOffset === destinationOffsetToScroll) {
                    if (callback) {
                        callback();
                    }
                    return;
                }

                requestAnimationFrame(scroll);
            }

            scroll();
        }
    }
});