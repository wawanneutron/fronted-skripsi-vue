<template>
  <section class="details-header"></section>
  <main id="dashboard">
    <div class="dashboard-customer">
      <div class="dashboard-heading">
        <h2 class="dashboard-title">Transactions</h2>
        <p class="dashboard-subtitle">Big result start from the small one</p>
      </div>
      <!-- breadcrumb -->
      <section class="mt-global store-breadcrumbs">
        <div class="row">
          <div class="col-12">
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'home' }">Home</router-link>
                </li>

                <li class="breadcrumb-item active">Dashboard</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>
      <div class="dashboard-content">
        <div class="dashboard-heading"></div>
        <!-- list transactions -->
        <div class="row mt-3">
          <div class="col-12 mt-2">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  >My Dashboard</a
                >
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  >My Transactions</a
                >
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div
                  class="section-content section-dashboard-home"
                  data-aos="fade-up"
                >
                  <div class="container-fluid">
                    <div class="dashboard-heading">
                      <div
                        class="alert alert-info alert-dismissible fade show"
                        role="alert"
                      >
                        <p>
                          <b>Selamat Datang {{ user.name }}</b>
                          Jika anda sudah melakukan transaksi, silahkan tracking
                          resi anda di menu My transactions
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
                        class="alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <p>
                          Kami akan mengirimkan email notifikasi beserta detail
                          pembayran ke email
                          <b>{{ user.email }}</b> jika anda sudah melakukan
                          proses chackout.
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
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <!-- transaction table -->
                <div class="card border-0 rounded shadow">
                  <div>
                    <h5 class="font-weight-bold">
                      <i class="fas fa-shopping-cart mr-2"></i>My Order
                    </h5>
                    <table
                      class="
                        table table-striped table-bordered
                        mt-4
                        table-responsive-lg
                      "
                      v-if="orders.length > 0"
                    >
                      <thead class="text-uppercase thead-dark">
                        <tr class="text-center">
                          <th>invoice</th>
                          <th>Full name</th>
                          <th>Courier</th>
                          <th>Status</th>
                          <th>Grand Total</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orders" :key="order.id">
                          <td>{{ order.invoice }}</td>
                          <td>{{ order.name }}</td>
                          <td>
                            {{ order.courier }} | {{ order.service }} | Rp.
                            {{ moneyFormat(order.cost_courier) }}
                          </td>
                          <td>
                            {{ order.status }}
                          </td>
                          <td>Rp. {{ moneyFormat(order.grand_total) }}</td>
                          <td class="text-center">
                            <router-link
                              :to="{
                                name: 'detail_order',
                                params: { snap_token: order.snap_token },
                              }"
                              class="btn btn-secondary"
                              ><i class="fas fa-eye mr-2"></i
                              >detail</router-link
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- data kosong -->
                    <div v-else>
                      <table
                        class="
                          table table-striped table-bordered
                          mt-4
                          table-responsive-lg
                        "
                      >
                        <thead class="text-uppercase thead-dark">
                          <tr class="text-center">
                            <th>invoice</th>
                            <th>Full name</th>
                            <th>Shipping</th>
                            <th>Grand Total</th>
                            <th>Option</th>
                          </tr>
                        </thead>
                      </table>
                      <div class="alert alert-danger text-center h5">
                        Data Kosong
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.dashboard-customer {
  padding-top: 140px;
}

.dashboard-content {
  margin-top: 100px;
}
</style>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  setup() {
    // store vuex
    const store = useStore();
    // mounted
    onMounted(() => {
      // panggil action getOrder di module order vuex
      return store.dispatch("order/getOrder");
    });
    // computed
    const orders = computed(() => {
      // panggil getter dengan nama getOrder di module order vuex
      return store.getters["order/getOrder"];
    });
    // panggil user
    const user = store.state.auth.user;
    return {
      store,
      orders,
      user,
    };
  },
};
</script>