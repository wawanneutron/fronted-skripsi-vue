<template>
  <section class="details-header"></section>
  <main id="category-show">
    <section class="mt-global store-breadcrumbs">
      <div class="row">
        <div class="col-12">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link :to="{ path: '/' }">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link :to="{ path: '/category-all' }"
                  >Categories</router-link
                >
              </li>
              <li class="breadcrumb-item active">Products</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
    <div class="page-content category-all mt-global">
      <section class="header-title" data-aos="fade-up">
        <div class="row">
          <span class="text-product-header all-category-product"
            >All Categories <i>" {{ category.name }} "</i></span
          >
        </div>
      </section>
      <section class="product-on-category">
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <img :src="category.image" class="mb-4 img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4 justify-content-center" v-if="products.length > 0">
          <div
            class="col-6 col-md-3 col-lg-3 col-product"
            v-for="(product, index) in products"
            :key="index"
            data-aos="fade-up"
          >
            <router-link
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
        </div>
        <!-- kalo kosong -->
        <div class="row justify-content-center" v-else>
          <div class="alert alert-warning">
            <h4>Product Kosong</h4>
          </div>
        </div>
      </section>
    </div>
  </main>
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