<template>
  <section class="store-carousel img-carousel">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-img" data-aos="zoom-in">
          <div id="storeCarousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li
                class="active"
                data-target="#storeCarousel"
                data-slide-to="0"
              ></li>
              <li data-target="#storeCarousel" data-slide-to="1"></li>
              <li data-target="#storeCarousel" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="/images/banner.jpg" alt="" class="d-block w-100" />
              </div>
              <div class="carousel-item">
                <img src="/images/banner2.jpg" alt="" class="d-block w-100" />
              </div>
              <div class="carousel-item">
                <img src="/images/banner3.jpg" alt="" class="d-block w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>