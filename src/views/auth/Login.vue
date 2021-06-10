<template>
  <!--page-login -->
  <div class="page-content page-auth">
    <section class="section-store-auth" data-aos="fade-up">
      <div class="container">
        <div class="row align-items-center justify-content-center row-login">
          <div class="col-lg-6 col-md-6 text-center">
            <img
              src="/images/img_login.jpg"
              alt=""
              class="w-50 mb-4 mb-lg-none"
            />
          </div>
          <div class="col-lg-5 col-md-6">
            <h2>
              Belanja kebutuhan utama,<br />
              menjadi lebih mudah
            </h2>
            <form action="" class="mt-3">
              <div class="form-group">
                <label for="">Email Address</label>
                <input
                  type="email"
                  class="form-control w-75"
                  name="emaiAddres"
                  id="emailAdres"
                />
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <input
                  type="password"
                  class="form-control w-75"
                  name="password"
                  id="password"
                />
              </div>
              <a
                href="/dashboard.html"
                class="btn btn-success btn-block w-75 mt-4"
                >Sign In to My Account</a
              >
              <router-link
                :to="{ name: 'register' }"
                class="btn btn-signup btn-block w-75 mt-3"
                >Sign Up</router-link
              >
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.page-content {
  margin-top: 200px;
}
</style>