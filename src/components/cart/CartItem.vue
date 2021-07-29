<template>
  <div class="cart-item">
    <div class="cart-item__image-wrapper">
      <img :src="image" :alt="title" />
    </div>
    <div class="cart-item__details">
      <p class="cart-item__title">{{ title }}</p>
      <p class="cart-item__price">{{ fullPrice }}</p>
      <p class="cart-item__quantity">{{ quantity }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    quantity: Number,
  },
  setup(props) {
    console.log(props);
    // eslint-disable-next-line vue/no-setup-props-destructure
    const image = props.product.images.edges[0].node.src;
    // eslint-disable-next-line vue/no-setup-props-destructure
    const title = props.product.title;
    const fullPrice =
      Number(props.product.variants.edges[0].node.price) * props.quantity;

    return {
      image,
      title,
      fullPrice,
    };
  },
};
</script>

<style lang="scss">
.cart-item {
  display: flex;
  align-items: center;
  .cart-item__image-wrapper {
    max-width: 150px;
    img {
      width: 100%;
    }
  }
  .cart-item__details {
    display: flex;
    justify-content: space-around;
    width: 100%;
    p {
      border: 1px solid black;
      padding: 25px;
      font-size: 24px;
      font-weight: bold;
      flex-basis: 25%;
    }
  }
}
</style>
