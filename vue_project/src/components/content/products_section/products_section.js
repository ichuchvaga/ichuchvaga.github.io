import Product from '../../product.vue';

import Vue from 'vue';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';

/*
** Equal height plugin
** https://github.com/laij84/vue-equalizer
*/
import equalizer from "vue-equalizer";

let config = {			
	infinite: false,
	slidesToShow: 4,
	slidesToScroll: 4,
	arrows: true,
	dots: false,
	responsive: [
		{
		  breakpoint: 1230,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: true,
			infinite: false,
		  }
		}
	  ]			
};

export default {
	components: {
		Product,
		VueSlickCarousel,
		equalizer
	},
	computed: {
		settings: function() {
			return config;
		}
	},
	props: {
		title: {
			type: String
		},
		items: {
			type: Array
		}
	}	
}