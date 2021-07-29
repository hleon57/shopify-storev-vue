import { createStore } from 'vuex';

import {
  getProductByHandle,
  allProductsQuery,
} from '../assets/queries/products';

import { createCart, addToCart, getCartUrl } from '../assets/mutations/cart';

// `process.env` is the one defined in the webpack's DefinePlugin
const envVariables = process.env;

// Read vars from envVariables object
const { VUE_APP_STOREFRONT_API_KEY, VUE_APP_SHOPIFY_URL } = envVariables;

const config = {
  headers: {
    'X-Shopify-Storefront-Access-Token': VUE_APP_STOREFRONT_API_KEY,
    'content-Type': 'application/graphql',
  },
};

const configWithVars = {
  headers: {
    'X-Shopify-Storefront-Access-Token': VUE_APP_STOREFRONT_API_KEY,
    'content-Type': 'application/json',
  },
};

// I would prefer to change this to modules on a real project
// store for products / collections / globals ... etc

export default createStore({
  state: {
    allProducts: null,
    currentProduct: null,
    cartId: null,
    cart: {
      items: [],
    },
    checkoutUrl: null,
  },
  mutations: {
    allProducts(state, allProducts) {
      state.allProducts = allProducts;
    },

    getProductByHandle(state, productByHandle) {
      state.currentProduct = productByHandle;
    },
    setCheckoutUrl(state, url) {
      state.checkoutUrl = url;
    },

    addToCart(state, atc) {
      // TODO: Update Quantity if item exists
      // TODO: Preserve cart on reload
      state.cart.items.push(atc.prod);
      if (!state.cartId) state.cartId = atc.cartId;
    },
  },
  actions: {
    getAxios(
      context,
      query,
      configuration = config,
      url = `https://${VUE_APP_SHOPIFY_URL}/api/graphql`
    ) {
      return this.axios
        .post(url, query, configuration)
        .then((response) => {
          return response;
        })
        .catch((errorResponse) => {
          console.error('Error', errorResponse);
        });
    },

    getAxiosWithVars(context, payload) {
      const url = !payload.url
        ? `https://${VUE_APP_SHOPIFY_URL}/api/graphql`
        : payload.url;
      return this.axios
        .post(
          url,
          {
            query: payload.query,
            variables: payload.vars,
          },
          payload.configuration
        )
        .then((response) => {
          return response;
        })
        .catch((errorResponse) => {
          console.error('Error', errorResponse);
        });
    },

    async getAllProducts(context) {
      let response = await context.dispatch(
        'getAxios',
        allProductsQuery,
        config
      );
      context.commit('allProducts', response.data.data.shop.products.edges);
    },

    async getProductByHandle(context, handle) {
      let query = getProductByHandle;
      let response = await context.dispatch('getAxiosWithVars', {
        query,
        vars: { handle },
        configuration: configWithVars,
      });
      context.commit('getProductByHandle', response.data.data.productByHandle);
    },

    async addToCart(context, prod) {
      try {
        let query = createCart;
        let url = `https://${VUE_APP_SHOPIFY_URL}/api/unstable/graphql.json`;

        if (context.state.cart.items.length === 0) {
          let response = await context.dispatch('getAxiosWithVars', {
            query,
            vars: {
              CartInput: {
                lines: [prod],
              },
            },
            configuration: configWithVars,
            url,
          });

          let cartId = response.data.data.cartCreate.cart.id;

          if (cartId) {
            query = getCartUrl;
            let checkoutUrl = await context.dispatch('getAxiosWithVars', {
              query,
              vars: {
                cartId,
              },
              configuration: configWithVars,
              url,
            });

            context.commit(
              'setCheckoutUrl',
              checkoutUrl.data.data.cart.checkoutUrl
            );

            query = addToCart;
            let res = await context.dispatch('getAxiosWithVars', {
              query,
              vars: {
                lines: [prod],
                cartId: cartId,
              },
              configuration: configWithVars,
              url,
            });
            context.commit('addToCart', { prod, cartId });
            return res;
          } else {
            return console.error('No Cart ID Returned New Cart');
          }
        } else {
          if (context.state.cartId) {
            query = addToCart;
            let res = await context.dispatch('getAxiosWithVars', {
              query,
              vars: {
                lines: [prod],
                cartId: context.state.cartId,
              },
              configuration: configWithVars,
              url,
            });
            context.commit('addToCart', { prod });
            return res;
          } else {
            return console.error('No Cart ID Returned Add');
          }
        }
      } catch (error) {
        console.error(error);
      }

      // return finished;
    },
  },
  modules: {},
});
