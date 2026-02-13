/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
    const sliders = document.querySelectorAll('.slider');
    if (sliders) {
        sliders.forEach(slider => {
            const inner = slider.querySelector('.slider__inner');
            const input = slider.querySelector('.slider__input');
            const steps = slider.querySelectorAll('.slider__step');
            const stepsCount = getSliderStepsCount(slider);
            const handle = slider.querySelector('.slider__handle');
            const sliderRect = inner.getBoundingClientRect();

            steps.forEach((step, index) => {
                step.style.left = `${100 * index / (steps.length - 1)}%`;
            });

            input.addEventListener('change', e => {
                handle.style.transform = `translateX(${input.value * sliderRect.width / stepsCount}px)`;
            });

            inner.addEventListener('click', e => {
                input.value = Math.round(stepsCount * (e.pageX - sliderRect.x) / sliderRect.width);
                input.dispatchEvent(new CustomEvent("change"));
            });

            const startEvent = e => {
                slider.classList.add('slider--active');
            }
            handle.addEventListener('mousedown', startEvent);
            handle.addEventListener('touchstart', startEvent);
        });

        const moveEvent = e => {
            const slider = document.querySelector('.slider--active');
            if (slider) {
                const inner = slider.querySelector('.slider__inner');
                const input = slider.querySelector('.slider__input');
                const sliderRect = inner.getBoundingClientRect();
                const steps = slider.querySelectorAll('.slider__step');
                const stepsCount = getSliderStepsCount(slider);
                let x = e.pageX ? e.pageX : e.changedTouches[0].pageX;
                console.log(x)
                if (x < sliderRect.x) x = sliderRect.x;
                if (x > sliderRect.x + sliderRect.width) x = sliderRect.x + sliderRect.width;

                input.value = Math.round(stepsCount * (x - sliderRect.x) / sliderRect.width);
                input.dispatchEvent(new CustomEvent("change"));
            }
        }
        document.addEventListener('mousemove', moveEvent);
        document.addEventListener('touchmove', moveEvent);

        const endEvent = e => {
            const slider = document.querySelector('.slider--active');
            if (slider) slider.classList.remove('slider--active');
        }
        document.addEventListener('mouseup', endEvent);
        document.addEventListener('touchend', endEvent);

        function getSliderStepsCount(slider) {
            const steps = slider.querySelectorAll('.slider__step');
            const input = slider.querySelector('.slider__input');
            let   stepsCount = steps.length - 1;
            if (input.dataset.step) {
                stepsCount = (parseFloat(steps.item(steps.length - 1).innerHTML) - parseFloat(steps.item(0).innerHTML)) / parseFloat(input.dataset.step);
            }
            return stepsCount;
        }
    }
});
