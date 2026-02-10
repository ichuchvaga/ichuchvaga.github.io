/* global module */

let config = {
  'notGetBlocks': [

  ],
  'ignoredBlocks': [
    'no-js',
  ],
  'alwaysAddBlocks': [
    'sprite-svg',
    // 'sprite-png',
  ],
  'addStyleBefore': [
    'src/scss/variables.scss',
    'src/scss/mixins.scss',
    'src/scss/bootstrap-grid.scss',
    'src/scss/tippy.scss',
    'src/scss/simplebar.scss',
    'src/blocks/page/page.scss',
    'src/blocks/section-title/section-title.scss',
    'swiper/swiper-bundle.css',
    'simplelightbox/dist/simple-lightbox.min.css',
    'photoswipe/dist/photoswipe.css',
    'glightbox/dist/css/glightbox.min.css',
    // 'somePackage/dist/somePackage.css', // для 'node_modules/somePackage/dist/somePackage.css',
  ],
  'addStyleAfter': [
    // 'src/scss/print.scss',
  ],
  'addJsBefore': [
    // 'somePackage/dist/somePackage.js', // для 'node_modules/somePackage/dist/somePackage.js',
    './utils/lazyLoad.js',
    './utils/tooltip.js'
  ],
  'addJsAfter': [
    './script.js',
  ],
  'addAssets': {
    'src/img/*.{png,svg,jpg,jpeg}': 'img/',
    'src/video/*': 'video/',
    'src/upload/*': 'upload/',
    'src/json/*': 'json/',
    // 'src/fonts/demo-empty-open-sans.woff2': 'fonts/',
    'src/favicon/*.{png,ico,svg,xml,webmanifest}': 'img/favicon',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'img/',
  },
  'dir': {
    'src': 'src/',
    'build': 'build/',
    'blocks': 'src/blocks/',
  }
};

module.exports = config;
