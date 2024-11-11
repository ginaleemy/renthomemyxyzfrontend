<template>
  <div>
    <section id="intro">
      <Swiper :slides-per-view="1" :loop="property.photos.length >= 3" class="jumbotron jumbotron2" pagination navigation>
        <SwiperSlide v-for="(photo, index) in property.photos" :key="index">
          <img class="jumbotron-image" :src="photo" alt="Property Image" />
        </SwiperSlide>
      </Swiper>
    </section>
    <section id="singlecontent">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <h1>
              {{ property.title }} <span class="thetag">{{ property.status }}</span>
            </h1>
            <h5>{{ property.rent }}/Monthly</h5>
            <p>
              Address: {{ property.address }}<br />
              Size: {{ property.szie }}sq ft<br />
              Room: {{ property.noofroom }}<br />
              Living Room: {{ property.nooflivingroom }}<br />
              Posted Date: {{ formatDate(property.createdAt) }}
            </p>
            <h4>Description</h4>
            <div v-html="property.content"></div>
          </div>
          <div class="col-md-4">
            <div class="apply">
              <h5><i class="far fa-calendar-check"></i> Owner Contact</h5>
              <hr />
              <p>Phone: {{ property.phone }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/swiper-bundle.css"
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

// let id = route.params.id;
let slug = route.params.slug

const property = ref()
const { data } = await useFetch(runtimeConfig.public.apiBase + "properties/slug/" + slug)

if (data.value) {
  property.value = data.value
}
if (property.value.photos.length < 3) {
  property.value.photos = [...property.value.photos, ...property.value.photos]
}
</script>
<style>
.jumbotron2 {
  width: 100%;
  height: 100vh; /* Default height: 100% of the viewport height */
  max-height: 700px; /* Default max-height for smaller or medium screens */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Prevents overflow */
}

.jumbotron-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures image covers the container while preserving aspect ratio */
  object-position: center; /* Centers the image within the container */
}
/* Target the next and previous navigation buttons */
.swiper-button-next,
.swiper-button-prev {
  color: white; /* Change arrow color to white */
}

/* Optional: Change hover effect (if needed) */
.swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #ffffff; /* Maintain white color on hover */
}

@media (min-width: 1980px) {
  .jumbotron2 {
    height: 80vh; /* Adjust the height for larger screens */
    max-height: 700px; /* Optional: You can specify a fixed max height */
  }
}

@media (max-width: 1280px) {
  .jumbotron2 {
    height: 50vh; /* Adjust height for medium screens */
  }
}

@media (max-width: 768px) {
  .jumbotron2 {
    height: 40vh; /* Adjust height for smaller screens */
  }
}
</style>
