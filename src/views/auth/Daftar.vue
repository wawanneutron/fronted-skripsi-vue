<template>
  <!--page-login -->
  <div class="page-content page-auth" id="register">
    <section class="section-store-auth" data-aos="fade-up">
      <div class="container">
        <div class="row align-items-center justify-content-center row-login">
          <div class="col-lg-4 col-md-6">
            <h2>
              Memulai untuk jual beli <br />
              dengan cara terbaru
            </h2>
            <form action="" class="mt-4">
              <div class="form-group">
                <label for="">Full Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  v-model="name"
                  autofocus
                />
              </div>
              <div class="form-group">
                <label for="">Email Address</label>
                <input
                  type="email"
                  class="form-control is-invalid"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <input
                  type="password"
                  class="form-control is-invalid"
                  name="password"
                  id="password"
                />
              </div>
            </form>
            <div class="btn-register">
              <a href="/dashboard.html" class="btn btn-success btn-block mt-4"
                >Sign Up Now</a
              >
              <a href="/login.html" class="btn btn-signup btn-block mt-3"
                >Back to Sign in</a
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
  margin-top: 200px;
}
</style>

<script>
export default {
  setup() {},
};
</script>