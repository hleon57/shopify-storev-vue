<template>
  <div class="products">
    <h1>Products</h1>
    <AllProducts />
  </div>
</template>

<script>
import { useStore } from 'vuex';

import AllProducts from '../components/products/AllProducts.vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    AllProducts,
  },
};
</script>

<style></style>
