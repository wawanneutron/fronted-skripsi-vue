<template>
  <section class="details-header"></section>
  <main id="detail">
    <!-- breadcrumbs -->
    <section class="mt-global store-breadcrumbs">
      <div class="row alert">
        <div class="col-12">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link :to="{ path: '/' }">Home</router-link>
              </li>
              <li class="breadcrumb-item active">Product Details</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
    <!-- detail product -->
    <section class="store-gallery">
      <div class="row justify-content-around">
        <!-- product image -->
        <div class="col-md-6 col-detail">
          <div class="card">
            <!-- card header -->
            <transition
              name="slide-fade"
              mode="out-in"
              v-if="gallery[photoActive]"
            >
              <img
                :src="gallery[photoActive].image"
                class="img-store img-fluid w-100"
              />
            </transition>
            <!-- thumbnail -->
            <div class="row justify-content-center">
              <div
                class="col-md-3 col-4 col-thumbnail"
                v-for="(item, index) of gallery"
                :key="index"
              >
                <main @click="changeActive(index)">
                  <img
                    class="w-100 img-thumbnail float-left"
                    :src="item.image"
                    :class="{ active: index == photoActive }"
                  />
                </main>
              </div>
            </div>
            <!-- product detail mobile -->
            <div class="d-md-none d-block">
              <div class="card card-details-mobile">
                <section class="store-heading">
                  <h5 class="mb-4">🏷️ Details Product</h5>
                  <div class="product-header mb-2">
                    {{ product.title }}
                  </div>
                  <div class="price" v-if="!product.discount <= 0">
                    <s
                      class="product-price-coret"
                      style="text-decoration-color: red"
                    >
                      Rp. {{ moneyFormat(product.price) }}
                    </s>
                    <br />
                    <span class="badge badge-custom mr-3">
                      💰 DISKON {{ product.discount }} %
                    </span>

                    <div class="mt-3 mr-4 price">
                      Rp. {{ moneyFormat(calculateDiscount(product)) }}
                    </div>
                  </div>
                  <div class="price" v-else>
                    <div class="mt-3 mr-4 price">
                      Rp. {{ moneyFormat(product.price) }}
                    </div>
                  </div>
                  <table class="table table-detail table-borderless mt-3">
                    <tbody>
                      <tr>
                        <td>Berat</td>
                        <td>:</td>
                        <td>
                          <span
                            class="badge badge-pill badge-berat"
                            style="
                              font-size: 14px;
                              border-radius: 0.3rem;
                              padding: 0.25em 0.5em 0.2em;
                            "
                          >
                            {{ product.weight }} gram</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>Stock Barang</td>
                        <td>:</td>
                        <td>
                          <span
                            class="badge badge-pill badge-stock"
                            style="
                              font-size: 14px;
                              border-radius: 0.3rem;
                              padding: 0.25em 0.5em 0.2em;
                            "
                          >
                            {{ product.stock }} stock</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="product.stock == 0">
                    <button
                      class="btn btn-danger btn-block"
                      data-toggle="modal"
                      data-target="#kosong"
                    >
                      Stock Kosong
                    </button>
                  </div>
                  <div v-if="product.stock > 0">
                    <button
                      class="btn btn-checkout btn-block"
                      @click.prevent="
                        addToCart(
                          product.id,
                          calculateDiscount(product),
                          product.weight
                        )
                      "
                    >
                      Add to Cart
                    </button>
                  </div>
                </section>
              </div>
            </div>
            <!-- description -->
            <section class="description">
              <main class="content-store mt-5">
                <ul
                  class="nav nav-pills nav-tabs mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link active detail"
                      id="pills-detail-tab"
                      data-toggle="pill"
                      href="#pills-detail"
                      role="tab"
                      aria-controls="pills-detail"
                      aria-selected="true"
                      >Detail</a
                    >
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link detail"
                      id="pills-size-tab"
                      data-toggle="pill"
                      href="#pills-size"
                      role="tab"
                      aria-controls="pills-size"
                      aria-selected="false"
                    >
                      <star-rating
                        :show-rating="true"
                        :star-size="23"
                        :read-only="true"
                        :increment="0.01"
                        :rating="reviewsAvg"
                      ></star-rating>
                      <span
                        >( <b>{{ countReviews }}</b> ulasan)</span
                      >
                    </a>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-detail"
                    role="tabpanel"
                    aria-labelledby="pills-detail-tab"
                  >
                    <div class="content-detail" v-html="product.content"></div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-size"
                    role="tabpanel"
                    aria-labelledby="pills-size-tab"
                    v-if="reviews !== null"
                  >
                    <div class="ulasan mt-5">
                      <ul class="list-unstyled">
                        <div
                          class="card-review mb-4"
                          v-for="data in reviews"
                          :key="data.id"
                        >
                          <li class="media">
                            <img
                              :src="`https://ui-avatars.com/api/?name=${data.customer.name}&background=1f1235&color=ffffff`"
                              class="mr-3 rounded-circle"
                              width="50"
                              alt="profile"
                            />
                            <div class="media-body">
                              <star-rating
                                :show-rating="false"
                                :star-size="21"
                                :read-only="true"
                                :increment="0.01"
                                :rating="data.rating"
                              ></star-rating>
                              <h5>
                                {{ data.customer.name }}
                              </h5>
                              <p>{{ data.review }}</p>
                            </div>
                          </li>
                        </div>
                        <!-- jika tidak ada ulasan -->
                        <div class="mt-5" v-if="reviews == 0">
                          <li class="media">
                            <div class="media-body">
                              <div class="alert alert-info text-center">
                                Belum ada ulasan
                              </div>
                            </div>
                          </li>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </main>
              <main class="content-store mt-5">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link active detail"
                      id="pills-size-tab"
                      data-toggle="pill"
                      href="#pills-size"
                      role="tab"
                      aria-controls="pills-size"
                      aria-selected="true"
                      v-if="
                        category.name == 'Sepatu Olahraga' ||
                        category.name == 'Sepatu Santai' ||
                        category.name == 'Sepatu Casual'
                      "
                      >Ukuran Sepatu</a
                    >
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-size"
                    role="tabpanel"
                    aria-labelledby="pills-size-tab"
                    v-if="
                      category.name == 'Sepatu Olahraga' ||
                      category.name == 'Sepatu Santai' ||
                      category.name == 'Sepatu Casual'
                    "
                  >
                    <div
                      class="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Hay {{ user.name }}!</strong> Kamu perlu
                      menghubungi penjual mengenai ketersdiaan ukuran
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <!-- table ukuran sepatu -->
                    <table class="w-75 table table-hover">
                      <thead>
                        <tr>
                          <th>US</th>
                          <th>UK</th>
                          <th>EUR</th>
                          <th>CM</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>5</td>
                          <td>2.5</td>
                          <td>35.5</td>
                          <td>22</td>
                        </tr>
                        <tr>
                          <td>5.5</td>
                          <td>3</td>
                          <td>36</td>
                          <td>22.5</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>3.5</td>
                          <td>36.5</td>
                          <td>23</td>
                        </tr>
                        <tr>
                          <td>6.5</td>
                          <td>4</td>
                          <td>37.5</td>
                          <td>23.5</td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>4.5</td>
                          <td>38</td>
                          <td>24</td>
                        </tr>
                        <tr>
                          <td>7.5</td>
                          <td>5</td>
                          <td>38.5</td>
                          <td>24.5</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>5.5</td>
                          <td>39</td>
                          <td>25</td>
                        </tr>
                        <tr>
                          <td>8.5</td>
                          <td>6</td>
                          <td>40</td>
                          <td>25.5</td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td>6.5</td>
                          <td>40.5</td>
                          <td>26</td>
                        </tr>
                        <tr>
                          <td>9.5</td>
                          <td>7</td>
                          <td>41</td>
                          <td>26.5</td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>7.5</td>
                          <td>42</td>
                          <td>27</td>
                        </tr>
                        <tr>
                          <td>10.5</td>
                          <td>8</td>
                          <td>42.5</td>
                          <td>27.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
              <main class="content-store mt-5">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link active detail"
                      id="pills-info-tab"
                      data-toggle="pill"
                      href="#pills-info"
                      role="tab"
                      aria-controls="pills-info"
                      aria-selected="true"
                      >Info Penting</a
                    >
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-info"
                    role="tabpanel"
                    aria-labelledby="pills-info-tab"
                  >
                    <h3 class="mb-4">Term of service</h3>
                    <div class="term-service mt-3">
                      <ul>
                        <p>
                          Berikut ini adalah catatan mengenai ketentuan
                          berbelanja di toko kami. Mohon dibaca dengan saksama
                          agar tidak terjadi kesalahpahaman dan demi menciptakan
                          pengalaman berbelanja yang menyenangkan.
                          <router-link class="readmore" :to="{ path: '/tos' }"
                            >Baca selengkapnya kebijakan toko</router-link
                          >
                        </p>
                        <h3 class="mt-4">Jam Operasional</h3>
                        <p>
                          <br />
                          Senin s/d Sabtu 07.00 - 17.00 WIB
                          <br />
                          Minggu & Tanggal Merah LIBUR.
                          <br />
                          Resi yang dicantumkan dapat terlacak dalam 1 x 24 jam
                        </p>
                      </ul>
                    </div>
                  </div>
                </div>
              </main>
            </section>
          </div>
        </div>
        <!-- product detail desktop -->
        <div class="col-md-5 d-none d-md-flex">
          <div class="card card-details">
            <section class="store-heading">
              <h5>🏷️ Details Product</h5>
              <div class="card-body">
                <div class="product-header mb-2">{{ product.title }}</div>
                <div class="price" v-if="!product.discount <= 0">
                  <s
                    class="product-price-coret"
                    style="text-decoration-color: red"
                  >
                    Rp. {{ moneyFormat(product.price) }}
                  </s>
                  <br />
                  <span class="badge badge-custom mr-3">
                    💰 DISKON {{ product.discount }} %
                  </span>

                  <div class="mt-3 mr-4 price">
                    Rp. {{ moneyFormat(calculateDiscount(product)) }}
                  </div>
                </div>
                <div class="price" v-else>
                  <div class="mt-3 mr-4 price">
                    Rp. {{ moneyFormat(product.price) }}
                  </div>
                </div>
                <table class="table table-detail table-borderless mt-3">
                  <tbody>
                    <tr>
                      <td>Berat</td>
                      <td>:</td>
                      <td>
                        <span
                          class="badge badge-pill badge-berat"
                          style="
                            font-size: 14px;
                            border-radius: 0.3rem;
                            padding: 0.25em 0.5em 0.2em;
                          "
                        >
                          {{ product.weight }} gram</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>Stock Barang</td>
                      <td>:</td>
                      <td>
                        <span
                          class="badge badge-pill badge-stock"
                          style="
                            font-size: 14px;
                            border-radius: 0.3rem;
                            padding: 0.25em 0.5em 0.2em;
                          "
                        >
                          {{ product.stock }} stock</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="product.stock == 0">
                  <button
                    class="btn btn-danger btn-block"
                    data-toggle="modal"
                    data-target="#kosong"
                  >
                    Stock Kosong
                  </button>
                </div>
                <div v-if="product.stock > 0">
                  <button
                    class="btn btn-checkout btn-block"
                    @click.prevent="
                      addToCart(
                        product.id,
                        calculateDiscount(product),
                        product.weight
                      )
                    "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Modal -->
  <div
    class="modal fade"
    id="kosong"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="kosongLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="kosongLabel">Stock Kosong</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">Maaf stock barang sedang ksosong</div>
      </div>
    </div>
  </div>
</template>


<script>
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      store.dispatch("product/getDetailProduct", route.params.slug);
    });

    const product = computed(() => {
      return store.getters["product/getDetailProduct"];
    });

    const category = computed(() => {
      return store.getters["product/getCategory"];
    });

    const gallery = computed(() => {
      return store.getters["product/getGallery"];
    });

    const user = computed(() => {
      return store.getters["auth/getUser"];
    });

    /* reviews customer */
    const reviews = computed(() => {
      return store.getters["product/getReviews"].reviews;
    });
    const countReviews = computed(() => {
      return store.getters["product/getReviews"].reviews_count;
    });
    const reviewsAvg = computed(() => {
      return store.getters["product/getReviews"].reviews_avg_rating;
    });

    // function addToCart
    const addToCart = (product_id, price, weight) => {
      // check token terlebih dahulu
      const token = store.state.auth.token;

      if (!token) {
        router.push({ name: "login" });
      }
      // panggil action addToCart di module cart
      store.dispatch("cart/addToCart", {
        product_id: product_id,
        price: price,
        weight: weight,
        quantity: 1,
      });
    };

    return {
      store,
      route,
      product,
      gallery,
      user,
      addToCart,
      category,
      reviews,
      countReviews,
      reviewsAvg,
    };
  },
  data: () => ({
    photoActive: 0,
  }),
  methods: {
    changeActive(id) {
      this.photoActive = id;
    },
  },
};
</script>
