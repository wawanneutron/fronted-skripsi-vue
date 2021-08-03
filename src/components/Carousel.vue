<template>
  <section class="img-carousel" v-if="sliders.length > 0">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-img" data-aos="zoom-in">
          <div id="carousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-for="(slider, id) in sliders"
                :class="{ active: id == 0 }"
                :key="slider.id"
              >
                <a :href="slider.link" target="_blank">
                  <img :src="slider.image" class="d-block w-100 rounded-lg" />
                </a>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carousel"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carousel"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-else>
    <content-loader />
  </div>
</template>
<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ContentLoader } from "vue-content-loader";

export default {
  components: {
    ContentLoader,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      return store.dispatch("slider/getSliders");
    });

    const sliders = computed(() => {
      return store.getters["slider/getSliders"];
    });

    return {
      store,
      sliders,
    };
  },
};
</script>