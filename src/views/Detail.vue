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
          <transition name="slide-fade" mode="out-in">
            <img
              :src="photos[photoActive].url"
              :key="photos[photoActive].url"
              class="img-store w-100"
            />
          </transition>
        </div>
        <div class="col-lg-3">
          <div class="row justify-content-center">
            <div
              class="col-5 col-md-3 col-lg-12"
              v-for="(photo, index) in photos"
              :key="index"
            >
              <main @click="changeActive(index)">
                <img
                  class="w-100 img-thumbnail"
                  :src="photo.url"
                  :class="{ active: index == photoActive }"
                />
              </main>
            </div>
          </div>
        </div>
      </div>
      <section class="store-heading">
        <div class="row row-d">
          <div class="col-lg-6">
            <div class="product-header">Nike Jordan</div>
            <div class="subtitle">Tenang gak sampe jual ginjal</div>
            <div class="price">$897</div>
          </div>
          <div class="col-lg-3">
            <router-link
              :to="{ path: '/cart' }"
              class="btn btn-success"
              title="add to cart"
            >
              Add to Cart
            </router-link>
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
                  <span class="text-descripsi" v-if="!readMoreActivited">
                    {{ longText.slice(0, 200) }}
                  </span>

                  <span
                    v-if="readMoreActivited"
                    v-html="longText"
                    class="text-descripsi"
                  ></span>
                  <span
                    class="readmore"
                    v-if="!readMoreActivited"
                    @click="readmoreActive"
                  >
                    Lihat selengkapnya
                  </span>

                  <a class="readmore" v-else @click="shortText"
                    >Lihat Lebih Sedikit</a
                  >
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
                    <strong>Hay Wawan!</strong> Kamu perlu menghubung penjual
                    mengenai ketersdiaan ukuran
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
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link detail"
                    id="pills-diskusi-tab"
                    data-toggle="pill"
                    href="#pills-diskusi"
                    role="tab"
                    aria-controls="pills-diskusi"
                    aria-selected="false"
                    >Diskusi</a
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link detail"
                    id="pills-ulasan-tab"
                    data-toggle="pill"
                    href="#pills-ulasan"
                    role="tab"
                    aria-controls="pills-ulasan"
                    aria-selected="false"
                    >Ulasan</a
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
                <div
                  class="tab-pane fade"
                  id="pills-diskusi"
                  role="tabpanel"
                  aria-labelledby="pills-diskusi-tab"
                >
                  <div class="media mb-5">
                    <img
                      src="https://ui-avatars.com/api/?name=wawan"
                      class="rounded-circle mr-3"
                    />
                    <div class="media-body">
                      <h5 class="mt-0">Wawan Setiawan</h5>
                      <p>
                        Standing on the frontline when the bombs start to fall.
                        Heaven is jealous of our love, angels are crying from up
                        above. Can't
                      </p>
                      <div class="media mt-5">
                        <a class="mr-3" href="#">
                          <img
                            src="https://ui-avatars.com/api/?name=neutron"
                            class="rounded-circle"
                          />
                        </a>
                        <div class="media-body">
                          <h5 class="mt-0">Neutron</h5>
                          <p>
                            Greetings loved ones let's take a journey. Yes, we
                            make angels cry, raining down on earth from up
                            above. Give you something good to celebrate. I used
                            to bite my tongue and
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="media">
                    <img
                      src="https://ui-avatars.com/api/?name=fajrin"
                      class="rounded-circle mr-3"
                    />
                    <div class="media-body">
                      <h5 class="mt-0">Fajrin</h5>
                      <p>Standinare crying from up above. Can't</p>
                      <div class="media mt-5">
                        <a class="mr-3" href="#">
                          <img
                            src="https://ui-avatars.com/api/?name=mraz"
                            class="rounded-circle"
                          />
                        </a>
                        <div class="media-body">
                          <h5 class="mt-0">mraz</h5>
                          <p>
                            Greetings loved ones let's take a journey. Yes, we
                            make angels cry, raining dused to bite my tongue and
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-ulasan"
                  role="tabpanel"
                  aria-labelledby="pills-ulasan-tab"
                >
                  <h3>Ulasan (250)</h3>
                  <span>Sepatu Nike-Jordan</span>
                  <h1>48.5 / <span>5</span></h1>
                  <p>(250) ulasan</p>
                  <br />
                  <h2>Coming soon</h2>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </section>
    <section class="page-content header-title" data-aos="fade-up">
      <div class="row">
        <span class="text-product-header">Lainnya di toko ini</span>
      </div>
    </section>
    <Products></Products>
  </div>
</template>

<script>
import Products from "../components/Products";
export default {
  name: "detail",
  data: () => ({
    rating: 3,
    photoActive: 0,
    photos: [
      {
        id: 1,
        url: "/images/pic_detail1.jpg",
      },
      {
        id: 2,
        url: "/images/pic_detail2.png",
      },
      {
        id: 3,
        url: "/images/pic_detail3.jpg",
      },
    ],
    readMoreActivited: false,
    longText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolorum provident porro deserunt illo numquam distinctio odit. A aut distinctio quasi error minima et? Nulla blanditiis minus inventore illo praesentium? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel sapiente nostrum consectetur? Facere maiores dicta nihil velit! Voluptatem quos ducimus, nisi dicta molestias, atque vel ea, consequuntur laboriosam minima  ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolorum provident porro deserunt illo numquam distinctio odit. A aut distinctio quasi error minima et? Nulla blanditiis minus inventore illo praesentium? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel sapiente nostrum consectetur? Facere maiores dicta nihil velit! Voluptatem quos ducimus, nisi dicta molestias,r sit amet consectetur adipisicing elit. Asperiores dolorum provident porro deserunt illo numquam distinctio odit. A aut distinctio quasi error minima et? Nulla blanditiis minus inventore illo praesentium? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel sapiente nostrum consectetur? Facere maiores dicta nihil velit! Voluptatem quos ducimus, nisi dicta molestias, atque vel ea, consequuntur laboriosam minima  ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolorum provident porro deserunt illo numquam distinctio odit. A aut distinctio quasi error minima et? Nulla blanditiis minus inventore illo praesentium? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel sapiente nostrum consectetur? Facere maiores dicta nihil velit! Voluptatem quos ducimus, nisi dicta molest atque vel ea, consequuntur laboriosam minim facere.`,
  }),
  components: {
    Products,
  },

  methods: {
    changeActive(id) {
      this.photoActive = id;
    },
    readmoreActive() {
      this.readMoreActivited = true;
    },
    shortText() {
      this.readMoreActivited = false;
    },
  },
};
</script>
