<template>
  <div>
    <section class="dashboard">
      <div class="container-fluid">
        <div class="row">
          <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block">
            <div class="sidebar-sticky pt-3">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="/users/property/add"> Add New Property </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/users/property/myproperties"> My Property </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10">
            <div>
              <h3>Add New</h3>
              <form @submit.prevent="createProperty">
                <div class="form-group">
                  <label>Property name</label>
                  <input v-model="title" type="text" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea v-model="content" class="form-control" required></textarea>
                </div>
                <div class="form-group">
                  <label>Rental</label>
                  <input v-model.number="rent" type="number" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>Size</label>
                  <input v-model.number="size" type="number" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>No of Room</label>
                  <input v-model.number="noofroom" type="number" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>No of Living Room</label>
                  <input v-model.number="nooflivingroom" type="number" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>Address</label>
                  <input v-model="address" type="text" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>Contact Phone</label>
                  <input v-model="phone" type="number" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>State</label>
                  <select v-model="states" class="form-control" required>
                    <option value="Johor">Johor</option>
                    <option value="Kedah">Kedah</option>
                    <option value="Kelantan">Kelantan</option>
                    <option value="Melaka">Melaka</option>
                    <option value="Negeri Sembilan">Negeri Sembilan</option>
                    <option value="Pahang">Pahang</option>
                    <option value="Perak">Perak</option>
                    <option value="Perlis">Perlis</option>
                    <option value="Pulau Pinang">Pulau Pinang</option>
                    <option value="Sabah">Sabah</option>
                    <option value="Sarawak">Sarawak</option>
                    <option value="Selangor">Selangor</option>
                    <option value="Terengganu">Terengganu</option>
                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Putrajaya">Putrajaya</option>
                    <option value="Labuan">Labuan</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Availability</label>
                  <select v-model="status" class="form-control" required>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <!-- Image upload component -->
                <div class="form-group">
                  <label>Property Images</label>
                  <ImageUpload v-model="uploadedImages" />
                </div>
                <br />
                <button @click.prevent="createProperty" class="btn btn-primary">Add</button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ImageUpload from "../../test/imageuploadadd.vue"

definePageMeta({
  middleware: ["auth"]
})
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const user = getUser()

const title = ref("")
const content = ref("")
const rent = ref(null)
const size = ref(null)
const noofroom = ref(null)
const nooflivingroom = ref(null)
const address = ref("")
const states = ref("")
const phone = ref("")
const status = ref("")
const uploadedImages = ref([])

const createProperty = async () => {
  try {
    const { data, error } = await useFetch(runtimeConfig.public.apiBase + "properties", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user?.accessToken
      },
      body: {
        title: title.value,
        content: content.value,
        rent: rent.value,
        size: size.value,
        noofroom: noofroom.value,
        nooflivingroom: nooflivingroom.value,
        address: address.value,
        status: status.value,
        states: states.value,
        phone: phone.value,
        photos: uploadedImages.value // Add this line to send the images
      }
    })

    if (data.value) {
      alert("New property created Successfully!")
      // Reset form fields or perform any other necessary actions
      window.location.href = "/users/property/myproperties"
    }
  } catch (error) {
    alert(error.data.message)
  }
}
</script>
