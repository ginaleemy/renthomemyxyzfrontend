<template>
  <div>
    <section id="intro">
      <div class="jumbotron contact">
        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <div class="cinner">
              <h1>Contact Us</h1>
              <hr />
              <p>
                Gina Lee Demo Address<br />
                Phone: (60) 0187683191
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contactcontent">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h3>Contact Us</h3>
            <p>For any inquiries, feel free to call or email us.</p>
            <p><i class="fas fa-phone"></i> Phone: (60) 0187683191</p>
            <p><i class="fas fa-envelope"></i> Email: <a href="mailto:xxx@gmail.com">ginalee1029@gmail.com</a></p>
          </div>
          <div class="col-md-8">
            <h3>Inquiry Form</h3>
            <form @submit.prevent="createContactUs">
              <div class="form-group">
                <input type="text" v-model="name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Your Name" required />
              </div>
              <div class="form-group">
                <input type="text" v-model="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Your Email" required />
              </div>
              <div class="form-group">
                <input type="text" v-model="phone" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Your Phone" required />
              </div>
              <div class="form-group">
                <textarea class="form-control" v-model="message" aria-label="With textarea" placeholder="Your Message" required></textarea>
              </div>
              <button @click.prevent="createContactUs" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const user = getUser()

const name = ref("")
const email = ref("")
const phone = ref(null)
const message = ref(null)

const createContactUs = async () => {
  try {
    const { data, error } = await useFetch(runtimeConfig.public.apiBase + "contactus", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user?.accessToken
      },
      body: {
        name: name.value,
        email: email.value,
        phone: phone.value,
        message: message.value
      }
    })
    console.log(data.value)
    if (data.value) {
      alert("Your Message Successfully Sent!")
      // Reset form fields or perform any other necessary actions
      window.location.href = "/"
    }
  } catch (error) {
    alert(error.data.message)
  }
}
</script>
