<template>
  <div class="allProducts" v-if="allProducts">
    <div class="product-cards">
      <div v-for="product in allProducts" :key="product.node.id">
        <ProductCard :product="product.node" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ProductCard from './ProductCard.vue';

export default {
  name: 'allProducts',
  setup() {},
  computed: {
    ...mapState({
      allProducts: (state) => state.allProducts,
    }),
  },
  components: {
    ProductCard,
  },
};
</script>

<style>
.product-cards {
  padding: 25px;
  display: flex;
  justify-content: flex-start;
}
</style>
