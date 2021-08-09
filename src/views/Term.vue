<template>
  <div class="term container mt-global">
    <div
      class="alert alert-info alert-dismissible text-center fade show"
      role="alert"
    >
      <span> Aturan-aturan ini dibuat demi kenyamanan bersama </span>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <h2 class="text-center">Aturan Berbelanja Online</h2>
    <p class="text-center">
      Berikut ini adalah catatan mengenai ketentuan berbelanja di toko kami.
      <br />
      Mohon dibaca dengan saksama agar tidak terjadi kesalahpahaman <br />
      dan demi menciptakan pengalaman berbelanja yang menyenangkan.
    </p>
    <div class="row mt-5">
      <div class="col">
        <div class="tabs">
          <div class="tab">
            <input type="checkbox" id="chck1" />
            <label class="tab-label" for="chck1">Jam Layanan</label>
            <div class="tab-content">
              Bertransaksi bisa kapan saja di toko online kami, akan tetapi kami
              memproses pesanan yang masuk sesuai jam kerja kami yaitu senin s/d
              sabtu jam 07.00 s/d 17.00, <br />
              pesanan yang lewat jam kerja akan di proses keesokan harinya
            </div>
          </div>
          <div class="tab">
            <input type="checkbox" id="chck2" />
            <label class="tab-label" for="chck2">Pengiriman Barang</label>
            <div class="tab-content">
              Pengiriman luar kota, kami bekerjasama dengan jasa exspedisi
              pengiriman barang seperti jne, jnt, dan pos, pemilihan exspedisi
              tergantung customer yang memilih exspedisi mana yang di pakai
            </div>
          </div>
          <div class="tab">
            <input type="checkbox" id="chck3" />
            <label class="tab-label" for="chck3">Pereturan Barang</label>
            <div class="tab-content">
              Aturan pereturan barang. Jika barang yang diterima tidak sesuai,
              kamu bisa mengajukan penggantiann barang baru yang sesuai dengan
              pesanan caranya: <br />
              Kamu lampiran bukti pembelian atau invoice melalui chat whatsapp
              yang tertera di website
            </div>
          </div>
          <div class="tab">
            <input type="checkbox" id="chck4" />
            <label class="tab-label" for="chck4">Kebijakan Pembayaran</label>
            <div class="tab-content">
              Untuk memberikan kemudahan dan kepastian bagi pelanggan dalam
              melakukan transaksi, <br />
              saat ini kami mengimplementasikan sistem pembayaran online melalui
              <a href="https://midtrans.com/">Midtrans.com</a>. <br />
              Midtrans adalah salah satu payment gateway yang memfasilitasi
              kebutuhan para pebisnis online dengan memberikan pelayanan
              berbagai cara pembayaran. <br />
              Pelayanan tersebut memungkinkan para pelaku industri lebih mudah
              beroperasi dan meningkatkan penjualan. <br />
              Metode pembayaran yang disediakan adalah card payment, bank
              transfer, direct debit, e-wallet, over the counter, dan lain-lain.
              <br />
              Semua transaksi akan diproses dalam mata uang Rupiah Indonesia.
              Midtrans memastikan proses pembayaran order Anda aman dengan
              protokol Secure Sockets Layer (SSL). SSL menyediakan keamanan
              penuh bagi setiap pelanggan dan kebebasan untuk berbelanja online
              tanpa rasa khawatir mengenai kemungkinan pencurian informasi kartu
              kredit.
              <br />
              Pembayaran hanya dapat dilakukan menggunakan jasa layanan kami,
              <br />
              yaitu menggunakan virtual account yang sudah disediakan oleh
              sistem, melalui Midtrans<br />
              pihak toko <b>tidak</b> bertransaksi selain menggunanakan
              <b>diluar</b> penyedia layanan yang sudah disediakan oleh sistem
            </div>
          </div>
          <div class="tab">
            <input type="checkbox" id="chck5" />
            <label class="tab-label" for="chck5">Kebijakan Privasi</label>
            <div class="tab-content">
              <div class="alert alert-warning">pahami kebijakan privasi</div>

              Kami jamin data yang anda masukan akan kami jaga dibawah
              undang-undang dan moral kebijakan privasi <br />
              segala bentuk akses terhadap website, layanan, serta pembelian
              produk di wajibkan menggunakan data dan informasi yang valid,
              <br />
              baik itu email, no telepon / whatsapp, alamat rumah dan lain
              sebagainya yang berhubungan dengan data pribadi.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
