<template>
  <div>
    <section class="loginform">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1>Verifying your email...</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const email = ref("")
const password = ref("")

const verifyemail = async () => {
  const { data, error } = await useFetch(runtimeConfig.public.apiBase + "auth/verifyemail?token=" + route.query.token)

  if (data.value) {
    alert("Registration Success! You can now login")
    window.location.href = "/users/signin"
  } else if (error.value) {
    alert(error.value.data.message)
  }
}

if (route.query.token) {
  verifyemail()
}
</script>
