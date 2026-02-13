/* global document */

import ready from 'Utils/documentReady.js';
import Choices from 'choices.js';

ready(function () {

    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const selects = document.querySelectorAll('.field-select__select');
    selects.forEach(function (item) {
        const isProductOption = item.closest('.product-options');

        let options = [];
        item.querySelectorAll('option').forEach(option => {
            options.push({
                value: option.getAttribute('value'),
                label: '<span>' + option.innerHTML.split('|||').join('</span><span>') + '</span>',
            });
            option.remove()
        });

        new Choices(item, {
            shouldSort: false,
            searchEnabled: false,
            placeholderValue: 'Выберите',
            allowHTML: true,
            choices: options,
            items: options,
        });

        item.addEventListener(
            'showDropdown',
            function(event) {
                let elem = event.target.closest('.choices').querySelector('.choices__list--dropdown');
                let elemRect = elem.getBoundingClientRect();
                if (elemRect.x + elemRect.width > window.innerWidth) elem.style += ';right:0;';
            },
            false,
        );
    });

});
