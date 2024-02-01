<template>
	<div class="search-popover" v-show="isActive">
		<div class="search-popover-section" v-for="(group, idx) in results" :key="'search-popover-group' + idx">
			<div class="search-popover__title">{{ group.title }}</div>
			<div class="search-popover-section__content">

				<div v-if="group.type == 'products'" class="search-products">
					<div class="search-product" v-for="(product, pid) in group.items" :key="'search-popover-product' + pid">
						<div class="search-product__img">
							<img :src="product.img" :alt="product.title">
						</div>
						<div class="search-product__main">
							<div class="search-product__title">
								<a href="#">{{ product.title }}</a>
							</div>
							<div class="search-product__price">
								<span class="search-product__price-current">{{ product.price }} руб.</span><span class="search-product__price-old" v-if="product.discount">{{ product.priceOld }} руб.</span>
							</div>
						</div>
					</div>
				</div>

				<ul class="search-links" v-if="group.type == 'default'">
					<li v-for="(link, link_id) in group.items" :key="'search-popover-link' + link_id">
						<a href="#">{{ link.title }}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import results from './data.json';
export default {
	data: function(){
		return {
			results
		}
	},
	props: {
		isActive: {
			type: Boolean,
			default: false
		}
	}
}
</script>
<style src="./SearchPopover.sass"></style>