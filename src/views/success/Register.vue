<template>
  <!-- succes -->
  <div class="page-content page-success">
    <section class="section-success" data-aos="zoom-in">
      <div class="container">
        <div class="row align-items-center row-login justify-content-center">
          <div class="col-lg-6 col-md-8 text-center">
            <img src="/images/ic_success.svg" alt="" class="mb-4" />
            <h2>Welcome to Store</h2>
            <p>
              Kamu sudah berhasil terdaftar <br />
              bersama kami. Let’s grow up now.
            </p>
            <div>
              <router-link
                :to="{ name: 'dashboard' }"
                class="btn btn-success w-50 mt-4"
                >My Dashboard</router-link
              >
            </div>
            <div>
              <router-link
                :to="{ name: 'home' }"
                class="btn btn-signup w-50 mt-3"
                >Go to Shopping</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.page-content {
  margin-top: 110px;
}
</style>