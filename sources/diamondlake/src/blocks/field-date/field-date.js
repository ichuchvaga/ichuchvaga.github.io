/* global document */

import ready from 'Utils/documentReady.js';
import Pikaday from 'pikaday';

ready(function() {
    document.querySelectorAll('.field-date__input').forEach(input => {
        const picker = new Pikaday({
            field: input,
            format: 'MM/DD/YYYY',
            maxDate: input.getAttribute('data-maxDate') ? new Date(+input.getAttribute('data-maxDate')) : null
        });
    });
});
