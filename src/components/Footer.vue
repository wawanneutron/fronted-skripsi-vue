<template>
  <!-- footer -->
  <footer>
    <div class="container">
      <div class="row row-footer">
        <div class="col-md-3">
          <div class="header">About</div>
          <div class="child">
            Berikut ini adalah catatan mengenai ketentuan berbelanja di toko
            kami. Mohon dibaca dengan saksama agar tidak terjadi kesalahpahaman
            dan demi menciptakan pengalaman berbelanja yang menyenangkan.
            <router-link :to="{ name: 'Term' }">Kebijakan Toko </router-link>
            🙌🚀
          </div>
        </div>
        <div class="col-md-3">
          <div class="header">Contact</div>
          <div class="child">
            <ul>
              <li>02185252626</li>
              <li>hello@adminsport.my.id</li>
            </ul>
          </div>
        </div>
        <div class="col-md-3">
          <div class="header">On Social Media</div>
          <div class="child">
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Whatsapp</li>
            </ul>
          </div>
        </div>
        <div class="col-md-3">
          <div class="header">Address</div>
          <div class="child">
            Jl. Raya Serang No.6, Cangkudu, Kec. Balaraja, Tangerang, Banten
            15610
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <p class="pt-4 mb-2">2021 Copyright Store. All Rights Reserved.</p>
          <span class="sub-footer">Dibuat dengan sepenuh 💖🇮🇩 </span> <br />
          <span class="sub-footer" style="margin-top: 10px">
            development by
            <a href="https://github.com/wawanneutron" target="blank"
              >Wawan Setiawan</a
            >
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
footer {
  margin-top: 130px;
}
</style>