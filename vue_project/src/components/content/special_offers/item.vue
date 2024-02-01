<template>
	<div :class="'sp-offer-item type' + item.type">
		<a href="#" class="sp-offer-item__in" :style="'background-image: url('+ item.bg +')'">
			<div class="sp-offer-item__title" v-html="item.title"></div>
			<div class="sp-offer-item__img">
				<img :src="item.img" alt="" />
			</div>
		</a>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object
		}
	}
}
</script>