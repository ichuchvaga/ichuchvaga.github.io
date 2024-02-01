import data from './data.js';

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

import { createPopper } from '@popperjs/core';
import auth from '../widgets/account-popup/auth/auth.vue';

import ChooseCity from '../widgets/city/CityPopover.vue';
import SearchPopover from '../widgets/search/SearchPopover.vue';
import CartPopover from '../widgets/cart/Cart.vue';
import AddedToCart from '../widgets/cart/added-popup/Added-to-cart.vue';
import Menu from '../widgets/menu/Menu.vue';

export default {
	data: () => {
		return {
			menu: data,
			loginTab: true,
			registrationTab: false,
			showAuthPopoverStatus: false,
			authPopoverInstance: null,
			cityPopoverStatus: false,
			cityPopoverInstance: null,
			searchPopoverStatus: false,
			searchPopoverInstance: null,
			cartPopoverStatus: false,
			cartPopoverInstance: null,
			cartAddedPopoverInstance: null,
			menuIsActive: false
		}
	},
	components: {
		auth,
		ChooseCity,
		SearchPopover,
		CartPopover,
		Menu,
		AddedToCart
	},
	methods: {
        showLogin () {
			this.loginTab = true;
			this.registrationTab = false;
		},
		showRegistration () {
            this.loginTab = false;
			this.registrationTab = true;
        },
    	showAuth () {
            this.$modal.show('auth-modal');
		},
		hideAuth () {
            this.$modal.hide('auth-modal');
		},
		authPopoverShow() {
			if (this.showAuthPopoverStatus) {
				this.authPopoverDestroy();
			} else {
				this.authPopoverCreate();
			}
		},
		authPopoverCreate() {
			this.showAuthPopoverStatus = true;
			this.authPopoverInstance = createPopper(this.$refs["authPopoverTrigger"], this.$refs["authPopover"], {
				placement: 'bottom',
			});
		},
		authPopoverDestroy() {
			if (this.authPopoverInstance) {
				this.authPopoverInstance.destroy();
				this.authPopoverInstance = null;
				this.showAuthPopoverStatus = false;
			}
		},
		openCityPopover() {
			if (this.cityPopoverStatus) {
				// Hide
				if (this.cityPopoverInstance) {
					this.cityPopoverInstance.destroy();
					this.cityPopoverInstance = null;
					this.cityPopoverStatus = false;
				}
			} else {
				// Show
				this.cityPopoverStatus = true;
				this.cityPopoverInstance = createPopper(this.$refs["cityPopoverTrigger"], this.$refs["cityPopover"].$el, {
					placement: 'bottom-start',
				});
			}
		},
		closeCityPopover() {
			if (this.cityPopoverInstance) {
				this.cityPopoverInstance.destroy();
				this.cityPopoverInstance = null;
				this.cityPopoverStatus = false;
			}
		},
		openSearchPopover() {
			if (this.searchPopoverStatus) {
				// Close
				this.closeSearchPopover();
			} else {
				// Open
				this.searchPopoverStatus = true;
				this.searchPopoverInstance = createPopper(this.$refs["searchPopoverTrigger"], this.$refs["searchPopover"].$el, {
					placement: 'bottom-start',
				});
			}
			
		},
		closeSearchPopover() {
			if (this.searchPopoverInstance) {
				this.searchPopoverInstance.destroy();
				this.searchPopoverInstance = null;
				this.searchPopoverStatus = false;
			}
		},
		openCartPopover() {
			if (this.cartPopoverStatus) {
				// Close
				this.closeCartPopover();
			} else {
				// Open
				this.cartPopoverStatus = true;
				this.cartPopoverInstance = createPopper(this.$refs["cartPopoverTrigger"], this.$refs["cartPopover"].$el, {
					placement: 'bottom-end',
				});
			}
			
		},
		closeCartPopover() {
			if (this.cartPopoverInstance) {
				this.cartPopoverInstance.destroy();
				this.cartPopoverInstance = null;
				this.cartPopoverStatus = false;
			}
		},
		menuToggle() {
			this.menuIsActive = !this.menuIsActive;
		},
		openCartAddedPopover() {
			// Open
			//this.cartAddedPopoverStatus = true;
			this.cartAddedPopoverInstance = createPopper(this.$refs["cartPopoverTrigger"], this.$refs["cartAddedPopover"], {
				placement: 'bottom'
			});
		}
	},
	mounted: function() {
		if (this.addedToCardPopup) {
			this.openCartAddedPopover();
		}		
	},
	props: {
		addedToCardPopup: {
			type: Boolean,
			required: false
		}
	}
}