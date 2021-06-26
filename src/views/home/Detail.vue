<template>
  <div id="product">
    <section class="mt-global store-breadcrumbs">
      <div class="row">
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
    <section class="store-gallery">
      <div class="row justify-content-between">
        <div class="col-lg-8">
          <transition
            v-if="state.photoActive == 0"
            name="slide-fade"
            mode="out-in"
          >
            <img :src="product.image" class="img-store w-100" />
          </transition>

          <transition v-if="state.headerActive" name="slide-fade" mode="out-in">
            <img :src="product.image" class="img-store w-100" />
          </transition>

          <transition name="slide-fade" mode="out-in">
            <img
              :src="state.photoActive"
              :key="state.photoActive"
              class="img-store w-100"
            />
          </transition>
        </div>
        <div class="col-lg-3">
          <div class="row justify-content-center">
            <div
              class="col-5 col-md-3 col-lg-12"
              v-for="(item, index) of gallery"
              :key="index"
            >
              <main @click="changeActive(item.image)">
                <img
                  class="w-100 img-thumbnail"
                  :src="item.image"
                  :class="{ active: index == photoActive }"
                />
              </main>
            </div>
            <div class="col-5 col-md-3 col-lg-12">
              <main @click="headerActive(product.image)">
                <img
                  :src="product.image"
                  alt=""
                  class="w-100 img-thumbnail"
                  :class="{ active: product.image == headerActive }"
                />
              </main>
            </div>
          </div>
        </div>
      </div>
      <section class="store-heading">
        <div class="row row-d">
          <div class="col-lg-6">
            <div class="product-header mb-2">{{ product.title }}</div>
            <s class="product-price-coret" style="text-decoration-color: red">
              Rp. {{ moneyFormat(product.price) }}
            </s>
            <br />
            <span class="badge badge-success mr-3">
              DISKON {{ product.discount }} %
            </span>

            <div class="font-weight-bold mt-3 mr-4 price">
              Rp. {{ moneyFormat(calculateDiscount(product)) }}
            </div>
          </div>
          <div class="col-lg-3" v-if="product.stock == 0">
            <button
              class="btn btn-danger"
              data-toggle="modal"
              data-target="#kosong"
            >
              Stock Kosong
            </button>
          </div>
          <div class="col-lg-3" v-if="product.stock > 0">
            <button
              class="btn btn-success"
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
      <section class="description">
        <div class="row">
          <div class="col-12 col-lg-8">
            <main class="content-store mt-5">
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link active detail"
                    id="pills-detail-tab"
                    data-toggle="pill"
                    href="#pills-detail"
                    role="tab"
                    aria-controls="pills-detail"
                    aria-selected="true"
                    >Detail Product</a
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
                    >Size Product</a
                  >
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-detail"
                  role="tabpanel"
                  aria-labelledby="pills-detail-tab"
                >
                  <table class="table table-detail table-borderless mt-3">
                    <tbody>
                      <tr>
                        <td width="20%">Diskon</td>
                        <td>:</td>
                        <td width="80%">
                          <button
                            class="btn btn-sm"
                            style="color: #ff2f00; border-color: #ff2f00"
                          >
                            DISKON {{ product.discount }} %
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Berat</td>
                        <td>:</td>
                        <td>
                          <span
                            class="badge badge-pill badge-success"
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
                            class="badge badge-pill badge-warning"
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
                  <h3 class="mt-5 mb-3">Deskripsi Product</h3>
                  <div v-html="product.content"></div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-size"
                  role="tabpanel"
                  aria-labelledby="pills-size-tab"
                >
                  <div
                    class="alert alert-warning alert-dismissible fade show"
                    role="alert"
                  >
                    <strong>Hay {{ user.name }}!</strong> Kamu perlu menghubungi
                    penjual mengenai ketersdiaan ukuran
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
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
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-8">
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
                        Selamat datang di Bayer Official Partner. Berikut ini
                        adalah catatan mengenai ketentuan berbelanja di toko
                        kami. Mohon dibaca dengan saksama agar tidak terjadi
                        kesalahpahaman dan demi menciptakan pengalaman
                        berbelanja yang menyenangkan.
                        <router-link class="readmore" :to="{ path: '/terms' }"
                          >Baca selengkapnya kebijakan toko</router-link
                        >
                      </p>
                      <h3 class="mt-4">Jam Operasional</h3>
                      <p>
                        <br />
                        Senin s/d Sabtu 09.00 – 22.00 WIB
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
          </div>
        </div>
      </section>
    </section>
  </div>

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
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      photoActive: [],
      headerActive: "",
    });
    onMounted(() => {
      store.dispatch("product/getDetailProduct", route.params.slug);
    });

    const product = computed(() => {
      return store.state.product.productDetail;
    });

    const gallery = computed(() => {
      return store.getters["product/getGallery"];
    });

    const user = computed(() => {
      return store.getters["auth/getUser"];
    });

    const changeActive = (id) => {
      state.headerActive = null;
      state.photoActive = id;
    };

    const headerActive = (id) => {
      state.photoActive = null;
      state.headerActive = id;
    };

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
      state,
      gallery,
      changeActive,
      headerActive,
      user,
      addToCart,
    };
  },
};
</script>
