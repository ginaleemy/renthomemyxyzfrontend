<template>
  <div>
    <section class="dashboard">
      <div class="container-fluid">
        <div class="row">
          <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block">
            <div class="sidebar-sticky">
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
              <h3>Rental Property Listings</h3>

              <ol class="list-group">
                <li v-if="!properties || properties.length === 0" class="list-group-item">No records</li>
                <li v-else v-for="(property, index) in properties" :key="property._id" :class="['list-group-item', { 'selected-item': selectedIndex === index }]" @click="selectedIndex = index">
                  {{ property.title }} in {{ property.states }} added on {{ formatDate(property.createdAt) }}
                  <a :href="'/users/property/' + property._id" style="float: right">Edit</a>
                </li>
              </ol>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const user = getUser()
const runtimeConfig = useRuntimeConfig()
const properties = ref([])
const selectedIndex = ref()

definePageMeta({
  middleware: ["auth"]
})

onMounted(async () => {
  setTimeout(async () => {
    await fetchData()
  }, 100)
})

const fetchData = async () => {
  const { data, error } = await useFetch(runtimeConfig.public.apiBase + "properties/myproperties", {
    headers: {
      Authorization: "Bearer " + user?.accessToken
    }
  })

  if (data.value) {
    console.log(data.value)
    properties.value = data.value
  }

  if (error.value) {
    if (error.value.status === 401) {
      // Handle the 401 error specifically
      alert("Session Timeout! Please login again!")
      // Optionally, you could redirect to the login page:
      useSetSession(null)
    } else {
      console.error(error.value)
      alert("Session Timeout! please retry login again!")
      useSetSession(null)
    }
    window.location.href = "/"
  }
}
</script>
