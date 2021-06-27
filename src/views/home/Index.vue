<template>
  <div>
    <Carousel />
    <div class="page-content">
      <section class="header-title" data-aos="fade-up">
        <div class="row">
          <div class="col-md-12 col-12">
            <span class="text-product-header">Kategori Terlaris</span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12">
            <router-link class="show-all" to="/category-all"
              >Tampilkan kategori lainnya</router-link
            >
          </div>
        </div>
      </section>
      <section class="store-trend-categories">
        <div class="row">
          <div
            class="col-6 col-md-3 col-lg-2"
            data-aos="fade-up"
            v-for="(category, index) in categories"
            :key="index"
          >
            <router-link
              :to="{ name: 'category_show', params: { slug: category.slug } }"
              class="component-categories d-block"
            >
              <div class="categories-image">
                <img :src="category.image" class="w-100" />
              </div>
              <p class="categories-text">{{ category.name }}</p>
            </router-link>
          </div>
        </div>
      </section>
      <section class="header-title mt-4" data-aos="fade-up">
        <div class="row">
          <div class="col-md-6 col-12">
            <span class="text-product-header">Product Terbaru</span>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-12 col-md-8">
            <router-link class="show-all" to="/product-all"
              >Tampilkan product lainnya</router-link
            >
          </div>
        </div>
      </section>
      <div class="row">
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
    </div>
  </div>
</template>
<script>
import { computed, defineAsyncComponent, onMounted } from "vue";
import { useStore } from "vuex";

// import component with lazy load
const Carousel = defineAsyncComponent(() =>
  import("../../components/Carousel.vue")
);
export default {
  components: {
    Carousel: Carousel,
  },
  setup() {
    const store = useStore();

    // panggil action getCategoriesHome di module category vuex
    onMounted(() => {
      store.dispatch("category/getCategoriesHome");
    });

    onMounted(() => {
      store.dispatch("product/getProductsHome");
    });

    const products = computed(() => {
      return store.getters["product/getProductsHome"];
    });

    // get data getCategoriesHome dari module category di vuex
    const categories = computed(() => {
      return store.getters["category/getCategoriesHome"];
    });

    return {
      store,
      categories,
      products,
    };
  },
};
</script>
