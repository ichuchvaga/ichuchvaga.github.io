<template>
	<div class="product">
		<div class="product__photo">
			<img :src="product.img" alt=""/>
			<span 
				class="product__favorite icon-favorite" 
				v-on:click="updateFavoriteStatus"
				:class="{'active': isFavorite}"
			></span>
			<span class="product__text-label" v-if="product.product_of_the_day">Товар дня</span>

			<div
				v-if="product.discount" 
				class="product__discount" 
				:style="'background-color:' + product.color"
			>-{{ product.discountValue }}</div>
		</div>
		<div class="product__description">
		<div class="product__code-line"><span class="product__sku">{{ product.sku }}</span>

			<span class="product__stock-status stock-status out-of-stock" v-if="product.stock_status == 0">
				<span class="stock-status__icon"></span>
				<span class="stock-status__text">Нет в наличии</span>
			</span>
		
			<span class="product__stock-status stock-status available" v-if="product.stock_status == 1">
				<span class="stock-status__icon"></span>
				<span class="stock-status__text">В наличии</span>
			</span>			

			<span class="product__stock-status stock-status order" v-if="product.stock_status == 2">
				<span class="stock-status__icon"></span>
				<span class="stock-status__text">Доступно к заказу</span>
			</span>
		</div>
		<div class="product__name">
			<a href="#" v-html="product.title"></a>
		</div>
		<div class="product__rating">
			<div class="rating"><span class="rating__star"></span><span class="rating__star"></span><span class="rating__star"></span><span class="rating__star"></span><span class="rating__star"></span>
			</div><span class="product__rating-total">0</span>
		</div>
		</div>
		<div class="price" v-if="!product.raisinsPrice">
			<div class="price__wholesale" v-if="product.wholesale">{{ product.priceWh }} руб. - от {{ product.priceWhMin }} шт</div>
			<span class="price__current">{{ product.price }} руб.</span>
			<span class="price__old" v-if="product.discount">{{ product.priceOld }} руб.</span>
		</div>
		<div class="price" v-else>
			<span class="price__current">{{ product.price }} <span class="price__raisins-icon"></span></span>
		</div>
		<div class="product__bottom">
		<div class="product__quantity">
			<Quantity />
		</div>
		<div class="product__buy">
			<a class="btn" href="#">В корзину</a></div>
		</div>
	</div>
</template>

<script>
import Quantity from './widgets/quantity/Quantity.vue';

export default {
	data: function() {
		return {
			isFavorite: false
		}
	},
	props: {
		product: {
			type: Object
		}
	},
	methods: {
		updateFavoriteStatus: function (event) {
			// `this` внутри методов указывает на экземпляр Vue
			// `event` — нативное событие DOM
			this.isFavorite = !this.isFavorite;
		}
	},
	components: {
		Quantity
	}

}
</script>

<style src="./product.sass"></style>