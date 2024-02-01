<template>
	<div class="auth-modal">
		<div class="auth-modal-header">
			<div class="auth-modal__links">
				<a href="javascript:void(0);" class="auth-modal__link" :class="{'active': loginTab}" @click="showLogin">Вход</a>
				<a href="javascript:void(0);" class="auth-modal__link" :class="{'active': registrationTab}" @click="showRegistration">Регистрация</a>
			</div>
			<a href="javascript:void(0);" class="auth-modal-close" @click="hide">
				<span class="icon icon-modal-close"></span>
			</a>
		</div>

		<div class="auth-modal-content">
			<div class="auth-modal-tab auth-login" v-show="loginTab">
				<form action="">
					<div class="form-group">
						<input type="text" name="email" placeholder="E-mail" class="form-control">
					</div>

					<div class="form-group">
						<input type="password" name="password" placeholder="Пароль" class="form-control">
					</div>

					<div class="login-submit">
						<div class="login-submit__btn">
							<input type="submit" class="btn" value="Войти">
						</div>
						<div class="login-submit__forgot">
							<a href="#" class="link">Забыли пароль?</a>
						</div>
					</div>
				</form>

				<div class="auth-social">
					<div class="auth-social__title">Войти через соцсеть</div>

					<div class="social-icons social-icons--grey">
						<a class="social-icon vk" href="javascript:void(0);"></a>
						<a class="social-icon fb" href="javascript:void(0);"></a>
						<a class="social-icon tw" href="javascript:void(0);"></a>
					</div>
				</div>
			</div>
			<div class="auth-modal-tab auth-registration" v-show="registrationTab">
				<form action="">
					<div class="form-group">
						<input type="text" name="name" placeholder="Имя" class="form-control">
					</div>

					<div class="form-group">
						<input type="text" name="email" placeholder="E-mail" class="form-control">
					</div>

					<div class="form-group">
						<input type="text" name="phone" placeholder="Телефон" class="form-control">
					</div>

					<div class="form-group">
						<input type="password" name="password" placeholder="Пароль" class="form-control">
					</div>

					<div class="form-group">
						<input type="password" name="password_confirm" placeholder="Повторите пароль" class="form-control">
					</div>

					<div class="agreement-checkbox">
						<div class="checkbox">
						<label class="checkbox__label">
							<input type="checkbox" name="agreement" value="">
							<span class="checkbox__content">
							<span class="checkbox__icon"></span>
							<span class="checkbox__text">Я согласен на обработку <a href="#" target="_blank">персональных данных</a></span>
							</span>
						</label>
						</div>
					</div>

					<div class="registration-submit">
						<input type="submit" class="btn" value="Зарегистрироваться">
					</div>
				</form>

				<div class="auth-social">
					<div class="auth-social__title">Войти через соцсеть</div>

					<div class="social-icons social-icons--grey">
						<a class="social-icon vk" href="javascript:void(0);"></a>
						<a class="social-icon fb" href="javascript:void(0);"></a>
						<a class="social-icon tw" href="javascript:void(0);"></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./auth.sass"></style>
<script src="./auth.js"></script>