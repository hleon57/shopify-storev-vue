import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Products.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
