/* global document Element */

import ready from 'Utils/documentReady.js';

ready(function () {
    let currentActiveDropdown = false;
    let currentDropdownTimout = false;
    let currentDropdownTimoutOver = false;
    const menuItemDropdowns = document.querySelectorAll('.nav-menu__item[data-dropdown]');
    const dropdowns = document.querySelectorAll('.nav-menu-dropdown');

    function openDropdown(dropdown) {
        dropdowns.forEach(elem => {
            elem.classList.remove('active');
        });

        const openDropdown = document.querySelector(`.nav-menu-dropdown[data-dropdown=${dropdown}]`);

        if (openDropdown) {
            openDropdown.classList.add('active');
            currentActiveDropdown = dropdown;
        }
    }

    function closeDropdowns() {
        clearTimeout(currentDropdownTimoutOver);
        currentDropdownTimout = setTimeout(() => {
            menuItemDropdowns.forEach(elem => {
                elem.classList.remove('hover');
            })

            dropdowns.forEach(elem => {
                elem.classList.remove('active');
            });

            currentActiveDropdown = false;
        }, 200);
    }

    if (menuItemDropdowns) {
        menuItemDropdowns.forEach(elem => {
            elem.addEventListener('pointerenter', e => {
                clearTimeout(currentDropdownTimout);

                if (elem.dataset.dropdown !== currentActiveDropdown) {
                    menuItemDropdowns.forEach(elem => {
                        elem.classList.remove('hover');
                    })
                    elem.classList.add('hover');

                    clearTimeout(currentDropdownTimoutOver);
                    currentDropdownTimoutOver = setTimeout(() => {
                        openDropdown(elem.dataset.dropdown);
                    }, 300);
                }
            });

            elem.addEventListener('pointerleave', closeDropdowns);
        });
    }

    if (dropdowns) {
        dropdowns.forEach(elem => {
            elem.addEventListener('pointerenter', e => {
                if (elem.dataset.dropdown === currentActiveDropdown) {
                    clearTimeout(currentDropdownTimout);
                }
            });

            elem.addEventListener('pointerleave', closeDropdowns);
        });
    }
});
