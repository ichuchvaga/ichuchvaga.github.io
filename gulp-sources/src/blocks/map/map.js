/* global document Element */

import ready from 'Utils/documentReady.js';

ready(function() {
  load();
});

function load(){

  const mapContainer = document.querySelector('.map-element');
  if (!mapContainer) {
    return false;
  }

  const new_script = document.createElement("script");
  new_script.async = true;
  new_script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
  new_script.onload = init;
  document.head.appendChild(new_script);
}

function init(){
  const mapContainer = document.querySelector('.map-element');
  const marker = (mapContainer.dataset.marker) ? mapContainer.dataset.marker : 'img/pin.svg';
  const coords = new String(mapContainer.dataset.coords).trim();
  const coords_array = coords.split(',');
  
  ymaps.ready(function(){
    var myMap = new ymaps.Map(mapContainer, {
        center: coords_array,
        zoom: 16,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemark = new ymaps.Placemark(coords_array, {
        hintContent: '',
        balloonContent: ''
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: marker,
        // Размеры метки.
        iconImageSize: [50, 72],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-25, -72]
    });


    if ((mapContainer.className.indexOf("js-marker-offset") !== -1) && (document.body.clientWidth > 1230)) {

      var position = myMap.getGlobalPixelCenter();
      // Get current width

      var viewport_width = mapContainer.clientWidth;
      var map_offset_value = viewport_width / 4;
      myMap.setGlobalPixelCenter([ position[0] - map_offset_value , position[1] ]);
    }

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
  });
};