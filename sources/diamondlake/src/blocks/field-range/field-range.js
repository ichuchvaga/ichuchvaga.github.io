/* global document */

import noUiSlider from 'nouislider';
import ready from 'Utils/documentReady.js';

ready(function() {
    const items = document.querySelectorAll('.field-range__input-range');
    const inputs = document.querySelectorAll('.field-range__input');

    items.forEach((item) => {
        const rangeItemContainer = item.closest('.field-range').querySelector('.field-range__input-range-container');

        noUiSlider.create(rangeItemContainer, {
            range: {
                'min': parseFloat(item.getAttribute('min')),
                'max': parseFloat(item.getAttribute('max')),
            },
            step: parseFloat(item.getAttribute('step') ? item.getAttribute('step') : 1),
            start: item.getAttribute('value').split(',').map(parseFloat),
          connect: true,
            // behaviour: 'tap-drag',
        }).on('update', function (values) {
            const inputs = item.closest('.field-range').querySelectorAll('.field-range__input');
            const labels = item.closest('.field-range').querySelectorAll('  .field-range__label');
            const new_values = [];
            values.forEach((value, index) => {
                inputs[index].value = parseFloat(value);
                if (labels.length) labels[index].innerHTML = parseInt(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                // upd main input
                new_values.push(parseFloat(value));
            });
            item.value = new_values.join(',');
        });

        rangeItemContainer.noUiSlider.on('change', function () {
            item.dispatchEvent(new Event('change'));
        });
    });

    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {

            //const range = e.target.closest('.field-range').querySelector('.field-range__input-range');
            const range = e.target.closest('.field-range').querySelector('.field-range__input-range-container');
            const inputs = e.target.closest('.field-range').querySelectorAll('.field-range__input');
            const values = [];
            inputs.forEach((input) => {
                values.push(parseFloat(input.value));
            });

            range.noUiSlider.updateOptions({
                start: values,
            });

            // upd range input value
            const new_value = values.join(',');
            e.target.closest('.field-range').querySelector('.field-range__input-range').value = new_value;
        });
    });
});
