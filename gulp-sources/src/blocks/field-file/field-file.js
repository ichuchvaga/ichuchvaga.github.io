/* global document */

import ready from 'Utils/documentReady.js';

ready(function() {
  const fileFields = document.querySelectorAll('.field-file__input');
  if (fileFields.length) {
    const formatBytes = (bytes,decimals) => {
      if(bytes == 0) return '0 Б';
      var k = 1024,
        dm = decimals || 2,
        sizes = ['Б', 'Кб', 'Мб'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    fileFields.forEach(input => {
      input.addEventListener('change', event => {
        const wrapper = input.closest('.field-file');
        const list = wrapper.querySelector('.field-file__files');
        list.innerHTML = '';

        wrapper.classList.toggle('field-file--empty', !input.files.length);

        Array.from(input.files).forEach(file => {
          const item = document.createElement("div");
          item.classList.add('field-file__item');

          const parts = file.name.split(/\.(?=[^\.]+$)/);

          const name = document.createElement("div");
          name.classList.add('field-file__item-name');
          name.innerHTML = parts[0];

          const ext = document.createElement("div");
          ext.classList.add('field-file__item-ext');
          ext.innerHTML = parts[1];

          const size = document.createElement("div");
          size.classList.add('field-file__item-size');
          size.innerHTML = formatBytes(file.size);

          const remove = document.createElement("div");
          remove.classList.add('field-file__item-remove');

          item.append(name, ext, size, remove);
          list.append(item);
        });
      });
    });

    document.addEventListener('click', event => {
      const fileRemove = event.target.closest('.field-file__item-remove');
      if (fileRemove) {
        const wrapper = fileRemove.closest('.field-file');
        const input = wrapper.querySelector('.field-file__input');
        input.value = '';
        input.dispatchEvent(new Event("change"));
      }
    });
  }
});
