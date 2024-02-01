import products from './data.json';

const bestsellers = products[0]['products1'];
const newProducts = products[0]['products2'];
const offerProducts = products[0]['products3'];
const products4 = products[0]['products4'];

import Header from '../../components/header/header.vue';
import Footer from '../../components/footer/footer.vue';
import Services from '../../components/content/main_services/main_services.vue';
import Subscription from '../../components/content/subscription/subscription.vue';
import CTA from '../../components/content/cta/cta.vue';
import ProductsSection from '../../components/content/products_section/products_section.vue';
import Benefits from '../../components/content/benefits/benefits.vue';
import RecentNews from '../../components/content/recent_news/recent_news.vue';
import SpecialOffers from '../../components/content/special_offers/special_offers.vue';

export default {
    data: () => {
        return {
            bestsellers: bestsellers,
            newProducts: newProducts,
            offerProducts: offerProducts,
            products4: products4
        }
    },
    components: {
        Header,
        Services,
        Subscription,
        CTA,
        ProductsSection,
        Benefits,
        RecentNews,
        Footer,
        SpecialOffers
    }
}