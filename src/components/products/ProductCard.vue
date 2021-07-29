<template>
  <router-link
    :to="{ name: 'Product', params: { id: product.handle } }"
    class="product-card"
  >
    <div class="pc__image-wrapper">
      <img :src="product.images.edges[0].node.src" :alt="product.title" />
    </div>
    <div class="pc__texts">
      <p class="pc__title">{{ product.title }}</p>
      <p class="pc__price">${{ product.variants.edges[0].node.price }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object,
  },
};
</script>

<style>
.product-card {
  display: block;
  max-height: 350px;
  max-width: 250px;
  border: 1px solid black;
  margin: 0 15px;
  text-decoration: none;
  color: black;
}
.pc__image-wrapper img {
  width: 100%;
}
</style>
