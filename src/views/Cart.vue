<template>
  <div>
    <h1>CART PAGE</h1>
    <div class="cart-items">
      <div class="cart-items__empty" v-if="itemsInCart.length === 0">
        <h1>Your cart is empty</h1>
      </div>
      <div class="cart-items__container" v-else>
        <div class="cart-items__checkout">
          <a :href="checkoutLink">Checkout</a>
        </div>
        <div class="cart-items__wrapper">
          <div
            class="cart-items__item"
            v-for="item in itemsInCart"
            :key="item.id"
          >
            <CartItem :product="item" :quantity="item.quantity" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import CartItem from '../components/cart/CartItem.vue';

export default {
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    checkNewItems() {
      let items = [];
      this.store.state.cart.items.forEach((item) =>
        this.store.state.allProducts.forEach((prod) => {
          if (item.merchandiseId === prod.node.variants.edges[0].node.id) {
            items.push({ ...prod.node, quantity: item.quantity });
          }
        })
      );
      return items;
    },
  },
  computed: {
    itemsInCart() {
      let items = this.checkNewItems();
      return items;
    },
    checkoutLink() {
      return this.store.state.checkoutUrl;
    },
  },
  components: {
    CartItem,
  },
};
</script>

<style lang="scss">
.cart-items__checkout {
  display: flex;
  justify-content: center;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    background-color: #8e221a;
    color: white;
    height: 50px;
    text-decoration: none;
    border: 1px solid #8e221a;
    &:hover {
      background-color: white;
      color: #8e221a;
    }
  }
}
</style>
