import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import './index.css'
// import VueApexCharts from "vue3-apexcharts";


const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        }
      },
  components,
  directives,
})

const app = createApp(App)

// app.use(VueApexCharts);
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
