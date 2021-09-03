<template>
  <section class="details-header-show"></section>
  <main id="dashboard-show">
    <!-- breadcrumb -->
    <div
      class="store-breadcrumbs-show"
      data-aos="fade-down"
      data-aos-delay="200"
    >
      <div class="row">
        <div class="col-12 col-bread">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'home' }">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Invoice</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <div class="dashboard-customer-show">
      <div class="dashboard-heading-show">
        <h2 class="dashboard-title">Transactions Details</h2>
        <div class="sub">
          <h5 class="dashboard-title">INVOICE: {{ detailOrder.invoice }}</h5>
          <p class="dashboard-subtitle">Cek status trasnsaksi anda</p>
        </div>
      </div>
      <div class="dashboard-content-show">
        <div class="row">
          <!-- notifikasi -->
          <div class="col-12 col-notif">
            <div
              class="alert alert-info alert-dismissible fade show"
              role="alert"
              v-if="detailOrder.status == 'pending'"
            >
              <p>
                Pembayaran akan di verifikasi otomastis oleh sistem. Status
                pembayaran anda saat ini {{ detailOrder.status }}
              </p>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
              v-if="detailOrder.status == 'payment-success'"
            >
              <p>Pesanan anda akan segera di proses, silahkan tunggu...</p>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              class="alert alert-info alert-dismissible fade show"
              role="alert"
              v-if="detailOrder.status == 'process'"
            >
              <p>
                Pesanan anda sedang kami proses, kami akan segera mengirim nomor
                resi, silahkan tunggu...
              </p>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
              v-if="detailOrder.status == 'shipping'"
            >
              <p>
                Kami sudah mengirim nomor resi, silahkan lacak pengiriman anda
              </p>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
              v-if="detailOrder.status == 'success'"
            >
              <p>Transaksi Selesai.</p>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
              v-if="detailOrder.status == 'expired'"
            >
              <p>
                Transaksi sudah kadaluarsa, silahkan melakukan checkout lagi.
              </p>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
              v-if="detailOrder.status == 'failed'"
            >
              <p>Transaksi gagal, silahkan melakukan checkout lagi.</p>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <!-- end notifikasi -->
          <div class="col-12 order-details">
            <div class="row mb-3">
              <div class="col-12 col-details">
                <div class="card shadow">
                  <h5 class="font-weight-bold">
                    <i class="fas fa-shopping-cart mr-2"></i>Details Order
                  </h5>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12 col-sm-8 col-md-12 col-lg-12">
                        <div class="row">
                          <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                            <div class="product-title">No Invoice</div>
                            <div class="product-subtitle">
                              {{ detailOrder.invoice }}
                            </div>
                          </div>
                          <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                            <div class="product-title">Customer Name</div>
                            <div class="product-subtitle">
                              {{ detailOrder.name }}
                            </div>
                          </div>
                          <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                            <div class="product-title">
                              Information Corurier
                            </div>
                            <div class="product-subtitle">
                              {{ detailOrder.courier }} /
                              {{ detailOrder.service }} / Rp.
                              {{ moneyFormat(detailOrder.cost_courier) }}
                            </div>
                          </div>
                          <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                            <div class="product-title">No Telp/ Whatsapp</div>
                            <div class="product-subtitle">
                              {{ detailOrder.phone }}
                            </div>
                          </div>

                          <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                            <div class="product-title">Total Pembelian</div>
                            <div class="product-subtitle">
                              Rp. {{ moneyFormat(detailOrder.grand_total) }}
                            </div>
                          </div>

                          <!-- tombol pembayaran -->
                          <div
                            class="col-12 col-sm-6 col-md-6 col-lg-4"
                            v-if="detailOrder.status == 'pending'"
                          >
                            <div class="product-title">Payment Status</div>
                            <button
                              @click.prevent="payment(detailOrder.snap_token)"
                              type="submit"
                              class="btn btn-warning mt-2 mb-3"
                            >
                              <i class="fas fa-spinner fa-spin mr-2 fa-lg"></i>
                              Bayar Sekarang
                            </button>
                          </div>
                          <div
                            class="col-12 col-sm-6 col-md-6 col-lg-4"
                            v-if="detailOrder.status == 'payment-success'"
                          >
                            <div class="product-title">Payment Status</div>
                            <button
                              type="submit"
                              class="btn btn-success mt-2 mb-3"
                            >
                              Pembayaran Terverifikasi
                              <i class="fas fa-check-circle ml-2 fa-lg"></i>
                            </button>
                          </div>
                          <div
                            class="col-12 col-sm-6 col-md-6 col-lg-4"
                            v-if="detailOrder.status == 'process'"
                          >
                            <div class="product-title">Payment Status</div>
                            <button
                              type="submit"
                              class="btn btn-info mt-2 mb-3"
                            >
                              <i class="fas fa-sync fa-spin mr-2"></i>
                              Barang diproses
                            </button>
                          </div>
                          <div
                            class="col-12 col-sm-6 col-md-6 col-lg-4"
                            v-if="detailOrder.status == 'shipping'"
                          >
                            <div class="product-title">Payment Status</div>
                            <button
                              type="submit"
                              class="btn btn-warning mt-2 mb-3"
                            >
                              <i class="fas fa-truck fa-spin mr-2"></i>
                              Barang Sedang Dikirim
                            </button>
                          </div>
                          <div
                            class="col-12 col-sm-6 col-md-6 col-lg-4"
                            v-if="detailOrder.status == 'success'"
                          >
                            <div class="product-title">Payment Status</div>
                            <button
                              type="submit"
                              class="btn btn-success mt-2 mb-3"
                            >
                              <i class="far fa-check-circle mr-2 fa-lg"></i>
                              Pesanan Selesai
                            </button>
                          </div>
                          <div
                            class="col-12 col-sm-6 col-md-6 col-lg-4"
                            v-if="detailOrder.status == 'failed'"
                          >
                            <div class="product-title">Payment Status</div>
                            <button
                              type="submit"
                              class="btn btn-danger mt-2 mb-3"
                            >
                              <i class="fas fa-times-circle mr-2 fa-lg"></i>
                              Pembayaran Gagal
                            </button>
                          </div>
                          <div
                            class="col-12 col-sm-6 col-md-6 col-lg-4"
                            v-if="detailOrder.status == 'expired'"
                          >
                            <div class="product-title">Payment Status</div>
                            <button
                              type="submit"
                              class="btn btn-danger mt-2 mb-3"
                            >
                              <i class="fas fa-times-circle mr-2 fa-lg"></i>
                              Pembayaran Expired
                            </button>
                          </div>
                          <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                            <div class="product-title">Provinsi</div>
                            <div class="product-subtitle">
                              {{ kota.name }}
                            </div>
                          </div>
                          <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                            <div class="product-title">Kabupaten/Kota</div>
                            <div class="product-subtitle">
                              {{ provinsi.name }}
                            </div>
                          </div>
                          <div
                            class="col-12 col-sm-6 col-md-6 col-lg-4"
                            v-if="
                              detailOrder.status == 'shipping' ||
                              detailOrder.status == 'success'
                            "
                          >
                            <div class="product-title">No Resi</div>
                            <div class="product-subtitle">
                              {{ detailOrder.resi }}
                            </div>
                          </div>
                          <div class="col-12 col-sm-6 col-md-6">
                            <div class="product-title">Alamat Lengkap</div>
                            <div class="product-subtitle">
                              {{ detailOrder.address }}
                            </div>
                          </div>
                          <div
                            class="col-12 col-sm-6 col-md-6 alert alert-info"
                            v-if="detailOrder.note != null"
                          >
                            <div class="product-title">Catatan Pembelian</div>
                            <div class="product-subtitle">
                              {{ detailOrder.note }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="row"
                      v-if="
                        detailOrder.status == 'shipping' ||
                        detailOrder.status == 'success'
                      "
                    >
                      <div class="col-12 text-right">
                        <button
                          @click.prevent="cekResi"
                          type="submit"
                          class="btn btn-info mt-4"
                          data-toggle="modal"
                          data-target=".bd-example-modal-lg"
                        >
                          Check Resi Anda
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 order-details">
            <div class="card">
              <h5 class="font-weight-bold">
                <i class="fas fa-shopping-cart mr-2"></i>Items Order
              </h5>
              <hr />
              <div
                class="card-body"
                v-for="(item, index) in productInOrder"
                :key="index"
              >
                <div class="row">
                  <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
                    <div class="card-img">
                      <router-link
                        :to="{
                          name: 'detail',
                          params: { slug: item.product.slug },
                        }"
                      >
                        <div class="image-detail-order">
                          <img
                            :src="item.product.gallery[0].image"
                            alt="image detail"
                          />
                        </div>
                      </router-link>
                    </div>
                  </div>
                  <div class="col-12 col-sm-8 col-md-8 col-lg-8 col-details">
                    <div class="row">
                      <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                        <div class="product-title">Product Name</div>
                        <div class="product-subtitle">
                          {{ item.product_name }}
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                        <div class="product-title">Quantity</div>
                        <div class="product-subtitle">
                          {{ item.qty }}
                          <span style="font-size: 15px">(pcs)</span>
                        </div>
                      </div>
                      <div
                        class="col-12 col-sm-6 col-md-6 col-lg-6"
                        v-if="detailOrder.status == 'pending'"
                      >
                        <div class="product-title">Payment Status</div>
                        <div class="product-subtitle text-warning">
                          {{ detailOrder.status }}
                        </div>
                      </div>
                      <div
                        class="col-12 col-sm-6 col-md-6 col-lg-6"
                        v-if="detailOrder.status == 'failed'"
                      >
                        <div class="product-title">Payment Status</div>
                        <div class="product-subtitle text-danger">
                          {{ detailOrder.status }}
                        </div>
                      </div>
                      <div
                        class="col-12 col-sm-6 col-md-6 col-lg-6"
                        v-if="detailOrder.status == 'expired'"
                      >
                        <div class="product-title">Payment Status</div>
                        <div class="product-subtitle text-danger">
                          {{ detailOrder.status }}
                        </div>
                      </div>
                      <div
                        class="col-12 col-sm-6 col-md-6 col-lg-6"
                        v-if="detailOrder.status == 'success'"
                      >
                        <div class="product-title">Payment Status</div>
                        <div class="product-subtitle text-success">
                          {{ detailOrder.status }}
                        </div>
                      </div>
                      <div
                        class="col-12 col-sm-6 col-md-6 col-lg-6"
                        v-if="detailOrder.status == 'payment-success'"
                      >
                        <div class="product-title">Payment Status</div>
                        <div class="product-subtitle text-success">
                          {{ detailOrder.status }}
                        </div>
                      </div>
                      <div
                        class="col-12 col-sm-6 col-md-6 col-lg-6"
                        v-if="detailOrder.status == 'shipping'"
                      >
                        <div class="product-title">Payment Status</div>
                        <div class="product-subtitle text-warning">
                          {{ detailOrder.status }}
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                        <div class="product-title">Price</div>
                        <div class="product-subtitle">
                          Rp. {{ moneyFormat(item.price) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 text-right">
                  <button
                    class="btn btn-info mt-4 margin"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    @click="
                      (stateReview.order_id = item.id) &&
                        (stateReview.product_id = item.product_id)
                    "
                    @click.prevent="cekOrderId"
                    v-if="detailOrder.status == 'success'"
                  >
                    Berikan ulasan
                  </button>
                </div>
                <!-- modal review -->
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Ulasan Produk
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="false">&times;</span>
                        </button>
                      </div>
                      <!-- handle inputan -->
                      <div class="modal-body">
                        <div class="row justify-content-center">
                          <div style="display: inline-block; margin: 0 auto">
                            <star-rating
                              :star-size="50"
                              :show-rating="false"
                              :increment="0.5"
                              v-model:rating="stateReview.rating"
                            >
                            </star-rating>
                          </div>
                        </div>
                        <div class="form-group mt-5">
                          <label class="font-weight-bold" for="ulasan"
                            >Tulis Ulasan</label
                          >
                          <textarea
                            id="ulasan"
                            rows="3"
                            placeholder="Masukkan Ulasan Produk"
                            class="form-control"
                            spellcheck="false"
                            v-model="stateReview.reviewCustomer"
                          ></textarea>
                          <!-- <div class="alert alert-danger" v-if="validation">
                              {{ validation.value }}
                            </div> -->
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <div
                          v-if="
                            stateReview.buttonKirim || submitReview.length > 0
                          "
                        >
                          <button
                            @click.prevent="submitReview"
                            class="btn btn-primary"
                          >
                            Kirim
                          </button>
                        </div>
                        <div v-else>
                          <div v-if="stateReview.buttonLoading">
                            <button class="btn btn-primary">
                              <i class="fa fa-spinner fa-spin"></i>Loading
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal cek resi -->
    <!-- Button trigger modal -->
    <div
      class="modal fade bd-example-modal-lg"
      id="exampleModalLong"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title font-weight-bold text-uppercase"
              id="exampleModalLongTitle"
            >
              <i class="fas fa-shipping-fast mr-2"></i>tracking status
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- cek resi -->
            <h6 class="font-weight-bold text-uppercase mt-3 mb-2">
              <i class="fas fa-info-circle fa-lg mr-2"></i> Information shipping
            </h6>
            <table class="table table-responsive table-info text-uppercase h6">
              <tr>
                <td>No Resi</td>
                <td>:</td>
                <td>{{ state.data_resi.awb }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>:</td>
                <td>{{ state.data_resi.status }}</td>
              </tr>
              <tr>
                <td>Service</td>
                <td>:</td>
                <td>{{ state.data_resi.service }}</td>
              </tr>
              <tr>
                <td class="col-6">Dikirm Tanggal</td>
                <td class="">:</td>
                <td class="col-6">{{ state.data_resi.date }}</td>
              </tr>
              <tr>
                <td>Dikirm Oleh</td>
                <td>:</td>
                <td>{{ state.details.shipper }}</td>
              </tr>
              <tr>
                <td>Dikirm Ke</td>
                <td>:</td>
                <td>{{ state.details.destination }}</td>
              </tr>
              <tr>
                <td>Desc</td>
                <td>:</td>
                <td>{{ state.data_resi.desc }}</td>
              </tr>

              <tr>
                <td>Courier</td>
                <td>:</td>
                <td>{{ state.data_resi.courier }}</td>
              </tr>
            </table>
            <!-- information status tracking -->
            <h6 class="font-weight-bold text-uppercase mt-5 mb-2">
              <i class="fas fa-truck-moving fa-lg mr-2"></i> Information status
              tracking
            </h6>
            <table
              class="
                table table-responsive table-bordered
                text-uppercase
                mb-3
                h6
              "
            >
              <tr>
                <th>Tangal</th>
                <th>Keterangan</th>
              </tr>
              <tr v-for="data of state.histories" :key="data">
                <template v-for="(item, index) of data" :key="index">
                  <td class="col-6">{{ item }}</td>
                </template>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.dashboard-customer-show {
  margin-top: 150px;
}
</style>

<script>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import StarRating from "vue-star-rating";

import Api from "../../api/Resi";
import ApiServer from "../../api/Api";

export default {
  components: {
    StarRating,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      // panggil action detailOrder didalam module order di vuex
      store.dispatch("order/detailOrder", route.params.snap_token);
    });

    const detailOrder = computed(() => {
      return store.getters["order/detailOrder"];
    });

    const productInOrder = computed(() => {
      return store.getters["order/productInOrder"];
    });

    const kota = computed(() => {
      return store.getters["order/getKota"];
    });

    const provinsi = computed(() => {
      return store.getters["order/getProvinsi"];
    });

    /* functio
    pament Midtrans */
    const payment = (snap_token) => {
      window.snap.pay(snap_token, {
        onSuccess: function () {
          router.push({
            name: "detail_order",
            params: { snap_token: snap_token },
          });
        },
        onPending: function () {
          router.push({
            name: "detail_order",
            params: { snap_token: snap_token },
          });
        },
        onError: function () {
          router.push({
            name: "detail_order",
            params: { snap_token: snap_token },
          });
        },
      });
    };

    /* cek resi */

    let state = reactive({
      api_key:
        "978c636e99c92e58a30d021fa384fc76039664f2984a3b113ff7d01385b83378",
      data_resi: {},
      details: {},
      histories: [], //history pengiriman
    });
    // cek resi
    const cekResi = () => {
      if (detailOrder.value.courier == "jne") {
        Api.get("/v1/track", {
          params: {
            api_key: state.api_key,
            courier: detailOrder.value.courier,
            awb: detailOrder.value.resi,
          },
        })
          .then((response) => {
            let sumary = response.data.data.summary;
            let dataHistory = response.data.data.history;
            let detail = response.data.data.detail;

            const history = dataHistory.map((elmn) => {
              return elmn;
            });

            state.histories = history;
            state.data_resi = sumary;
            state.details = detail;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (detailOrder.value.courier == "pos") {
        Api.get("/v1/track", {
          params: {
            api_key: state.api_key,
            courier: detailOrder.value.courier,
            awb: detailOrder.value.resi,
          },
        })
          .then((response) => {
            let sumary = response.data.data.summary;
            let dataHistory = response.data.data.history;
            let detail = response.data.data.detail;

            const history = dataHistory.map((elmn) => {
              return elmn;
            });

            state.histories = history;
            state.data_resi = sumary;
            state.details = detail;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (detailOrder.value.courier == "tiki") {
        Api.get("/v1/track", {
          params: {
            api_key: state.api_key,
            courier: detailOrder.value.courier,
            awb: detailOrder.value.resi,
          },
        })
          .then((response) => {
            let sumary = response.data.data.summary;
            let dataHistory = response.data.data.history;
            let detail = response.data.data.detail;

            const history = dataHistory.map((elmn) => {
              return elmn;
            });

            state.histories = history;
            state.data_resi = sumary;
            state.details = detail;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    // state review ulasan
    let stateReview = reactive({
      order_id: "",
      product_id: "",
      rating: "",
      reviewCustomer: "",
      status: [],
      buttonKirim: false,
      buttonLoading: false,
    });

    return {
      detailOrder,
      productInOrder,
      kota,
      provinsi,
      payment,
      cekResi,
      state,
      stateReview,
    };
  },
  methods: {
    // fungsi untuk mengecek length review
    cekOrderId() {
      this.stateReview.buttonKirim = true;
      /* rating atau reaview product oleh customer */
      // get data token dan user
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      let orderId = this.stateReview.order_id;
      // kirim ke server untuk di cek
      ApiServer.post("/reviewcek", {
        order_id: orderId,
        user_id: user.id,
      })
        .then((response) => {
          this.stateReview.status = response.data.review;
          console.log(this.stateReview.status);
          // cek jika array belum ada isi nya
          if (this.stateReview.status.length == 0) {
            this.$swal("silahkan isi ulasan anda");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // fungsi untuk menambahkan review / ulasan dan rating
    submitReview() {
      this.stateReview.buttonKirim = false;
      this.stateReview.buttonLoading = true;
      /* rating atau reaview product oleh customer */
      // get data token dan user
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      let orderId = this.stateReview.order_id;
      let productId = this.stateReview.product_id;
      let rating = this.stateReview.rating;
      let review = this.stateReview.reviewCustomer;
      // cek apakah data ada ?
      if (this.stateReview.status.length <= 0) {
        ApiServer.post("/review", {
          customer_id: user.id,
          order_id: orderId,
          product_id: productId,
          rating: rating,
          review: review,
        })
          .then(() => {
            this.$swal({
              icon: "success",
              title: "Yeay...",
              text: "Terimakasih sudah memebrikan ulasan",
              showConfirmButton: false,
              timer: 2000,
            });
            // hapus data di form
            this.stateReview.rating = "";
            this.stateReview.reviewCustomer = "";
            this.stateReview.buttonKirim = true;
            this.stateReview.buttonLoading = false;
            // cek lagi isi reviewnya
            ApiServer.post("/reviewcek", {
              order_id: orderId,
              user_id: user.id,
            })
              .then((response) => {
                this.stateReview.status = response.data.review;
                console.log(this.stateReview.status);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(() => {
            // hapus data di form
            this.stateReview.rating = "";
            this.stateReview.reviewCustomer = "";
            this.stateReview.buttonLoading = false;
            this.stateReview.buttonKirim = true;

            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Harap diisi dengan lengkap",
            });
          });
      } else {
        // Use sweetalert2
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Anda sudah memberikan ulasan",
          showConfirmButton: false,
          timer: 2000,
        });
        this.stateReview.buttonLoading = false;
        // hapus data di form
        this.stateReview.rating = "";
        this.stateReview.reviewCustomer = "";
      }

      console.log(this.stateReview.reviewCustomer);
      console.log(this.stateReview.rating);
      console.log(this.stateReview.order_id);
      console.log(this.stateReview.product_id);
    },
  },
};
</script>