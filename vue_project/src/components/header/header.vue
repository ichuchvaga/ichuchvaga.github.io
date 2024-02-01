<template>
  <div>
    <header class="header">
      <div class="header-top">
        <div class="container">
          <div class="header-top__wrapper">
            <div class="header-top__l">
              <div class="choose-city">
                <a href="javascript:void(0);" class="choose-city__selected" @click.prevent="openCityPopover" ref="cityPopoverTrigger">Смоленск</a>
              </div>

              <ChooseCity :isActive="cityPopoverStatus" :closeHandler="closeCityPopover" ref="cityPopover"/>
            </div>
            <div class="header-top__c">
              <div class="top-nav">
                <div v-for="item, index in menu.top" :key="'top-nav-' + index" class="top-nav__item">
                  <a :href="item.url || 'javascript:void(0);'" class="top-nav__link">{{ item.title }}</a>
                </div>						
                
                <div v-for="item, index in menu.top_other" :key="'top-nav-other-' + index" class="top-nav__item top-nav__item--hidden">
                  <a :href="item.url || 'javascript:void(0);'" class="top-nav__link">{{ item.title }}</a>
                </div>

                <div class="top-nav__item top-nav__more">
                  <a href="javascript:void(0);" class="top-nav__more-btn top-nav__link">Еще</a>
                </div>
              </div>
            </div>
            <div class="header-top__r">
              <div class="contact-phone">
                <a href="tel:+74843979498" class="contact-phone__link">+7 (4843) 979-498</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-main">
        <div class="container">
          <div class="header-main__wrapper">
            <div class="header-main__logo">
              <a href="/"><img src="/img/logo.png" alt=""></a>
            </div>
            <div class="header-main__search">
              <form action="" class="search-form" ref="searchPopoverTrigger">
                <div class="search-bar">
                  <input type="text" class="search-bar__input" name="q" placeholder="Наименование товара или артикул">
                  <button type="submit" class="search-bar__btn" value="" @click.prevent="openSearchPopover"></button>
                </div>
              </form>

              <SearchPopover 
                :isActive="searchPopoverStatus" 
                ref="searchPopover"
              />
            </div>

            <div class="header-main__buttons">
              <a href="javascript:void(0);" class="circle-btn" ref="authPopoverTrigger" @click.prevent="authPopoverShow">
                <span class="circle-btn__shape">
                  <span class="circle-btn__icon icon icon-header-account"></span>
                </span>
                
                <span class="circle-btn__text">Личный кабинет</span>
              </a>

              <a href="javascript:void(0);" class="circle-btn">
                <span class="circle-btn__shape">
                  <span class="circle-btn__icon icon icon-header-favorites"></span>
                </span>
                
                <span class="circle-btn__text">Избранное</span>
              </a>

              <a href="javascript:void(0);" class="circle-btn" ref="cartPopoverTrigger" @click.prevent="openCartPopover">
                <span class="circle-btn__shape">
                  <span class="circle-btn__icon icon icon-header-cart"></span>
                  <span class="circle-btn__number">15</span>
                </span>
                
                <span class="circle-btn__text">Корзина</span>
              </a>

              <CartPopover 
                ref="cartPopover" 
                :isActive="cartPopoverStatus"
                :closeHandler="closeCartPopover"
              />

              <div v-show="addedToCardPopup"  ref="cartAddedPopover" class="added-to-cart-container">
                <AddedToCart />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="header-nav-container">
        <div class="container">
          <div class="header-nav-desktop">
            <div class="header-nav">
              <ul class="header-nav-list">
                <li>
                  <a href="javascript:void(0);" class="item-has-icon" @click.prevent="menuToggle"><span class="icon icon-catalog">
                    <span class="t"></span>
                    <span class="m"></span>
                    <span class="b"></span>
                  </span>Каталог</a>
                </li>
      
                <li v-for="item, key in menu.items" :key="'nav-desktop-' + key">
                  <a :href="item.url || 'javascript:void(0);'" v-bind:class="{ 'item-has-icon': item.icon }"><span v-if="item.icon" :class="'icon ' + item.icon"></span>{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="header-nav-tablet">
            <div class="header-nav">
              <ul class="header-nav-list">
                <li>
                  <a href="javascript:void(0);" class="item-has-icon"><span class="icon icon-catalog">
                    <span class="t"></span>
                    <span class="m"></span>
                    <span class="b"></span>
                  </span>Каталог</a>
                </li>
      
                <li v-for="item, key in menu.items_tablet" :key="'nav-tablet-' + key">
                  <a :href="item.url || 'javascript:void(0);'" v-bind:class="{ 'item-has-icon': item.icon }"><span v-if="item.icon" :class="'icon ' + item.icon"></span>{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>


      <div class="header-m">
        <div class="container">
          <div class="header-m-top">
            <div class="header-m-top__a">
              <div class="mobile-nav-trigger">
                <a href="javascript:void(0);" class="item-has-icon"><span class="icon icon-catalog">
                  <span class="t"></span>
                  <span class="m"></span>
                  <span class="b"></span>
                </span></a>
              </div>						
            </div>

            <div class="header-m-top__b">
              <a href="/">
                <img src="/img/logo-m.png" alt="">
              </a>
            </div>

            <div class="header-m-top__c">
              <a href="javascript:void(0);" class="header-m-icon-link" >
                <span class="icon icon-header-account"></span>
              </a>

              <div class="mobile-favorites-link">
                <a href="javascript:void(0);" class="header-m-icon-link">
                  <span class="icon icon-header-favorites"></span>
                </a>
              </div>

              <a href="javascript:void(0);" class="header-m-icon-link">
                <span class="icon icon-header-cart"></span>
                <span class="header-m-icon-link__number">15</span>
              </a>
            </div>
          </div>

          <div class="header-m-search">
            <form action="" class="search-form">
              <div class="search-bar">
                <input type="text" class="search-bar__input" name="q" placeholder="Наименование товара или артикул">
                <button type="submit" class="search-bar__btn" value=""></button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div class="popover auth-popover" ref="authPopover" v-show="showAuthPopoverStatus">
        <div class="auth-popover__text">
          <p>Войдите, чтобы делать покупки, отслеживать заказы и пользоваться персональными скидками и баллами</p>
        </div>
        <div class="auth-popover__buttons">
          <div class="auth-popover__buttons-l" @click.prevent="()=> { showLogin(); showAuth();}">
            <a href="#" class="btn">Войти</a>
          </div>
          <div class="auth-popover__buttons-r">
            <a href="#" class="link" @click.prevent="()=> { showRegistration(); showAuth();}">Зарегистрироваться</a>
          </div>
        </div>
        <div class="auth-popover__img">
          <a href="#">
            <img src="/img/auth-b.png" alt="">		
          </a>
        </div>
      </div>

      <Modal
      name="auth-modal"
      :height="'auto'"
      :width="436"
      :maxWidth="436"
      :adaptive="true"
      >
        <auth :hide="hideAuth" :loginTab="loginTab" :registrationTab="registrationTab" :showLogin="showLogin" :showRegistration="showRegistration"></auth>
      </Modal>
      
    </header>

    <Menu :isActive="menuIsActive" />
  </div>
</template>
<style src="./header.sass"></style>
<style src="../../components/widgets/modal/Modal.sass"></style>
<script src="./header.js"></script>