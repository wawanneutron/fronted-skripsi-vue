<template>
  <div>
    <section class="mt-global store-breadcrumbs">
      <div class="row">
        <div class="col-12">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item  active">Cart</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
    <section class="store-cart card card-body shadow">
      <div class="text-product-header">
        <i class="fa fa-shopping-cart mr-2"></i>
        Order Details
      </div>
      <div class="row " data-aos="fade-up">
        <div class="col-12 table-responsive">
          <table class="table table-borderless table-cart">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Menu</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in carts" :key="index">
                <td class=" align-middle" style="width: 20%">
                  <img :src="cart.url" class="cart-image" />
                </td>
                <td class=" align-middle" style="width: 20%">
                  <div class="product-name">{{ cart.name }}</div>
                </td>
                <td class=" align-middle" style="width: 20%">
                  <div class="product-price">
                    Rp. {{ cart.price.toLocaleString("id-ID") }}
                  </div>
                  <div class="product-price-coret">
                    Rp. {{ cart.priceCoret.toLocaleString("id-ID") }}
                  </div>
                </td>
                <td class=" align-middle" style="width: 20%">
                  <div class="product-quantity">{{ cart.qty }}</div>
                </td>
                <td style="width: 20%" class="align-middle">
                  <a href="#" class="btn btn btn-remove-cart">Remove</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="text-product-header mt-4" data-aos="fade-up">
        <i class="fas fa-money-check-alt"></i>
        Payment informations
      </div>
      <div class="row payment-informations mt-5" data-aos="fade-in">
        <div class="col-6 col-lg-3 mb-3">
          <div class="number">9 (pcs)</div>
          <div class="sub-title">Jumlah Pemesanan</div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="number">Rp. 120.000</div>
          <div class="gram">(1000) gram</div>
          <div class="sub-title">Ongkos Kirim</div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="number">Rp. 567.000</div>
          <div class="sub-title">Subtotal</div>
        </div>
        <div class="col-12 col-lg-3">
          <a href="#" class=" btn btn-block btn-success">Checkout Now</a>
        </div>
      </div>
    </section>
    <section
      class="shipping-details card card-body shadow mt-4"
      data-aos="fade-in"
    >
      <div class="text-product-header">
        <i class="fas fa-shipping-fast mr-2"></i>
        Shipping Details
      </div>
      <div class="row mt-5">
        <div class="col-md-6">
          <div class="form-grop">
            <label for="name">Full Name</label>
            <input
              type="text"
              class=" form-control mb-4"
              placeholder="your full name"
              id="name"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class=" form-group">
            <label for="mobile">Mobile/Whatsapp</label>
            <input
              type="text"
              class=" form-control "
              placeholder="0877584586"
              id="mobile"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="provinces">Provinces</label>
            <select name="provinces" class=" form-control mb-4" id="provinces">
              <option selected>Banten</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="city">City / Districts</label>
            <select name="city" class=" form-control" id="city">
              <option selected>Kab. Tangerang</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="code">Postal Code</label>
            <input
              type="number"
              class=" form-control"
              id="code"
              placeholder="15720"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="address">Full Address</label>
            <textarea
              name="address"
              class=" form-control mb-4"
              id="address"
              rows="5"
            ></textarea>
          </div>
        </div>
        <div class="col-12">
          <div class="text-courier">Courier Delivery</div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="jne"
              id="jne"
              value="jne"
            />
            <label class="form-check-label" for="jne">JNE</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="tiki"
              id="tiki"
              value="tiki"
            />
            <label class="form-check-label" for="tiki">TIKI</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="pos"
              id="pos"
              value="pos"
            />
            <label class="form-check-label" for="pos">POS</label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "cart",
  data: () => ({
    carts: [
      {
        id: 1,
        url: "/images/pic_detail1.jpg",
        name: "Sofat ternyaman",
        price: 2080000,
        priceCoret: 2600000,
        qty: 3,
      },
      {
        id: 2,
        url: "/images/pic_detail3.jpg",
        name: "Sofat ternyaman",
        price: 2080000,
        priceCoret: 2600000,
        qty: 3,
      },
      {
        id: 3,
        url: "/images/pic_detail5.jpg",
        name: "Sofat ternyaman",
        price: 2080000,
        priceCoret: 2600000,
        qty: 3,
      },
    ],
  }),
};
</script>
