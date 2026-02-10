/* global document Element */

import ready from 'Utils/documentReady.js';

ready(function() {

  initMap();

  storesMoreLink();
  viewLinks();
});

function viewLinks(){
  const viewLinks = document.querySelectorAll('.view-control');
  const panels = document.querySelectorAll('.where-to-buy-panel');
  if (!viewLinks) {
    return false;
  }

  viewLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
  
      let target = e.target;
      if (!target.classList.contains('.view-control')) {
        target = e.target.closest('.view-control');
      }
      
      if (target.classList.contains('active')) {
        return false;
      }

      const selectedView = target.dataset.view;

      // upd links
      viewLinks.forEach(item => {
        if (item.dataset.view == selectedView) {
          item.classList.add('active');
        } else {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
          }          
        }
      });

      // upd content panels
      panels.forEach(item => {
        if (item.dataset.view == selectedView) {
          item.classList.add('active');
        } else {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
          }          
        }
      });

      const mapSection = document.querySelector('.dealers-page-wrapper');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: "instant", block: "start" });
      }
    }, false);
  });
}

function storesMoreLink(){
  const moreLinks = document.querySelectorAll('.js-stores-more-link');
  if (moreLinks) {
    moreLinks.forEach(function(moreLink){
      moreLink.addEventListener('click', function(e){
        e.preventDefault();
  
        const list = moreLink.closest('.dealer-card');
        const targetLinks = (list) ? list.querySelectorAll(".store-card--hidden") : null;
        if (!targetLinks) {
          return false;
        }

        const breakpoint = window.matchMedia('(min-width:1230px)');
        let displayProp = 'block';
        if (breakpoint.matches === true) {
          displayProp = 'flex';
        }

        const storesWrapper = list.querySelector('.dealer-card__stores');
  
        if (moreLink.classList.contains('active')) {
          // hide
          targetLinks.forEach((el, index) => {
            el.style.display = 'none';
          });
          moreLink.classList.remove('active');
          moreLink.text = 'Показать все филиалы города';
          
          if (storesWrapper.classList.contains('active')) {
            storesWrapper.classList.remove('active');
          }
        } else {
          // show
          targetLinks.forEach((el, index) => {
            el.style.display = displayProp;
          });
          moreLink.classList.add('active');
          moreLink.text = 'Свернуть список магазинов';

          storesWrapper.classList.add('active');          
        }
      }, false);
    });
    
  }
}

function initMap(){
  const elem = document.querySelector('.dealers-on-map');
  if (!elem) {
    return false;
  }

  let myMap;

  load();

  function load(){

    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      return false;
    }
  
    const new_script = document.createElement("script");
    new_script.async = true;
    
    const apiKey = mapContainer.dataset.apiKey || '';
    new_script.src = 'https://api-maps.yandex.ru/2.1/?apikey='+apiKey+'&lang=ru_RU';
    new_script.onload = showMap;
    document.head.appendChild(new_script);
  }

  const listItems = document.querySelectorAll('.dealer-card');
  const dealerDropdown = document.querySelector('.js-dealers-dropdown');
  const cityInput = document.querySelector('.where-to-buy-filters input[name="city"]');

  function updateList(){
    const dealer = dealerDropdown.value;

    // filter by dealer
    listItems.forEach(function(dealerCard, idx){
      if (dealer == 'all') {
        if (dealerCard.classList.contains('dealer-card--hidden')) {
          dealerCard.classList.remove('dealer-card--hidden');
        }
      } else {
        if (dealerCard.dataset.dealer == dealer) {
          if (dealerCard.classList.contains('dealer-card--hidden')) {
            dealerCard.classList.remove('dealer-card--hidden');
          }
        } else {
          dealerCard.classList.add('dealer-card--hidden');
        }

      }
    });


    // filter by city
    const city = cityInput.value;
    if (city) {
      listItems.forEach(function(dealerCard, idx){
        const stores = dealerCard.querySelectorAll('.store-card');
        let filteredStoresCount = 0;

        if (stores) {
          stores.forEach(function(storesItem, idx){
            const re = new RegExp(city, "i");
            if (re.test(storesItem.dataset.city)) {
              filteredStoresCount++;

              // if (storesItem.classList.contains('store-card--hidden')) {
              //   storesItem.classList.remove('store-card--hidden');
              // }
            } else {
              // if (!storesItem.classList.contains('store-card--hidden')) {
              //   storesItem.classList.add('store-card--hidden');
              // }
            }
          });

          // const moreBtn = dealerCard.querySelector('.stores-more');
          // if (moreBtn && (filteredStoresCount > 1)) {
          //     moreBtn.style.display = 'block';
          // }

          // if (moreBtn && (filteredStoresCount <= 1)) {
          //   moreBtn.style.display = 'none';
          // }

          // hide dealer if stores don't match to input
          if (filteredStoresCount == 0) {
            if (!dealerCard.classList.contains('dealer-card--hidden')) {
              dealerCard.classList.add('dealer-card--hidden');
            }
          }
        }
      }); 
    }
  }

  function searchCityOnMap(cityName){
    // Геокодирование (поиск по названию)
    ymaps.geocode(cityName, {
      results: 1 // Возвращаем только 1 результат
    }).then(function (res) {
      var geoObjects = res.geoObjects;
      if (geoObjects.getLength() > 0) {
          var firstGeoObject = geoObjects.get(0);
          
          // Получаем координаты найденного объекта
          var coords = firstGeoObject.geometry.getCoordinates();
          
          // Центрируем карту на найденном городе
          myMap.setCenter(coords, 10, {
              checkZoomRange: true,
              duration: 1000 // анимация перехода (мс)
          });
          
          // Добавляем метку (опционально)
          // myMap.geoObjects.add(new ymaps.Placemark(
          //     coords,
          //     {
          //         balloonContent: firstGeoObject.properties.get('name')
          //     },
          //     {
          //         preset: 'islands#blueDotIcon'
          //     }
          // ));
      } else {
          alert('Город не найден');
      }
    });
  }

  function showMobilePopupByCoords(coords) {
    const mobilePopups = document.querySelectorAll('.dealer-popup');

    if (mobilePopups) {
      mobilePopups.forEach(function(popup) {
        let tmp_coords = popup.dataset.coords;
        tmp_coords = tmp_coords.split(',');

        if ((coords[0] == parseFloat(tmp_coords[0])) && (coords[1] == parseFloat(tmp_coords[1]))) {
          popup.style.display = 'block';
        } else {
          popup.style.display = 'none';
        }
      });
    }
  }
    
  function showMap() {
    const mapContainer = document.getElementById('map');
    const marker = (mapContainer.dataset.marker) ? mapContainer.dataset.marker : 'img/pin.svg';
    const coords = new String(mapContainer.dataset.coords).trim();
    const coords_array = coords.split(',');
    
    ymaps.ready(function(){
      myMap = new ymaps.Map('map', {
          center: coords_array,
          zoom: 11,
          controls: []
      }, {
          searchControlProvider: 'yandex#search'
      });

      let dealers = {};

      fetch(mapContainer.dataset.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        },
      })
      .then(response => response.json().then(result => {
        //console.dir(result);
        dealers = result;

        const breakpoint = window.matchMedia('(max-width:1229px)');

        let managerConfig = {
          clusterize: true
        };

        if (breakpoint.matches === true) {
          managerConfig.geoObjectOpenBalloonOnClick = false;
        }

        var objectManager = new ymaps.ObjectManager(managerConfig);

        objectManager.add(dealers);

        objectManager.events.add('click', function(e){
          const objectID = e.get('objectId');
          
          if (breakpoint.matches === true) {
            objectManager.setFilter(function(object){
              if (objectID == object.id) {
                showMobilePopupByCoords(object.geometry.coordinates);
              }
              return true;
            });

            e.preventDefault();
          }          
        });
        
        

        // Filter by Dealer
        const dropdown = document.querySelector('.js-dealers-dropdown');
        if (dropdown) {
          dropdown.addEventListener('change', function(e){
            objectManager.setFilter(function (object) {
              if (e.target.value == 'all') {
                return true;
              }
              return object.properties.company == e.target.value;
            });

            updateList();
          }, false);
        }

        // Filter by text
        const searchInput = document.querySelector('.where-to-buy-filters input[name="city"]');
        if (searchInput) {
          searchInput.addEventListener('change', function(e){
            objectManager.setFilter(function (object) {
              const re = new RegExp(e.target.value, "i"); 
              return re.test(object.properties.city);
            });

            updateList();
            searchCityOnMap(e.target.value);
          }, false);
        }

        const searchSubmitBtn = document.querySelector('.where-to-buy-filters button[type="submit"]');
        if (searchSubmitBtn) {
          searchSubmitBtn.addEventListener('click', function(e){
            e.preventDefault();
            updateList();
          }, false);
        }
        
        const storesListGeoLinks = document.querySelectorAll('.dealers-list .geo-point');
        const tabLinkForMap = document.querySelector('.view-control[data-view="map"]');

        if (storesListGeoLinks) {
          storesListGeoLinks.forEach(function(geoLink){
            geoLink.addEventListener('click', function(e){
              e.preventDefault();
              let coords = geoLink.dataset.coords;
              coords = coords.split(',');
              if (coords) {
                myMap.setCenter(coords);

                // try to open the balloon
                objectManager.setFilter(function (object) {
                  if ((object.geometry.coordinates[0] == parseFloat(coords[0])) && (object.geometry.coordinates[1] == parseFloat(coords[1]))) {
                  
                    const breakpoint = window.matchMedia('(min-width:1230px)');
                    if (breakpoint.matches === true) {
                      // desktop
                      objectManager.objects.balloon.open(object.id);
                    } else {
                      // mobile
                      showMobilePopupByCoords(coords);
                    }

                    // switch to the map tab
                    if (tabLinkForMap) {
                      tabLinkForMap.dispatchEvent(new Event('click'));
                    }
                  }
                  return true;
                });
                          
              }
            }, false);
          });
        }
        
        // Добавим менеджер на карту.
        myMap.geoObjects.add(objectManager);
        

      }));

    });
  }
}