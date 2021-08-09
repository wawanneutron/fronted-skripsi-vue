<template>
  <div
    class="col-6 col-md-3 col-lg-3 col-product"
    v-for="(product, index) in products"
    :key="index"
    data-aos="fade-up"
  >
    <router-link
      :to="{ name: 'detail', params: { slug: product.slug } }"
      class="component-product"
      v-if="product.discount <= 0"
    >
      <div class="product-thumbnail">
        <img :src="product.gallery[0].image" class="w-100" />
      </div>
      <div class="product-text">
        <p>{{ product.title }}</p>
      </div>
      <div class="discount">
        <span>Rp. {{ moneyFormat(product.price) }} </span>
      </div>
    </router-link>
    <router-link
      v-else
      :to="{ name: 'detail', params: { slug: product.slug } }"
      class="component-product"
    >
      <div class="product-thumbnail">
        <img :src="product.gallery[0].image" class="w-100" />
      </div>
      <div class="product-text">
        <p>{{ product.title }}</p>
      </div>
      <div class="discount">
        <s>Rp. {{ moneyFormat(product.price) }} </s>
      </div>
      <span
        style="background-color: darkorange"
        class="badge badge-pill badge-success text-white float-right"
        >DISKON {{ product.discount }} %</span
      >
      <div class="product-price">
        <p>Rp. {{ moneyFormat(calculateDiscount(product)) }}</p>
      </div>
    </router-link>
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