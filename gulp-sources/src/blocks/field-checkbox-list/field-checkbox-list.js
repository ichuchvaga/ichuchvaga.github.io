/* global document */
/* global Event */

import ready from 'Utils/documentReady.js';

ready(function() {
  const checkBoxListTitles = document.querySelectorAll('.field-checkbox-list__title');
  if (checkBoxListTitles.length) {
    checkBoxListTitles.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
      });
    });
  }

  function changeCheckBoxListInput(target) {
    const checkBoxListInput = target.closest('.field-checkbox__input');
    if (checkBoxListInput) {
      const checkBoxList = checkBoxListInput.closest('.field-checkbox-list');
      if (checkBoxList) {
        let resultText = '';

        let selected = [];
        checkBoxList.querySelectorAll('.field-checkbox__input:checked').forEach(item => {
          selected.push(item.closest('.field-checkbox').querySelector('.field-checkbox__name-text').innerHTML);
        });

        if (selected.length > 1) {
          resultText = selected.length + ' <span>выбрано</span> <a href="#" class="field-checkbox-list__clear">Отменить</a>';
        }
        else if (selected.length === 1) {
          resultText = selected[0] + ' <a href="#" class="field-checkbox-list__clear">Отменить</a>';
        }
        else {
          resultText = 'Выберите';
        }

        checkBoxList.querySelector('.field-checkbox-list__current').classList.toggle('field-checkbox-list__current--empty', !selected.length);

        checkBoxList.querySelector('.field-checkbox-list__current').innerHTML = resultText;
      }
    }
  }
  document.addEventListener('change', event => changeCheckBoxListInput(event.target));

  document.addEventListener('click', e => {
    const checkBoxList = e.target.closest('.field-checkbox-list');
    if (checkBoxList) {
      const checkBoxListTitle = e.target.closest('.field-checkbox-list__current');
      if (checkBoxListTitle) {
        e.preventDefault();
        document.querySelectorAll('.field-checkbox-list__container--active').forEach(item => item.classList.remove('field-checkbox-list__container--active'));
        checkBoxListTitle.closest('.field-checkbox-list').querySelector('.field-checkbox-list__container').classList.toggle('field-checkbox-list__container--active');
      }
    } else {
      document.querySelectorAll('.field-checkbox-list__container--active').forEach(item => item.classList.remove('field-checkbox-list__container--active'));
    }

    const checkBoxListGroupTitle = e.target.closest('.field-checkbox-list-group__title');
    if (checkBoxListGroupTitle) {
      e.preventDefault();
      checkBoxListGroupTitle.closest('.catalog-filter-group').classList.add('catalog-filter-group--open');
      checkBoxListGroupTitle.closest('.field-checkbox-list-group').classList.add('field-checkbox-list-group--open');
    }

    const checkBoxListGroupClose = e.target.closest('.field-checkbox-list-group__close');
    if (checkBoxListGroupClose) {
      e.preventDefault();
      checkBoxListGroupClose.closest('.catalog-filter-group').classList.remove('catalog-filter-group--open');
      checkBoxListGroupClose.closest('.field-checkbox-list-group').classList.remove('field-checkbox-list-group--open');
    }

    const checkBoxListGroupClear = e.target.closest('.field-checkbox-list__clear');
    if (checkBoxListGroupClear) {
      e.preventDefault();
      const group = checkBoxListGroupClear.closest('.catalog-filter-group');
      group.querySelectorAll('.field-checkbox__input').forEach(input => {
        input.checked = false;
        changeCheckBoxListInput(input);
      });
    }
  });
});
