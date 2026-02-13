/* global document */


import ready from 'Utils/documentReady.js';

ready(function () {
    document.addEventListener("change", (event) => {
        if (event.target.matches('.field-radio-box__input')) {
            const name = event.target.getAttribute('name');
            const wrapperClassname = 'field-radio-box';
            const classname = wrapperClassname + '--checked';

            if (name) {
                document.querySelectorAll(`.field-radio-box__input[name="${name}"]`).forEach((input) => {
                    input.closest('.' + wrapperClassname).classList.remove(classname);
                });
            }
            event.target.closest('.' + wrapperClassname).classList.add(classname);
        }
    });
});
