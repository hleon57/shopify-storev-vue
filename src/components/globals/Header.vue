<template>
  <div id="nav">
    <router-link class="nav-link" to="/">Home</router-link>
    <router-link class="nav-link" to="/products">Products</router-link>
    <router-link class="nav-link" to="/cart"
      >Cart <span>{{ cartItems }}</span></router-link
    >
    <a class="nav-link" :href="`${checkoutLink}`" v-if="checkoutLink"
      >Checkout</a
    >
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  mounted() {
    setTimeout(() => {
      this.store.dispatch('getAllProducts');
    }, 500);
  },
  computed: {
    checkoutLink() {
      return this.store.state.checkoutUrl;
    },
    cartItems() {
      return this.store.state.cart.items.length;
    },
  },
};
</script>

<style lang="scss">
#nav {
  padding: 30px;
  .nav-link {
    position: relative;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
    &:not(:last-child):after {
      content: '|';
      position: absolute;
      right: -10px;
      color: #2c3e50;
    }
  }
}
</style>
