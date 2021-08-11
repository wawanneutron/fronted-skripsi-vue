<template>
  <section class="details-header"></section>
  <main id="dashboard">
    <div class="dashboard-customer">
      <div class="dashboard-heading">
        <h2 class="dashboard-title">Transactions</h2>
        <p class="dashboard-subtitle">
          Nikmati kemudahan berbelanja dalam genggamanmu
        </p>
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
        <div class="row row-dashboard">
          <div class="container-fluid">
            <div class="dashboard-heading mt-5">
              <div
                class="alert alert-info alert-dismissible fade show"
                role="alert"
              >
                <p>
                  <b>👋 Selamat Datang {{ user.name }}</b>
                  Kamu bisa melihat detail transaksi anda di menu detail. happy
                  shoping 😍 ✌️
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
          <div class="col-12 table-list mt-2">
            <!-- transaction table -->
            <div class="card rounded">
              <div>
                <h5 class="font-weight-bold">
                  <i class="fas fa-shopping-cart mr-2"></i>My Order
                </h5>
                <table
                  class="table table-striped mt-4 table-responsive-sm"
                  v-if="orders.length > 0"
                >
                  <thead class="text-uppercase table-info table-hover">
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
                          class="btn btn-sm btn-info"
                          ><i class="fas fa-eye mr-2"></i>detail</router-link
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
                    <thead class="text-uppercase table-info">
                      <tr class="text-center">
                        <th>invoice</th>
                        <th>Full name</th>
                        <th>Shipping</th>
                        <th>Grand Total</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                  </table>
                  <div class="alert alert-danger text-center mt-5 h6">
                    <i>Tidak ada transaksi</i>
                  </div>
                </div>
                <hr />
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
  padding-top: 100px;
}
.row-dashboard {
  margin-top: -70px;
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