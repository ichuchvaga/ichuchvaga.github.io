/* global document */

import ready from 'Utils/documentReady.js';
import Choices from "choices.js";

ready(function() {
    const filterSku = document.querySelector('.works-filter__sku');
    let choices;
    if (filterSku) {
        choices = new Choices(filterSku, {
            renderSelectedChoices: true,
            loadingText: 'Загрузка...',
            noResultsText: 'Результаты не найдены',
            noChoicesText: 'Нет вариантов для выбора',
            itemSelectText: 'Нажмите, чтобы выбрать',
            uniqueItemText: 'Можно добавлять только уникальные значения',
            customAddItemText: 'Можно добавлять только значения, соответствующие определенным условиям',
        });

        window.mch = choices;
    }

    const typeInputs = document.querySelectorAll('.js-works-type');
    if (typeInputs.length) {
        typeInputs.forEach(input => {
            input.addEventListener('change', event => {
                const checked = [];
                typeInputs.forEach(elem => elem.checked && checked.push(elem.value));

                let options = choices.config.choices;
                const selected = choices.getValue(true);
                options.forEach((row, index) => {
                    const props = row.customProperties;
                    options[index].disabled = checked.length && !checked.includes(props.type) || selected.includes(row.value);
                    options[index].selected = row.selected && checked.includes(props.type);
                });
                choices.clearChoices();
                choices.setChoices(options, 'value', 'label', true);

                let values = choices.getValue();
                values.forEach((row, index) => {
                    const props = row.customProperties;
                    if (checked.length && !checked.includes(props.type)) values.splice(index, 1);
                });
                choices.removeActiveItems();
                choices.setValue(values);
            });
        });
    }
});