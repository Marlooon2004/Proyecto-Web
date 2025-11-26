import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css'
// Bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createI18n } from 'vue-i18n'

import es from './locales/es.json'
import en from './locales/en.json'

import './assets/styles/globals.css'

const savedLocale = localStorage.getItem('locale') || 'es'

const i18n = createI18n({
  legacy: false, //
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { es, en},
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n) //

app.mount('#app')
