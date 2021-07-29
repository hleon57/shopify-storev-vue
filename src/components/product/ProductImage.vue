<template>
  <div class="product-image">
    <img :src="image" :alt="title" class="product-img" loading="lazy" />
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    title: String,
  },
};
</script>

<style>
.product-image {
  max-width: 50%;
  padding: 15px;
  margin: 0 auto;
}
.product-image img {
  width: 100%;
}
</style>
