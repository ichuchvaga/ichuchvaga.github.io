import Vue from 'vue';

//https://euvl.github.io/vue-js-modal/Installation.html
import VModal from 'vue-js-modal/dist/index.nocss.js';
import 'vue-js-modal/dist/styles.css';

Vue.use(VModal, {
    dynamicDefault: {
        draggable: false,
        resizable: true,
        scrollable: true
    }
});

import DiscountModal from '../../widgets/discount-modal/DiscountModal.vue';

export default {
	data: () => {
		return {
			title: "Хотите заказать на дом?"
		}
	},
	components: {
		DiscountModal
	},
	methods: {
		showDiscountModal () {
			this.$modal.show('discount-modal');
		},
		hideDiscountModal () {
			this.$modal.hide('discount-modal');
		}
	}
}