// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        // Fonts and Font Awesome
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Noto+Sans+TC|Open+Sans&display=swap" },
        // Bootstrap CSS
        { rel: "stylesheet", href: "/css/bootstrap.min.css" }
      ]
    }
  },
  css: ["~/assets/css/style.css", "~/assets/css/icons.css", "~/assets/css/fontawesome.css"],
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.APIBASE,
      stripePubishKey: process.env.STRIPE_PUBLISHABLE_KEY,
      stripeTestKey: process.env.STRIPE_TEST_KEY
    }
  }
})
