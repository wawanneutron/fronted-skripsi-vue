<template>
  <div>
    <Carousel></Carousel>
    <div class="page-content">
      <section class="header-title" data-aos="fade-up">
        <div class="row">
          <span class="text-product-header">Trend Categories</span>
        </div>
        <div class="row">
          <router-link class="show-all" to="/category"
            >Show all categories</router-link
          >
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
            <router-link to="/category" class="component-categories d-block">
              <div class="categories-image">
                <img :src="category.url" class="w-100" />
              </div>
              <p class="categories-text">{{ category.name }}</p>
            </router-link>
          </div>
        </div>
      </section>
      <section class="header-title" data-aos="fade-up">
        <div class="row">
          <span class="text-product-header">New Products</span>
        </div>
        <div class="row">
          <router-link class="show-all" to="/category"
            >Show All New Products</router-link
          >
        </div>
      </section>
      <Products></Products>
    </div>
  </div>
</template>
<script>
import Products from "../components/Products";
import Carousel from "../components/Carousel";
export default {
  name: "home",
  components: {
    Products,
    Carousel,
  },
  data: () => ({
    categories: [
      {
        id: 1,
        name: "Babyes",
        url: "/images/categories-babyes.svg",
      },
      {
        id: 2,
        name: "Furniture",
        url: "/images/categories-furnitures.svg",
      },
      {
        id: 3,
        name: "Getgets",
        url: "/images/categories-gedgets.svg",
      },
      {
        id: 4,
        name: "Makeup",
        url: "/images/categories-makeup.svg",
      },
      {
        id: 5,
        name: "Sneakers",
        url: "/images/categories-sneakers.svg",
      },
      {
        id: 6,
        name: "Tools",
        url: "/images/categories-tools.svg",
      },
    ],
  }),
};
</script>
