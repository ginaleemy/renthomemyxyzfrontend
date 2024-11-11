<template>
  <div>
    <section class="dashboard">
      <div class="container-fluid">
        <div class="row">
          <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
            <div class="sidebar-sticky pt-3">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link" href="/users/property/add"> Add New Property</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/users/property/myproperties"> My Property </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10">
            <div>
              <h3>Update Property</h3>
              <form @submit.prevent="updateProperty">
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
                <button @click.prevent="updateProperty" class="btn btn-primary">Update</button>
                &nbsp;<button @click.prevent="deleteProperty" class="btn btn-secondary">Delete</button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import ImageUpload from "../../test/imageupload.vue" // Import the ImageUpload component

definePageMeta({
  middleware: ["auth"]
})

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const user = getUser()

const propertyId = route.params.id

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
// To hold image URLs
const uploadedImages = ref([])

const fetchProperty = async () => {
  try {
    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}properties/${propertyId}`)

    if (data.value) {
      title.value = data.value.title
      content.value = data.value.content
      rent.value = data.value.rent
      size.value = data.value.size
      noofroom.value = data.value.noofroom
      nooflivingroom.value = data.value.nooflivingroom
      address.value = data.value.address
      states.value = data.value.states
      status.value = data.value.status
      phone.value = data.value.phone
      // Assign existing images to uploadedImages
      uploadedImages.value = data.value.photos
    }
  } catch (error) {
    alert(error.data.message)
  }
}

const updateProperty = async () => {
  try {
    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}properties/${propertyId}`, {
      method: "PUT",
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
        states: states.value,
        status: status.value,
        phone: phone.value,
        photos: uploadedImages.value // Pass the updated images
      }
    })

    if (data.value) {
      alert("Property updated successfully!")
      // Optionally, you can redirect to another page or perform any other necessary actions
    }
  } catch (error) {
    alert(error.data.message)
  }
}
const deleteProperty = async () => {
  try {
    // Optional: Add a confirmation prompt before deleting
    if (!confirm("Are you sure you want to delete this property?")) {
      return // Exit if the user cancels
    }

    // Send the DELETE request
    const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}properties/${propertyId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user?.accessToken
      }
    })

    if (data.value) {
      alert("Property deleted successfully!")
      // Optionally, redirect the user to another page after deletion
      // For example, redirect to the properties list page
      // router.push("/users/property/myproperties");
      window.location.href = "/users/property/myproperties"
    }
  } catch (error) {
    alert(error.data.message || "An error occurred while deleting the property.")
  }
}
fetchProperty()
</script>
