<template>
  <section class="product-page">
    <ProductDetails :product="currentProduct" v-if="currentProduct" />
  </section>
</template>

<script>
import { useStore, mapState } from 'vuex';
import { useRoute } from 'vue-router';

import ProductDetails from '../components/product/productDetails.vue';

export default {
  setup() {
    const route = useRoute();
    const handle = route.params.id;

    const store = useStore();
    store.dispatch('getProductByHandle', handle);
  },
  computed: {
    ...mapState({
      currentProduct: (state) => state.currentProduct,
    }),
  },
  components: {
    ProductDetails,
  },
};
</script>

<style></style>
