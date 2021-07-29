<template>
  <div class="product-texts">
    <div class="pt__details">
      <p class="pt__details-title">{{ title }}</p>
      <p class="pt__details-price">${{ price }}</p>
      <p class="pt__details-description">{{ description }}</p>
    </div>
    <div class="pt__quantity" v-if="quantity > 0">
      <label for="quantity"> QTY:</label>
      <input
        name="quantity"
        type="number"
        min="1"
        :max="quantity"
        v-model="selectedQty"
      />
    </div>
    <div class="pt__atc">
      <button class="pt__atc" @click="addToCart($event)" v-if="quantity > 0">
        Add To Cart
      </button>
      <button class="pt__notify" disabled v-else>
        Notify Me When Available
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  props: {
    product: Object,
  },
  setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const currentProduct = props.product;
    const selectedQty = 1;
    const store = useStore();

    let currentVariantNumber = 0;

    return {
      store,
      selectedQty,
      currentProduct,
      currentVariantNumber,
    };
  },
  methods: {
    async addToCart(e) {
      e.target.setAttribute('disabled', 'disabled');
      const variant = this.getCurrentVariant(this.currentVariantNumber);
      const atc = await this.store.dispatch('addToCart', {
        merchandiseId: variant.id,
        quantity: Number(this.selectedQty),
      });
      console.log('atc: ', atc);
      e.target.removeAttribute('disabled');
    },
    getCurrentVariant(variantNumber) {
      return this.currentProduct.variants.edges[variantNumber].node;
    },
  },
  computed: {
    title() {
      return this.currentProduct.title;
    },
    price() {
      return this.currentProduct.variants.edges[this.currentVariantNumber].node
        .price;
    },
    description() {
      return this.currentProduct.description;
    },
    quantity() {
      return this.currentProduct.variants.edges[this.currentVariantNumber].node
        .quantityAvailable;
    },
  },
};
</script>

<style lang="scss">
.product-texts {
  max-width: 50%;
  width: 100%;
  padding: 50px 15px;
  text-align: center;
  .pt__details-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 0;
    line-height: 1;
  }
  .pt__details-price {
    font-size: 24px;
  }
  .pt__quantity {
    margin-bottom: 15px;
    label {
      margin-right: 15px;
    }
  }

  .pt__atc {
    cursor: pointer;
    background-color: #8e221a;
    color: white;
    border: none;
    width: 150px;
    height: 35px;
    margin: 0 auto;
    border: 1px solid #8e221a;
    &:hover {
      background-color: white;
      color: #8e221a;
    }
  }
}
</style>
