<template>
  <main id="home">
    <Carousel />
    <section class="header-title" data-aos="fade-up">
      <div class="row">
        <div class="col-md-12 col-12">
          <span class="text-product-header">Belanja Makin Mudah</span>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <router-link class="show-all" to="/category-all"
            >Tampilkan kategori lainnya</router-link
          >
        </div>
      </div>
    </section>
    <section class="store-trend-categories" v-if="categories.length > 0">
      <div class="row">
        <div
          class="col-6 col-md-3 col-lg-2"
          data-aos="fade-up"
          v-for="(category, index) in categories"
          :key="index"
        >
          <router-link
            :to="{ name: 'category_show', params: { slug: category.slug } }"
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
    <div v-else>
      <div class="row">
        <div class="col-6 col-md-3 col-lg-2">
          <instagram-loader />
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <instagram-loader />
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <instagram-loader />
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <instagram-loader />
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <instagram-loader />
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <instagram-loader />
        </div>
      </div>
    </div>
    <!-- product terlaris -->
    <section class="header-title mt-4 mb-3" data-aos="fade-up">
      <div class="row">
        <div class="col-md-6 col-12">
          <span class="text-product-header">Product Terlaris</span>
        </div>
      </div>
    </section>
    <div class="row" v-if="terlaris.length > 0">
      <div
        class="col-md-4 col-lg-3 col-product"
        v-for="(product, index) in terlaris"
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
            <span>{{ product.reviews.length }} (ulasan)</span>
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
            <span>{{ product.reviews.length }} (ulasan)</span>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-3">
          <instagram-loader />
        </div>
        <div class="col-md-3">
          <instagram-loader />
        </div>
        <div class="col-md-3">
          <instagram-loader />
        </div>
        <div class="col-md-3">
          <instagram-loader />
        </div>
      </div>
    </div>
    <!-- product random -->
    <section class="header-title mt-4" data-aos="fade-up">
      <div class="row">
        <div class="col-12">
          <span class="text-product-header">Belanja kebutuhanmu</span>
          <p class="h5 mt-2">🎉Banyak promo menarik🎉</p>
          <router-link class="show-all text-right" to="/product-all"
            >Tampilkan semua product</router-link
          >
        </div>
      </div>
    </section>
    <div class="row mt-5" v-if="products.length > 0">
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
          <div>
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
          <div>
            <div
              class="rating justify-content-center d-flex"
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
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-3">
          <instagram-loader />
        </div>
        <div class="col-md-3">
          <instagram-loader />
        </div>
        <div class="col-md-3">
          <instagram-loader />
        </div>
        <div class="col-md-3">
          <instagram-loader />
        </div>
      </div>
    </div>
    <hr />
    <div class="row midtrans">
      <div class="col-md-6">
        <div class="text-header" data-aos="fade-up" data-aos-delay="300">
          Menerima variasi <br />
          metode pembayaran
        </div>
        <div class="content" data-aos="fade-up" data-aos-delay="300">
          Dengan Midtrans, Anda dapat menerima pembayaran dari 24 metode: kartu
          kredit/debit, transfer bank, e-Money, dan masih banyak lagi. <br />
          <br />
          Anda dapat mengaktifkan beberapa metode pembayaran saja, atau semuanya
          - pilih sesuai kebutuhan Anda.
          <ul data-aos="fade-up" data-aos-delay="300">
            <li>
              <img src="/images/check-icon.svg" class="mr-2" />Kartu
              kredit/Debit
            </li>
            <li>
              <img src="/images/check-icon.svg" class="mr-2" />Kartu Virtual
              account
            </li>
            <li>
              <img src="/images/check-icon.svg" class="mr-2" />Kartu Virtual
              e-Money
            </li>
            <li>
              <img src="/images/check-icon.svg" class="mr-2" />Kartu Virtual
              Over the Counter
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6" data-aos="fade-up" data-aos-delay="700">
        <img src="/images/midtrans_banner.png" alt="midtrans" class="w-100" />
      </div>
    </div>
    <div class="row keamanan midtrans justify-content-between">
      <div class="col-md-6">
        <div class="row text-center justify-content-center">
          <div class="col-md-6 mb-5 col-info" data-aos="fade-up">
            <div class="img-info">
              <img src="/images/bi.png" alt="" />
            </div>
            <div class="title">Bank Indonesia</div>
            <div class="subtitle">Memiliki Izin dari Bank Indonesia</div>
          </div>
          <div class="col-md-6 col-info" data-aos="fade-up">
            <div class="img-info">
              <img src="/images/kominfo.png" alt="" />
            </div>
            <div class="title">
              Kementrian Komunikasi dan Informatika Republik Indonesia (Kominfo)
            </div>
            <div class="subtitle">
              Terdaftar sebagai Penyelenggara Sistem Elektronik
            </div>
          </div>
          <div class="col-md-6 mt-5 col-info" data-aos="fade-up">
            <div class="img-info">
              <img src="/images/aes.png" alt="" />
            </div>
            <div class="title">AES 256</div>
            <div class="subtitle">Standar Enkripsi Lanjutan</div>
          </div>
          <div class="col-md-6 mt-5 col-info" data-aos="fade-up">
            <div class="img-info">
              <img src="/images/pci.png" alt="" />
            </div>
            <div class="title">PCI DSS</div>
            <div class="subtitle">
              Industri Kartu Pembayaran Standar Keamanan Data
            </div>
          </div>
          <div class="col-md-6 mt-5 mb-5 col-info" data-aos="fade-up">
            <div class="img-info">
              <img src="/images/iso.png" alt="" />
            </div>
            <div class="title">ISO 27001</div>
            <div class="subtitle">
              ISO / IEC 27001 adalah Sebuah Informasi Standar Keamanan
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="text-header" data-aos="fade-up">
          Midtrans <br />
          Aman dari segala sisi
        </div>
        <div class="content" data-aos="fade-up" data-aos-delay="300">
          Sistem deteksi anomali kami menggabungkan AI, machine learning, dan
          rumus kompleks untuk melindungi transaksi Anda. Hemat waktu dan biaya
          agar Anda dapat fokus mengembangkan bisnis.
          <ul data-aos="fade-up" data-aos-delay="300">
            <li>
              <img src="/images/check-icon.svg" class="mr-2" />Kartu Lisensi
              dari Bank Indonesia
            </li>
            <li>
              <img src="/images/check-icon.svg" class="mr-2" />
              ISO 27001
            </li>
            <li><img src="/images/check-icon.svg" class="mr-2" />PCI DSS</li>
            <li><img src="/images/check-icon.svg" class="mr-2" />AES 256</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row midtrans justify-content-center mt-5">
      <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="300">
        <div class="text-header">Exspedisi Suport <br /></div>
        <div class="content" data-aos="fade-up" data-aos-delay="300">
          Sistem mendukung beberapa jenis exspedisi pengiriman barang, <br />
          kedepannya akan di suport bebrbagai jenis exspedisi pengiriman
        </div>
      </div>
      <div
        class="col-md-6 justify-content-center mt-5"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <img src="/images/exspedisi.png" alt="midtrans" class="w-100" />
      </div>
    </div>
  </main>
</template>
<script>
import { computed, defineAsyncComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { InstagramLoader } from "vue-content-loader";
import StarRating from "vue-star-rating";

// import component with lazy load
const Carousel = defineAsyncComponent(() =>
  import("../../components/Carousel.vue")
);
export default {
  components: {
    Carousel: Carousel,
    InstagramLoader,
    StarRating,
  },
  setup() {
    const store = useStore();

    // pertama kali dijalnkan render onMounted  dengan data actions di module  vuex
    onMounted(() => {
      store.dispatch("category/getCategoriesHome");
    });
    onMounted(() => {
      store.dispatch("product/getProductsHome");
    });
    onMounted(() => {
      store.dispatch("product/getProductsTerlaris");
    });

    // get data  dari module  di vuex
    const products = computed(() => {
      return store.getters["product/getProductsHome"];
    });
    const terlaris = computed(() => {
      return store.getters["product/getProductsTerlaris"];
    });
    const gallery = computed(() => {
      return store.getters["product/getGallery"];
    });
    const categories = computed(() => {
      return store.getters["category/getCategoriesHome"];
    });

    return {
      store,
      categories,
      products,
      gallery,
      terlaris,
    };
  },
};
</script>
