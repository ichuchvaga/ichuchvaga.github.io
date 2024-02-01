import benefits from './data.json';

import Vue from 'vue';
import VueScreenSize from 'vue-screen-size';
Vue.use(VueScreenSize);

import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';

const config = {			
	infinite: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	dots: true,
	responsive: [
		{
		  breakpoint: 1230,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: false,
			infinite: false,
		  }
		}
	  ]			
};

export default {
	data: () => {
		return {
			items: benefits,
			settings: config
		}
	},
	mounted() {
		//console.log(this.$vssWidth);
	},
	components: {
		VueSlickCarousel
	}
}