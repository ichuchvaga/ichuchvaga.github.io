import Product from '../../product.vue';

import Vue from 'vue';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';

import slides from './data.json';

const product_of_the_day = {
	"id": "0",
	"title": "Бумага DOUBLE A, A4, 80 г/м<sup>2</sup>, 500 листов, офисная высокого качества, белоснежная",
	"sku": "844-313",
	"stock_status": 1,
	"rating": 0,
	"ratingTotal": 0,
	"price": "322,02",
	"priceOld": "410",
	"priceWh": "300,02",
	"priceWhMin": "100",
	"wholesale": false,
	"discount": false,
	"discountValue": "10%",
	"color": "",
	"img": "/img/products/img1.jpg",
	"product_of_the_day": true
};

let config = {			
	infinite: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	dots: false,
	draggable: false
};

export default {
	components: {
		Product,
		VueSlickCarousel
	},
	data: function() {
		return {
			settings: config,
			slides
		}
	},
	props: {
		product_of_the_day: {
			type: Object,
			default: () => {
				return product_of_the_day
			}
		}
	}
}