/* global document window history location */

document.addEventListener('DOMContentLoaded', function () {

    if (location.hash) {
        showTab(location.hash);
    }

    // Следим за поднимающимися кликами
    document.addEventListener('click', function (event) {
        let tab_link = event.target.closest('.tabs__link');
        if (tab_link && tab_link.dataset.toggle === 'tab') {
            event.preventDefault();
            let target = tab_link.hash === undefined ? tab_link.dataset.target : tab_link.hash;
            if (target !== undefined) {
                showTab(target);

                // Scroll the link block to selected item

                if (history && history.pushState && history.replaceState) {
                    let stateObject = {'url': target};
                    if (window.location.hash && stateObject.url !== window.location.hash) {
                        window.history.pushState(stateObject, document.title, window.location.pathname + target);
                    } else {
                        window.history.replaceState(stateObject, document.title, window.location.pathname + target);
                    }
                }
            }
        }
    });

    const tabLinks = document.querySelectorAll('.tabs__link');
    const tabContents = document.querySelectorAll('.tabs__content-item');
    let tabTimer;

    if (tabLinks && tabContents) {
        tabLinks.forEach(function(link) {
            const tabId = link.getAttribute('href');

            link.addEventListener('mouseenter', function(){
                if (tabTimer) {
                    clearTimeout(tabTimer);
                }

                tabTimer = setTimeout(function() {
                    // upd links 
                    const linkActiveClass = 'tabs__link-wrap--active';
                    const contentActiveClass = 'tabs__content-item--active';

                    tabLinks.forEach(function(tabLinksItem){
                        if (tabLinksItem.getAttribute('href') == tabId) {
                            console.log('selected ' +  tabId);
                            if (!tabLinksItem.parentNode.classList.contains(linkActiveClass)) {
                                tabLinksItem.parentNode.classList.add(linkActiveClass);
                            }
                        } else {
                            if (tabLinksItem.parentNode.classList.contains(linkActiveClass)) {
                                tabLinksItem.parentNode.classList.remove(linkActiveClass);
                            }
                        }
                    });

                    // upd contents
                    tabContents.forEach(function(tabContentItem){
                        if (tabContentItem.getAttribute('id') == tabId.replace('#', '')) {
                            if (!tabContentItem.classList.contains(contentActiveClass)) {
                                tabContentItem.classList.add(contentActiveClass);
                            }
                        } else {
                            if (tabContentItem.classList.contains(contentActiveClass)) {
                                tabContentItem.classList.remove(contentActiveClass);
                            }
                        }
                    });
                }, 100);
            });
        });
    }

    const tabContentsWrap = document.querySelector('.tabs__content-wrapper');
    const tabWrap = document.querySelector('.tabs');

    if (tabContentsWrap && tabWrap) {
        tabContentsWrap.addEventListener('mouseleave', function(){

            const linkActiveClass = 'tabs__link-wrap--active';
            const contentActiveClass = 'tabs__content-item--active';

            if (tabTimer) {
                clearTimeout(tabTimer);
            }

            tabTimer = setTimeout(function() {
                tabLinks.forEach(function(tabLinksItem){
                    if (tabLinksItem.parentNode.classList.contains(linkActiveClass)) {
                        tabLinksItem.parentNode.classList.remove(linkActiveClass);
                    }                    
                });

                // upd contents
                tabContents.forEach(function(tabContentItem){
                    if (tabContentItem.classList.contains(contentActiveClass)) {
                        tabContentItem.classList.remove(contentActiveClass);
                    }
                });
            }, 100);
        });

        tabWrap.addEventListener('mouseleave', function(){
            const linkActiveClass = 'tabs__link-wrap--active';
            const contentActiveClass = 'tabs__content-item--active';

            if (tabTimer) {
                clearTimeout(tabTimer);
            }

            tabTimer = setTimeout(function() {
                tabLinks.forEach(function(tabLinksItem){
                    if (tabLinksItem.parentNode.classList.contains(linkActiveClass)) {
                        tabLinksItem.parentNode.classList.remove(linkActiveClass);
                    }                    
                });

                // upd contents
                tabContents.forEach(function(tabContentItem){
                    if (tabContentItem.classList.contains(contentActiveClass)) {
                        tabContentItem.classList.remove(contentActiveClass);
                    }
                });
            }, 100);
        });
    }
    
    /**
     * Показывает таб
     * @param  {string} tabId ID таба, который нужно показать
     */
    function showTab(tabId) {
        var element = document.querySelector(tabId);
        if (element && element.classList.contains('tabs__content-item')) {
            let isAccordion = element.closest('.tabs').classList.contains('tabs--accordion');

            var tabsParent = document.querySelector(tabId).closest('.tabs');
            var activeTabClassName = 'tabs__link-wrap--active';
            var activeTabContentClassName = 'tabs__content-item--active';

            var activeTab = tabsParent.querySelector('[href="' + tabId + '"]') ? tabsParent.querySelector('[href="' + tabId + '"]') : tabsParent.querySelector('[data-target="' + tabId + '"]')
            if (isAccordion && activeTab.closest('.tabs__link-wrap').classList.contains(activeTabClassName)) {
                // таб
                tabsParent.querySelectorAll('.' + activeTabClassName).forEach(function (item) {
                    item.classList.remove(activeTabClassName);
                });
                // контент таба
                tabsParent.querySelectorAll('.' + activeTabContentClassName).forEach(function (item) {
                    item.classList.remove(activeTabContentClassName);
                });
            } else {
                // таб
                tabsParent.querySelectorAll('.' + activeTabClassName).forEach(function (item) {
                    item.classList.remove(activeTabClassName);
                });
                activeTab.closest('.tabs__link-wrap').classList.add(activeTabClassName);
                // контент таба
                tabsParent.querySelectorAll('.' + activeTabContentClassName).forEach(function (item) {
                    item.classList.remove(activeTabContentClassName);
                });
                tabsParent.querySelector(tabId).classList.add(activeTabContentClassName);
            }
        }
    }

    /*
    const changeTabAccordion = () => {
        let mobile = window.matchMedia('(min-width: 0px) and (max-width: 1230px)');
        let desktop = window.matchMedia('(min-width: 1230px)');

        document.querySelectorAll('.tabs:not(.tabs--inline):not(.tabs--card)').forEach(tabs => {
            let isAccordion = tabs.classList.contains('tabs--accordion');
            if (mobile.matches) {
                if (!isAccordion) {
                    tabs.classList.add('tabs--accordion');
                    tabs.querySelectorAll('.tabs__link-wrap').forEach(tab_link_wrap => {
                        let tab_link = tab_link_wrap.querySelector('.tabs__link');
                        let target = document.querySelector(tab_link.hash === undefined ? tab_link.dataset.target : tab_link.hash);
                        tabs.querySelector('.tabs__content-wrapper').insertBefore(tab_link_wrap, target);
                    });
                }
            } else {
                if (isAccordion) {
                    tabs.classList.remove('tabs--accordion');
                    let links_wrapper = tabs.querySelector('.tabs__links');
                    links_wrapper.append(...tabs.querySelectorAll('.tabs__link-wrap'));
                }
            }
        });
    }

    changeTabAccordion();
    window.addEventListener('resize', function () {
        changeTabAccordion();
    });
    */
});
