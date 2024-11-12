<template>
  <div>
    <section class="loginform">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1>Forgot Password</h1>
          </div>

          <div class="col-md-8 offset-md-2">
            <div class="alert alert-primary" role="alert">Please enter the email address associated with your account, and we will send you a password reset link via email.</div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="email" />
            </div>

            <button @click.prevent="forgotpassword" type="submit" class="btn btn-primary">Submit</button>
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

const forgotpassword = async () => {
  if (email.value) {
    const { data, error } = await useFetch(runtimeConfig.public.apiBase + "auth/forgotpassword", {
      method: "post",
      body: {
        email: email.value
      }
    })

    if (data.value) {
      alert("Please check your email to reset password!")
      window.location.pathname = "/"
    } else if (error.value) {
      alert(error.value.data.message)
    }
  } else {
    alert("Please fill in all the fields!")
  }
}
</script>
