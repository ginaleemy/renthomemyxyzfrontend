<template>
  <div>
    <section class="loginform">
      <div class="container">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="alert alert-primary" role="alert">Already have an account?<a href="/users/signin">Click Here</a>Login</div>
          </div>

          <div class="col-md-12 text-center">
            <h1>Register</h1>
          </div>

          <div class="col-md-8 offset-md-2">
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="email" class="form-control" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" v-model="password" class="form-control" />
            </div>
            <small id="emailHelp" class="form-text text-muted">*When you click Register, you agree to <a href="">accept our Terms of Use</a></small>
            <button @click.prevent="register" type="submit" class="btn btn-primary">Register</button>
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

const register = async () => {
  if (email.value && password.value) {
    const { data, error } = await useFetch(runtimeConfig.public.apiBase + "auth/register", {
      method: "post",
      body: {
        email: email.value,
        password: password.value
      }
    })

    if (data.value) {
      alert("Registration Success! Please check your inbox to verify your account!")
      window.location.href = "/"
    } else if (error.value) {
      alert(error.value.data.message)
      /*  if (error.value.data.message.indexOf('minimum allowed length')!= -1){
                    alert('Your password need longer!')
                }
              */
    }
  } else {
    alert("Please fill in all the fields!")
  }
}
</script>
