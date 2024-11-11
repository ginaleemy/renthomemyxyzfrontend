<template>
  <div>
    <section class="loginform">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1>{{ blogs }}</h1>
          </div>

          <div class="col-md-8 offset-md-2">
            <button @click.prevent="showprotected" type="submit" class="btn btn-primary">Show protected content</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const blogs = ref([])
const user = getUser()

const showprotected = async () => {
  const { data, error } = await useFetch(runtimeConfig.public.apiBase + "posts/protected", {
    method: "get",
    headers: {
      Authorization: "Bearer " + user?.accessToken
    }
    /*  body:{
                    "email": email.value,
                    "password": password.value
                } */
  })

  if (data.value) {
    alert("Success!")
    blogs.value = data.value
  } else if (error.value) {
    alert(error.value.data.message)
  }
}
</script>
