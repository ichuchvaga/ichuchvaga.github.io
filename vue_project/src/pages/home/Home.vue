<template>
  <div id="app">
    <Header></Header>
    <div class="page-content">
      <Services></Services>
      <ProductsSection title="Лидеры продаж" :items="bestsellers"></ProductsSection>
      <SpecialOffers></SpecialOffers>
      <ProductsSection title="Новинки" :items="newProducts"></ProductsSection>
      <CTA></CTA>
      <ProductsSection title="Акции и спецпредложения" :items="offerProducts"></ProductsSection>
      <Subscription></Subscription>
      <ProductsSection title="Успей купить" :items="products4"></ProductsSection>
      <Benefits></Benefits>
      <RecentNews></RecentNews>
      <Footer></Footer>
    </div>    
  </div>
</template>

<style src="../../sass/style.sass"></style>
<script src="./Home.js"></script>