<template>
	<div class="discount-modal">
		<a href="javascript:void(0);" class="discount-modal-close" @click.prevent="closeHandler"><span class="icon icon-modal-close-grey"></span></a>

		<div class="discount-modal-text">
			<div class="discount-modal-text__icon">
				<img src="/vue_project/public/img/icons/discount.png" alt="">
			</div>
			<div class="discount-modal-text__value">Получите <span>скидку 5%</span><br>на любые покупки!</div>			
		</div>

		<form action="" class="discount-modal-form">
			<div class="form-group">
				<input type="text" name="name" placeholder="Ваше имя" class="form-control">
			</div>

			<div class="form-group">
				<input type="text" name="email" placeholder="E-mail" class="form-control">
			</div>

			<div class="discount-modal-submit">
				<input type="submit" class="btn btn-blue" value="Получить скидку">
			</div>
			
			<div class="discount-modal-note">*На заказы от 5 000 руб. в течение 3- дней</div>
		</form>
	</div>
</template>
<style src="./DiscountModal.sass"></style>
<script src="./DiscountModal.js"></script>