import products from './data.json';
import Quantity from '../quantity/Quantity.vue';

export default {
	data: function(){
		return {
			products
		}
	},
	props: {
		isActive: {
			type: Boolean,
			default: false
		},
		closeHandler: {
			type: Function
		}
	},
	components: {
		Quantity
	},
	methods: {
		/*clickHandler(event) {
			const { target } = event;
			const { $el } = this;

			if (!$el.contains(target)) {
			  this.closeHandler();
			}
		}*/
	}
	/*mounted() {
		document.addEventListener('click', this.clickHandler);
	},

	beforeDestroy() {
		document.removeEventListener('click', this.clickHandler);
	}*/
}