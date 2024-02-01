export default {
	data: function() {
		return {
			
		}
	},
	props: {
		hide: {
			type: Function,
			default: function(){
				
			}
		},
		loginTab: {
			type: Boolean
		},
		registrationTab: {
			type: Boolean
		},
		showLogin: {
			type: Function,
			default: function(){
				
			}
		},
		showRegistration: {
			type: Function,
			default: function(){
				
			}
		}
	}
}