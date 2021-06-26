<template>
  <div class="page-content mt-global">
    <section class="header-title" data-aos="fade-up">
      <div class="row">
        <span class="text-product-header all-category-product"
          >Products on category <i>" {{ category.name }} "</i></span
        >
      </div>
    </section>
    <section class="store-trend-categories">
      <div class="row justify-content-center">
        <img :src="category.image" class="mb-4" style="width: 300px" />
      </div>
      <div class="row mt-4 justify-content-center" v-if="products.length > 0">
        <div
          class="col-6 col-md-3 col-lg-3 col-product"
          v-for="(product, index) of products"
          :key="index"
          data-aos="fade-up"
        >
          <router-link
            :to="{ name: 'detail', params: { slug: product.slug } }"
            class="component-product"
          >
            <div class="product-thumbnail">
              <img :src="product.image" class="w-100" />
            </div>
            <div class="product-text">
              <p>{{ product.title }}</p>
            </div>
            <div class="discount" style="color: #999">
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
      </div>
      <!-- kalo kosong -->
      <div class="row justify-content-center" v-else>
        <div class="alert alert-warning">
          <h4>Product Kosong</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(() => {
      store.dispatch("category/getProductCategory", route.params.slug);
    });

    const products = computed(() => {
      return store.getters["category/getProductCategory"];
    });

    const category = computed(() => {
      return store.getters["category/getCategory"];
    });

    return {
      store,
      route,
      products,
      category,
    };
  },
};
</script>