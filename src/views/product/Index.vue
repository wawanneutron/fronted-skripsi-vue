<template>
  <main id="product">
    <slider />
    <div class="page-content product-all mt-global">
      <section class="header-search" data-aos="fade-up">
        <div class="row mb-5 justify-content-center text-center">
          <div class="col-md-8 col-search mb-3">
            <span class="text-product-header all-category-product"
              >Cari Barang Kebutuhan Yuk..</span
            >
            <div class="search_box">
              <input
                type="text"
                :placeholder="`Hay ${username.name} mau nyari apa`"
                class="input_search"
                v-model="keyword"
                @input="search"
              />
            </div>
          </div>
          <!-- <div class="col-md-7 justify-content-center">
            
          </div> -->
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
          <div class="col-12 mb-3" v-if="dataProducts.length == 0">
            <div class="alert alert-info text-center">
              product {{ keyword }} tidak ada
            </div>
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
        <div class="row" v-if="!keyword.length > 0">
          <!-- tampilkan semua -->
          <div class="col-12 mb-3">
            <span
              class="text-product-header all-category-product"
              style="font-size: 20px"
              >🎉 Banyak penawaran menarik 🎉</span
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
      </section>
    </div>
  </main>
</template>



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
        this.dataProducts = [];
      }
    },
  },
};
</script>