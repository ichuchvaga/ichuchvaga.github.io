export default {
	data() {
		return {
			currentValue: 1
		}
	},
	props: {
	},
	methods: {
		plus: function() {
			this.currentValue++;
		},
		minus: function() {
			if (this.currentValue > 1) {
				this.currentValue--;
			} else {
				this.currentValue = 1;
			}
		}
	}
}