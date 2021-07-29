import
<template>
  <div class="home">
    <StoreHomepage />
  </div>
</template>

<script>
// @ is an alias to /src
import StoreHomepage from '@/components/StoreHomepage.vue';

export default {
  name: 'Home',
  components: {
    StoreHomepage,
  },
};
</script>
