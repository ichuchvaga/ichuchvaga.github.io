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

  // Включим на каком-то конкретном отдельно
  // const choices = new Choices('#some-if', {/* options */});

  // Или тупо найдём все селекты и включим на них Choices
  const selects = document.querySelectorAll('.field-select__select');
  selects.forEach(function (item) {
    const select_options = item.querySelectorAll('option');

    const choices = new Choices(item, {
      searchEnabled: false,
      searchChoices: false,
      placeholderValue: 'Выберите',
      renderSelectedChoices: 'always',
      shouldSort: false,
      resetScrollPosition: false
    });

    
    // 'Select all' option start
    let selectedAllStatus = false;

    if (item.hasAttribute('multiple')) {
      item.addEventListener(
        'addItem',
        function(event) {
          //console.log(event.detail.value);
          
          let count = choices.getValue(true).length;
          let selectAllItem = item.querySelector('option[value="all"]');
          if (selectAllItem) {
            count--;
          }
  
          if (event.detail.value == 'all') {
            select_options.forEach(function(opt_item, opt_idx){
                choices.setChoiceByValue(opt_item.getAttribute('value'));
            });
            selectedAllStatus = true;
          } else {
            // check if we need to set All == true
            let checked_total = 0;
            select_options.forEach(function(opt_item, opt_idx){
              if ((opt_item.getAttribute("disabled") !== true) && (opt_item.getAttribute("value") !== 'all')) {
                checked_total++;
              }
            });
            if (checked_total === count) {
              choices.setChoiceByValue('all');
            }
          }
        },
        false,
      );

      item.addEventListener(
        'removeItem',
        function(event) {
          //console.log(event.detail.value);
  
          if (event.detail.value == 'all' && selectedAllStatus === true) {
            select_options.forEach(function(opt_item, opt_idx){
                choices.removeActiveItems();
            });
          } else {
            selectedAllStatus = false;
            choices.removeActiveItemsByValue('all');
          }
        },
        false,
      );
      // 'Select all' option finish

      item.addEventListener('choice', function (event) {
        choices.getValue(true).forEach(option => {
          if (option !== event.detail.choice.value) return;
          setTimeout(() => {
            choices.removeActiveItemsByValue(event.detail.choice.value);
  
            if (item.hasAttribute('multiple')) {
              let count = choices.getValue(true).length;
              let selectAllItem = item.querySelector('option[value="all"]');
              if (selectAllItem) {
                count--;
              }
              item.closest('.field-select').classList.toggle('field-select--show-placeholder', count);
              item.closest('.field-select').querySelector('.choices__list').innerHTML = count ? 'Выбрано ' + count : '';
            }
          }, 100)
        });
      });

    }  

    item.addEventListener(
      'change',
      function () {
        item.closest('.field-select').classList.add('field-select--show-placeholder')

        if (item.hasAttribute('multiple')) {
          //const count = choices.getValue(true).length;
          let count = choices.getValue(true).length;
          let selectAllItem = item.querySelector('option[value="all"]');
          if (selectAllItem) {
            count--;
          }

          item.closest('.field-select').classList.toggle('field-select--show-placeholder', count);
          item.closest('.field-select').querySelector('.choices__list').innerHTML = count ? 'Выбрано ' + count : '';
        }
      },
      false,
    );

    item.closest('.field-select').querySelector('.choices__inner').addEventListener('click', event => {
      choices.hideDropdown();
    });
  });

});
