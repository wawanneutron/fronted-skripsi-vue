<template>
  <main id="product">
    <slider />
    <div class="page-content product-all mt-global">
      <section class="header-search" data-aos="fade-up">
        <div class="row mb-5 justify-content-center text-center">
          <div class="col-md-8 col-search mb-3">
            <span class="text-product-header all-category-product"
              >Cari barang kesukaan kamu disini</span
            >
            <div class="search_box">
              <input
                autofocus
                type="text"
                :placeholder="`Hay ${
                  username.name ? username.name : 'kamu'
                } cari disini yuk..`"
                class="input_search"
                v-model="keyword"
                @input="search"
              />
            </div>
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
          <div class="col-12 mb-3" v-if="dataProducts.length == 0">
            <div class="alert alert-info text-center">
              product {{ keyword }} tidak ada
            </div>
          </div>
          <div
            class="col-md-3 col-lg-3 col-product"
            v-for="(product, index) in dataProducts"
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
              <div
                class="rating d-flex justify-content-center"
                style="display: inline-block; margin: 0 auto"
              >
                <star-rating
                  :show-rating="false"
                  :star-size="23"
                  :read-only="true"
                  :increment="0.01"
                  :rating="product.avg_rating"
                ></star-rating>
                <span>{{ product.total_reviews }} (ulasan)</span>
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
              <div
                class="float-right"
                style="margin-top: -30px; font-size: 15px"
              >
                <span
                  style="background-color: darkorange"
                  class="badge badge-pill badge-success text-white"
                  >DISKON {{ product.discount }} %</span
                >
              </div>
              <div class="product-price">
                <p>Rp. {{ moneyFormat(calculateDiscount(product)) }}</p>
              </div>
              <div
                class="rating d-flex justify-content-center"
                style="display: inline-block; margin: 0 auto"
              >
                <star-rating
                  :show-rating="false"
                  :star-size="23"
                  :read-only="true"
                  :increment="0.01"
                  :rating="product.avg_rating"
                ></star-rating>
                <span>{{ product.total_reviews }} (ulasan)</span>
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
          <products-component />
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import Api from "../../api/Api";
import StarRating from "vue-star-rating";

const sliders = defineAsyncComponent(() =>
  import("../../components/Carousel.vue")
);
const ProductsComponent = defineAsyncComponent(() =>
  import("../../components/Products.vue")
);

export default {
  components: {
    slider: sliders,
    ProductsComponent: ProductsComponent,
    StarRating,
  },
  setup() {
    const store = useStore();
    const username = store.state.auth.user;
    return {
      store,
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