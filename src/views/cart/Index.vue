<template>
  <section class="details-header"></section>
  <div id="cart">
    <section class="mt-global store-breadcrumbs">
      <div class="row">
        <div class="col-12">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item active">Cart</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
    <section class="store-cart card card-body shadow">
      <div class="text-product-header">🛍️ Order Details</div>
      <div class="row">
        <div class="col-12 table-responsive">
          <table class="table table-borderless table-cart">
            <thead>
              <tr>
                <th width="20%">Image</th>
                <th>Name Product</th>
                <th>Quantity</th>
                <th>Weight</th>
                <th>Price</th>
                <th>Menu</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in carts" :key="index">
                <td class="align-middle mb-5">
                  <div class="card-img">
                    <router-link
                      :to="{
                        name: 'detail',
                        params: { slug: cart.product.slug },
                      }"
                    >
                      <div class="cart-image">
                        <img :src="cart.product.gallery[0].image" />
                      </div>
                    </router-link>
                  </div>
                </td>
                <td class="align-middle">
                  <div class="product-name">{{ cart.product.title }}</div>
                </td>

                <td class="align-middle">
                  <div class="product-quantity">{{ cart.quantity }} (pcs)</div>
                </td>
                <td class="align-middle">
                  <div class="product-quantity">
                    {{ cart.product.weight }}(gram)
                  </div>
                </td>
                <td class="align-middle" v-if="!cart.product.discount <= 0">
                  <div class="product-price">
                    Rp.
                    {{ moneyFormat(calculateDiscount(cart.product)) }}
                  </div>
                  <div class="product-price-coret">
                    Rp. {{ moneyFormat(cart.product.price) }}
                  </div>
                </td>
                <td class="align-middle" v-else>
                  <div class="product-price">
                    Rp. {{ moneyFormat(cart.product.price) }}
                  </div>
                </td>
                <td class="align-middle">
                  <button
                    @click.prevent="removeCart(cart.id)"
                    class="btn btn btn-remove-cart"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!-- shipping details -->
    <section
      class="shipping-details card card-body shadow mt-4"
      data-aos="fade-in"
    >
      <div class="row">
        <!-- payment informations desktop -->
        <div
          class="col-lg-6 payment-informations store-cart mb-4 d-none d-lg-flex"
        >
          <div class="header-information">
            <div class="text-product-header">💰 Payment informations</div>
            <div class="alert alert-warning mt-4" v-if="state.buttonCheckout">
              Sebelum melakukan chackout pastikan alamat pengiriman diisi dengan
              lengkap
            </div>
            <div
              class="row payment-informations mt-5"
              data-aos="fade-in"
              data-aos-delay="100"
            >
              <div class="col-6 col-lg-3 mb-3">
                <div class="number">{{ countCart }} (pcs)</div>
                <div class="sub-title">Jumlah Pemesanan</div>
              </div>
              <div class="col-6 col-lg-4">
                <div class="number">
                  Rp. {{ moneyFormat(state.cost_courier) }}
                </div>
                <div class="gram">({{ cartWeight }} gram)</div>
                <div class="sub-title">Ongkos Kirim</div>
              </div>
              <div class="col-12 col-lg-5" v-if="state.grandTotal == 0">
                <div class="number">Rp. {{ moneyFormat(totalCart) }}</div>
                <div class="sub-title">Total</div>
              </div>
              <div class="col-12 col-lg-5" v-else>
                <div class="number">
                  Rp. {{ moneyFormat(state.grandTotal) }}
                </div>
                <div class="sub-title">Subtotal</div>
              </div>
              <!-- catatn pembelian desktop-->
              <div class="col-12 mt-3" v-if="state.note">
                <div class="form-group">
                  <label for="address">Catatan pembelian</label>
                  <textarea
                    @click="show_button()"
                    v-model="state.note_pembelian"
                    name="address"
                    class="form-control mb-4"
                    id="address"
                    rows="5"
                    placeholder="Note: Sepatu warna cream uk 42"
                  ></textarea>
                  <div
                    v-if="validation.note_pembelian"
                    class="alert alert-danger"
                  >
                    <i style="font-weight: 300; font-size: 16px"
                      >Masukan catatan, untuk mengurangi kesalahan dalam
                      pengiriman</i
                    >
                  </div>
                </div>
              </div>
              <!-- button chackout -->
              <div
                class="col-12 col-lg-12 mt-4 mb-4"
                v-if="state.buttonCheckout || checkout.length > 0"
              >
                <button
                  @click.prevent="checkout"
                  class="btn btn-lg btn-block btn-success"
                >
                  Checkout Now
                </button>
              </div>
              <!-- checkout loading process-->
              <div class="col-12 col-lg-12 mt-4 mb-4" v-else>
                <div v-if="state.buttonLoading">
                  <button class="btn btn-lg btn-block btn-success">
                    <i class="fa fa-spinner fa-spin"></i>
                    <i class="ml-3">Loading...</i>
                  </button>
                </div>
              </div>
              <!-- disabled -->
              <!-- <div
                class="col-12 col-lg-12 mt-4 mb-4"
                v-if="state.disabled_checkout"
              >
                <button
                  @click.prevent="checkout"
                  class="btn btn-lg disabled btn-block btn-success"
                >
                  Checkout Now
                </button>
              </div> -->
            </div>
          </div>
        </div>
        <!-- shipping details -->
        <div class="col-lg-6 store-cart">
          <div class="text-product-header">📝 Shipping Details</div>
          <div class="row mt-5">
            <div class="col-md-6">
              <div class="form-grop">
                <label for="fullName">Full Name</label>
                <input
                  type="text"
                  class="form-control mb-4"
                  placeholder="your full name"
                  id="fullName"
                  v-model="state.name"
                />
                <div class="alert alert-danger" v-if="validation.name">
                  Masukan nama lengkap anda
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="mobile">Mobile/Whatsapp</label>
                <input
                  type="text"
                  class="form-control mb-4"
                  placeholder="0877584586"
                  id="mobile"
                  v-model="state.phone"
                />
                <div class="alert alert-danger" v-if="validation.phone">
                  Masukan no hp/whatsapp anda
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label for="provinces">Provinces</label>
                <select
                  name="provinces"
                  class="form-control mb-4"
                  id="provinces"
                  v-model="state.province_id"
                  @change="getCities"
                >
                  <option value="">-- pilih provinsi --</option>
                  <option
                    v-for="(item, index) in state.provinces"
                    :key="index"
                    :value="item.province_id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label for="city">City / Districts</label>
                <select
                  name="city"
                  class="form-control"
                  id="city"
                  v-model="state.city_id"
                  @change="getCourier"
                >
                  <option value="">-- pilih kota/kabupaten --</option>
                  <option
                    v-for="(item, index) in state.cities"
                    :value="item.city_id"
                    :key="index"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <!-- courier type -->
            <div class="col-lg-12" v-if="state.courier_deliv">
              <div class="text-courier mb-2">Courier Delivery</div>
              <div class="form-check form-check-inline mr-5">
                <input
                  class="form-check-input mr-2"
                  type="radio"
                  name="jne"
                  id="jne"
                  value="jne"
                  v-model="state.courier"
                  @change="getOngkir"
                />
                <label class="form-check-label" for="jne">JNE</label>
              </div>
              <div class="form-check form-check-inline mr-5">
                <input
                  class="form-check-input mr-2"
                  type="radio"
                  name="tiki"
                  id="tiki"
                  value="tiki"
                  v-model="state.courier"
                  @change="getOngkir"
                />
                <label class="form-check-label" for="tiki">TIKI</label>
              </div>
              <div class="form-check form-check-inline mr-5">
                <input
                  class="form-check-input mr-2"
                  type="radio"
                  name="pos"
                  id="pos"
                  value="pos"
                  v-model="state.courier"
                  @change="getOngkir"
                />
                <label class="form-check-label" for="pos">POS</label>
              </div>
            </div>
            <!-- service kurir serta ongkos kirim -->
            <div class="col-lg-12 mt-3" v-if="state.service">
              <div class="text-courier mb-2">Service Kurir</div>
              <div
                class="form-check form-check-inline mr-5"
                v-for="(item, index) in state.dataService"
                :key="index"
              >
                <input
                  class="form-check-input mr-2 mb-3"
                  type="radio"
                  :id="item.service"
                  :value="item.cost[0].value + '|' + item.service"
                  v-model="state.costService"
                  @change="getCostService"
                />
                <label class="form-check-label mb-3" :for="item.service">
                  {{ item.service }} - Rp.
                  {{ moneyFormat(item.cost[0].value) }} ({{
                    state.courier !== "pos"
                      ? item.cost[0].etd + " Hari Pengiriman"
                      : item.cost[0].etd + " Pengiriman"
                  }})
                </label>
              </div>
              <!-- jika tidak ada pengiriman kekota tujuan -->
              <div class="alert alert-danger" v-if="state.dataService == 0">
                <span
                  >Pengiriman {{ state.courier.toUpperCase() }} tidak ada</span
                >
                <!-- kembalikan data sebelum dihitung oleh ongkir dan subtotal -->
                <div class="d-none">
                  {{ (state.cost_courier = 0) }}
                  {{ (state.grandTotal = 0) }}
                </div>
              </div>
            </div>
            <!-- full address -->
            <div class="col-12 mt-3">
              <div class="form-group" v-if="state.full_address">
                <label for="address">Full Address</label>
                <textarea
                  @click="show_note()"
                  name="address"
                  class="form-control mb-4"
                  id="address"
                  rows="5"
                  v-model="state.address"
                  placeholder="Alamat Lengkap&#10;&#10;Contoh: kp. Pete Ds. Pete - kecamatan Tigaraksa Kab. Tangerang"
                ></textarea>
                <div v-if="validation.address" class="alert alert-danger">
                  Masukan alamat lengkap anda
                </div>
              </div>
            </div>
            <!-- catatn pembelian -->
          </div>
        </div>
        <!-- payment informations mobile -->
        <div
          class="
            col-lg-6
            payment-informations
            store-cart
            mb-4
            d-lg-none d-block
          "
        >
          <div class="header-information">
            <div class="text-product-header">💰 Payment informations</div>
            <div class="alert alert-warning mt-4" v-if="state.buttonCheckout">
              Sebelum melakukan chackout pastikan alamat pengiriman diisi dengan
              lengkap
            </div>
            <div class="row payment-informations mt-5" data-aos="fade-in">
              <div class="col-6 col-lg-3 mb-3">
                <div class="number">{{ countCart }} (pcs)</div>
                <div class="sub-title">Jumlah Pemesanan</div>
              </div>
              <div class="col-6 col-lg-4">
                <div class="number">
                  Rp. {{ moneyFormat(state.cost_courier) }}
                </div>
                <div class="gram">({{ cartWeight }} gram)</div>
                <div class="sub-title">Ongkos Kirim</div>
              </div>
              <div class="col-12 col-lg-5" v-if="state.grandTotal == 0">
                <div class="number">Rp. {{ moneyFormat(totalCart) }}</div>
                <div class="sub-title">Total</div>
              </div>
              <div class="col-12 col-lg-5" v-else>
                <div class="number">
                  Rp. {{ moneyFormat(state.grandTotal) }}
                </div>
                <div class="sub-title">Subtotal</div>
              </div>
              <!-- catatn pembelian mobile -->
              <div class="col-12 mt-3" v-if="state.note">
                <div class="form-group">
                  <label for="address">Catatan pembelian</label>
                  <textarea
                    @click="show_button()"
                    v-model="state.note_pembelian"
                    name="address"
                    class="form-control mb-4"
                    id="address"
                    rows="5"
                    placeholder="Note: Sepatu warna cream uk 42"
                  ></textarea>
                  <div
                    v-if="validation.note_pembelian"
                    class="alert alert-danger"
                  >
                    <i style="font-weight: 300; font-size: 16px"
                      >Masukan catatan, untuk mengurangi kesalahan dalam
                      pengiriman</i
                    >
                  </div>
                </div>
              </div>
              <!-- button chackout -->
              <div
                class="col-12 col-lg-12 mt-4 mb-4"
                v-if="state.buttonCheckout || checkout.length > 0"
              >
                <button
                  @click.prevent="checkout"
                  class="btn btn-lg btn-block btn-success"
                >
                  Checkout Now
                </button>
              </div>
              <!-- checkout loading process-->
              <div class="col-12 col-lg-12 mt-4 mb-4" v-else>
                <div v-if="state.buttonLoading">
                  <button class="btn btn-lg btn-block btn-success">
                    <i class="fa fa-spinner fa-spin"></i>
                    <i class="ml-3">Loading...</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import Api from "../../api/Api";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const carts = computed(() => {
      return store.getters["cart/getCart"];
    });
    console.log(store.getters["cart/getCart"]);

    const countCart = computed(() => {
      return store.getters["cart/countCart"];
    });

    // jalankan fungsi untuk mendapatkan total berat
    onMounted(() => {
      store.dispatch("cart/cartWeight");
    });
    const cartWeight = computed(() => {
      return store.getters["cart/cartWeight"];
    });

    const totalCart = computed(() => {
      return store.getters["cart/totalCart"];
    });

    /* function hapus data cart */
    const removeCart = (cart_id) => {
      if (confirm("Do you want to delete ?")) {
        store.dispatch("cart/removeCart", cart_id);
        // set semua jadi nol dan hitung ulang
        state.province_id = "";
        state.city_id = "";
        state.courier = "";
        state.costService = "";
        state.cost_courier = "";
        state.service_courier = "";
        state.grandTotal = 0;
        state.courier_deliv = false;
        state.disabled_checkout = false;
        state.buttonCheckout = false;
        state.buttonLoading = false;
        state.service = false;
      }
    };

    /* 
    pengiriman
     */

    // define state form
    const state = reactive({
      name: "",
      phone: "",
      address: "",
      note_pembelian: "",
      provinces: [],
      province_id: "",
      cities: [],
      city_id: "",
      courier: "",
      courier_deliv: false,
      service: false,
      etd: false,
      buttonCheckout: false,
      buttonLoading: false,
      disabled_checkout: false,
      full_address: false,
      note: false,
      dataService: [],
      costService: "",
      cost_courier: "",
      service_courier: "",
      grandTotal: 0,
    });

    // mounted data provinces
    const provinces = onMounted(() => {
      Api.get("/rajaongkir/provinces")
        .then((response) => {
          state.provinces = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // function mendapatkan kota sesuai id provinsi
    const getCities = () => {
      Api.get("/rajaongkir/cities", {
        params: {
          province_id: state.province_id,
        },
      })
        .then((response) => {
          state.cities = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // fungsi mendapatkan courier
    const getCourier = () => {
      // set corier menjadi true
      state.courier_deliv = true;
    };

    // fungsi mendapatkan ongkos kirim
    const getOngkir = () => {
      // cek berat terlebih dahulu
      if (cartWeight.value == 0) {
        alert("tampaknya tidak ada barang di keranjang");
        return;
      }

      Api.post("/rajaongkir/check-ongkir", {
        city_destination: state.city_id,
        weight: cartWeight.value,
        courier: state.courier,
      })
        .then((response) => {
          // set menjadi true
          state.service = true;
          state.dataService = response.data.data[0].costs;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // fungsi menampilkan catatatn dan button chackout
    const show_note = () => {
      state.note = true;
    };
    const show_button = () => {
      state.buttonCheckout = true;
    };
    // fungsi mendapatkan
    const getCostService = () => {
      state.buttonCheckout = true;
      state.full_address = true;

      // ubah string menjadi array
      let shipping = state.costService.split("|");
      state.cost_courier = shipping[0];
      state.service_courier = shipping[1];

      // mendapatkan grand total total cart + ongkos kurir
      const token = store.state.auth.token;
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.get("cart/total").then((response) => {
        // jumlahkan total cart dan cost pengiriman
        state.grandTotal =
          parseInt(response.data.total) + parseInt(state.cost_courier);
      });
    };

    // validasi form
    const validation = reactive({
      name: false,
      phone: false,
      address: false,
      note_pembelian: false,
    });

    // fungsi buttonCheckout
    const checkout = () => {
      if (
        state.name &&
        state.phone &&
        state.address &&
        state.note_pembelian &&
        cartWeight.value
      ) {
        // ubag state tombol chackout ketika klik checkout
        state.buttonLoading = true;
        state.buttonCheckout = false;
        // define variable
        let data = {
          courier: state.courier,
          service_courier: state.service_courier,
          cost_courier: state.cost_courier,
          cartWeight: cartWeight.value,
          name: state.name,
          phone: state.phone,
          province_id: state.province_id,
          city_id: state.city_id,
          address: state.address,
          note_pembelian: state.note_pembelian,
          grandTotal: state.grandTotal,
        };

        store
          .dispatch("cart/checkout", data)
          .then((response) => {
            router.push({
              name: "detail_order",
              params: {
                snap_token: response[0].snap_token,
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      // check validasi
      if (!state.name) {
        validation.name = true;
      }
      if (!state.phone) {
        validation.phone = true;
      }
      if (!state.address) {
        validation.address = true;
      }
      if (!state.note_pembelian) {
        validation.note_pembelian = true;
      }
    };

    return {
      store,
      carts,
      removeCart,
      countCart,
      cartWeight,
      totalCart,
      state,
      validation,
      provinces,
      getCities,
      getCourier,
      getOngkir,
      getCostService,
      checkout,
      show_button,
      show_note,
    };
  },
};
</script>