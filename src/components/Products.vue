<template>
  <div
    class="col-md-4 col-lg-3 col-product"
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
      <div class="float-right" style="margin-top: -30px; font-size: 15px">
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
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
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