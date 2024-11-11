<template>
  <div>
    <section class="loginform">
      <div class="container">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="alert alert-primary" role="alert">Don't have an account?<a href="/users/register"> Click here</a> Register</div>
          </div>

          <div class="col-md-12 text-center">
            <h1>Login</h1>
          </div>

          <div class="col-md-8 offset-md-2">
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <small id="emailHelp" class="form-text text-muted">Forgot Password?<a href="/users/forgotpassword">Click here</a> Reset Password</small>
            <button @click.prevent="login" type="submit" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["noauth"]
})

const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const email = ref("")
const password = ref("")

const login = async () => {
  if (email.value && password.value) {
    const { data, error } = await useFetch(runtimeConfig.public.apiBase + "auth/login", {
      method: "post",
      body: {
        email: email.value,
        password: password.value
      }
    })

    if (data.value) {
      alert("Login Success!")
      useSetSession(data.value)
      window.location.pathname = "/"
    } else if (error.value) {
      alert(error.value.data.message)
    }
  } else {
    alert("Please fill in all the fields!")
  }
}
</script>
