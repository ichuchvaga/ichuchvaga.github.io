/* global module */

let config = {
  'notGetBlocks': [
    'blocks-demo.html',
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
    'swiper/swiper-bundle.css',
    'lightgallery/css/lightgallery-bundle.min.css',
    'nouislider/dist/nouislider.min.css',
    'src/blocks/simplebar/simplebar.scss',
    'choices.js/public/assets/styles/choices.min.css',
  ],
  'addStyleAfter': [
    // 'src/scss/print.scss',
  ],
  'addJsBefore': [
    // 'somePackage/dist/somePackage.js', // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  'addJsAfter': [
    './script.js',
  ],
  'addAssets': {
    'src/img/*.{png,svg,jpg,jpeg}': 'img/',
    'src/fonts/*.{woff,woff2,eot,ttf}': 'fonts/',
    'node_modules/lightgallery/images/*.{png,svg,jpg,jpeg,gif}': 'images/',
    'node_modules/lightgallery/fonts/*.{ttf,woff,svg}': 'fonts/',
    // 'src/favicon/*.{png,ico,svg,xml,webmanifest}': 'img/favicon',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'img/',
  },
  'dir': {
    'src': 'src/',
    'build': 'build/',
    'blocks': 'src/blocks/'
  }
};

module.exports = config;
