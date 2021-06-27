<template>
  <slider />
  <div class="page-content product-all mt-global">
    <section class="header-title" data-aos="fade-up">
      <div class="row mb-5">
        <div class="col-md-7 mb-3">
          <span class="text-product-header all-category-product"
            >Belanja Kebutuhan mu Sekarang...</span
          >
        </div>
        <div class="col-md-5">
          <input
            type="text"
            :placeholder="`Hay ${username.name} mau nyari apa`"
            class="form-control"
            v-model="keyword"
            @input="search"
          />
        </div>
      </div>
    </section>
    <section class="store-new-products">
      <div class="row" v-if="keyword.length > 0">
        <div class="col-12 mb-3">
          <span
            class="text-product-header all-category-product"
            style="font-size: 20px"
            >Hasil pencarian "{{ keyword }}"</span
          >
        </div>
        <div
          class="col-6 col-md-3 col-lg-3 col-product"
          v-for="(product, index) in dataProducts"
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
      <div class="row" v-if="!keyword.length > 0">
        <!-- tampilkan semua -->
        <div class="col-12 mb-3">
          <span
            class="text-product-header all-category-product"
            style="font-size: 20px"
            >Semua product...</span
          >
        </div>
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
    </section>
  </div>
</template>

<style>
.product-all {
  margin-top: 70px !important;
}
</style>
<script>
import { computed, defineAsyncComponent, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import Api from "../../api/Api";

const sliders = defineAsyncComponent(() =>
  import("../../components/Carousel.vue")
);

export default {
  components: {
    slider: sliders,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("product/getProductsAll");
    });

    const products = computed(() => {
      return store.getters["product/getProductsAll"];
    });

    const username = store.state.auth.user;

    return {
      store,
      products,
      username,
    };
  },

  /* search */
  data() {
    return {
      keyword: "",
      dataProducts: [],
    };
  },
  /* search method */

  methods: {
    search() {
      let keyword = this.keyword;
      if (keyword.length > 0) {
        Api.get("/product/search/" + keyword)
          .then((response) => {
            this.dataProducts = response.data.product;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.dataProducts = 0;
      }
    },
  },
};
</script>