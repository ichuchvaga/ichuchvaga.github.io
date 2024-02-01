/**
 * Components docs: 
 * https://nightcatsama.github.io/vue-slider-component/
 */

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
	data: function(){
		return {
			addedToCartValue: [0,500]
		}
	},
	components: {
		VueSlider
	},
	props: {
	}
}