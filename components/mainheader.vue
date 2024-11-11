<template>
  <div id="header">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="/">
          <img src="/assets/pictures/logo2.png" width="155" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/properties/pages/1">All Rental</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contactus" @click.prevent="handleContactUs">Contact Us</a>
            </li>
          </ul>
          <div class="d-flex">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a v-if="!session.data?.user" class="nav-link" href="/users/signin">
                  <svg class="someright" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M13.033 2v-2l10 3v18l-10 3v-2h-9v-7h1v6h8v-18h-8v7h-1v-8h9zm1 20.656l8-2.4v-16.512l-8-2.4v21.312zm-3.947-10.656l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z" />
                  </svg>
                  Login
                </a>
                <a v-else class="nav-link" href="/users/signout"> ({{ session.data?.user.email }}) Logout </a>
              </li>
              <li class="nav-item">
                <a v-if="!session.data?.user" class="btn btnnew" href="/users/property/add" @click.prevent="handleAddRental">Add Rental</a>
                <a v-else class="btn btnnew" href="/users/property/myproperties" @click.prevent="handleAddRental">My Rental</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
const session = useSession()
import { onMounted } from "vue"

onMounted(() => {
  const script = document.createElement("script")
  script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  script.onload = () => {
    // Your custom logic here, if needed
  }
  document.head.appendChild(script)
})

const handleAddRental = () => {
  const user = getUser()

  console.log("isUserLoggedIn =" + user)
  if (user != null) {
    window.location.href = "/users/property/myproperties"
  } else {
    window.location.href = "/users/signin"
  }
}
const handleContactUs = () => {
  // Your custom logic here (e.g., navigation programmatically, API call, etc.)
  console.log("Contact us button clicked")

  const user = getUser()

  console.log("isUserLoggedIn =" + user)
  if (user != null) {
    window.location.href = "/contactus"
  } else {
    window.location.href = "/users/signin"
  }
}
</script>
