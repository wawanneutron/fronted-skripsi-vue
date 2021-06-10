<template>
  <div class="page-content mt-global">
    <section class="header-title" data-aos="fade-up">
      <div class="row">
        <span class="text-product-header all-category-product"
          >Al Products</span
        >
      </div>
    </section>
    <section class="store-new-products">
      <div class="row">
        <div
          class="col-6 col-md-3 col-lg-3 col-product"
          v-for="(product, index) in products"
          :key="index"
          data-aos="fade-up"
        >
          <router-link to="/details" class="component-product">
            <div class="product-thumbnail">
              <img :src="product.image" class="w-100" alt="" />
            </div>
            <div class="product-text">
              <p>{{ product.title }}</p>
            </div>
            <div class="product-price">
              <p>{{ moneyFormat(product.price) }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("product/getProductsAll");
    });

    const products = computed(() => {
      return store.getters["product/getProductsAll"];
    });

    return {
      store,
      products,
    };
  },
};
</script>