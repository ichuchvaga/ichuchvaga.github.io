import root_items from './json/root.json';
import level2_items from './json/level2.json';
import level3_items from './json/level3.json';
import product_data from './json/product.json';

import Product from '../../product.vue';


export default {
	data: function(){
		return {
			root_items,
			level2_items,
			level3_items,
			product_data: product_data[0]
		}
	},
	props: {
		isActive: {
			type: Boolean
		}
	},
	components: {
		Product
	}
}