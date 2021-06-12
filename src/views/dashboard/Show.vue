<template>
  <div class="dashboard-customer-show">
    <div class="dashboard-heading">
      <h2 class="dashboard-title">Transactions Details</h2>
      <div class="sub">
        <h5 class="dashboard-title">{{ detailOrder.invoice }}</h5>
        <p class="dashboard-subtitle">Cek status trasnsaksi anda</p>
      </div>
    </div>
    <div class="dashboard-content">
      <div class="dashboard-heading">
        <!-- breadcrumb -->
        <section
          class="store-breadcrumbs"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          <div class="row">
            <div class="col-12">
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'home' }">Home</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link :to="{ name: 'dashboard' }"
                      >Dashboard</router-link
                    >
                  </li>
                  <li class="breadcrumb-item active">Detail</li>
                </ol>
              </nav>
            </div>
          </div>
        </section>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="alert alert-info">
            <p>Pembayaran akan di verifikasi otomastis oleh sistem.</p>
            <br />
            Status pembayaran anda saat ini {{ detailOrder.status }}
          </div>
          <div class="dashboard-content" id="transactionDetails">
            <div class="row mb-3">
              <div class="col-12">
                <div class="card">
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
                              {{ detailOrder.cost_courier }}
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

                          <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                            <div class="product-title">Payment Status</div>
                            <button
                              type="submit"
                              class="btn btn-success mt-2 mb-3"
                            >
                              Pending
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
                          <div class="col-12 col-sm-6 col-md-6 col-lg-12">
                            <div class="product-title">Alamat lengkap</div>
                            <div class="product-subtitle">
                              {{ detailOrder.address }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12 text-right">
                        <button type="submit" class="btn btn-info mt-4">
                          Chack Resi Anda
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
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
                <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                  <img :src="item.image" alt="" class="w-75 mb-3" />
                </div>
                <div class="col-12 col-sm-8 col-md-8 col-lg-8">
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
                    <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div class="product-title">Payment Status</div>
                      <div class="product-subtitle text-danger">
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
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dashboard-customer-show {
  margin-top: 150px;
}
</style>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    // const router  = useRouter()

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

    return {
      detailOrder,
      productInOrder,
      kota,
      provinsi,
    };
  },
};
</script>