<template>
  <div>
    <section class="loginform">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1>Reset Password</h1>
          </div>

          <div class="col-md-8 offset-md-2">
            <div class="form-group">
              <label>Password</label>
              <input type="password" v-model="password" class="form-control" />
            </div>

            <button @click.prevent="resetpassword" type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const password = ref("")
const token = route.query.token

const resetpassword = async () => {
  if (password.value && token) {
    const { data, error } = await useFetch(runtimeConfig.public.apiBase + "auth/reset-password", {
      method: "post",
      body: {
        token: token,
        newPassword: password.value
      }
    })

    if (data.value) {
      alert("Password Reset Successfully!")
      window.location.pathname = "/users/signin"
    } else if (error.value) {
      alert(error.value.data.message)
    }
  } else {
    alert("Please fill in all the fields!")
  }
}
</script>
