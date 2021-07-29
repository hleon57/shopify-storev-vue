<template>
  <div class="product-details" v-if="image">
    <ProductImage :image="imageSrc" :title="imageAlt" />
    <ProductTexts :product="product" />
  </div>
</template>

<script>
import ProductImage from './ProductImage.vue';
import ProductTexts from './ProductTexts.vue';
export default {
  props: {
    product: Object,
  },
  setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    let image = props.product.images.edges[0].node;

    return {
      image,
    };
  },
  mounted() {
    this.image = this.product.images.edges[0].node;
  },
  computed: {
    imageSrc() {
      return this.image.originalSrc;
    },
    imageAlt() {
      return this.image.altText ? this.image.altText : this.product.title;
    },
  },
  components: {
    ProductImage,
    ProductTexts,
  },
};
</script>

<style>
.product-details {
  display: flex;
  justify-content: space-between;
}
</style>
