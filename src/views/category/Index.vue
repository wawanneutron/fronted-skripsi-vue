<template>
  <section class="details-header"></section>
  <main id="category">
    <section class="mt-global store-breadcrumbs">
      <div class="row">
        <div class="col-12">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link :to="{ path: '/' }">Home</router-link>
              </li>
              <li class="breadcrumb-item active">Categories</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
    <div class="page-content category-all mt-global">
      <section class="header-title" data-aos="fade-up">
        <div class="row">
          <span class="text-product-header all-category-product"
            >All Categories</span
          >
        </div>
      </section>
      <section class="store-trend-categories">
        <div class="row">
          <div
            class="col-6 col-md-3 col-lg-2"
            v-for="category in categories"
            :key="category.id"
            data-aos="fade-up"
          >
            <router-link
              :to="{
                name: 'category_show',
                params: { slug: category.slug },
              }"
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
    </div>
  </main>
</template>
<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("category/getAllCategories");
    });

    const categories = computed(() => {
      return store.getters["category/getAllCategories"];
    });
    return {
      store,
      categories,
    };
  },
};
</script>