export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'table',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "bulma",
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  loading: './components/Loader.vue',


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/vee-validate.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "vee-validate/dist/rules"
    ],
    loaders: {
      cssModules: {
        modules: {
          localIdentName: "[local]--[Frida]_[hash:base64:4]",
        }
      }
    }
  }
}
