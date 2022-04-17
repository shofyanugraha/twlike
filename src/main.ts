import '@/assets/scss/app.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Vue3Mq } from 'vue3-mq'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timeZone from 'dayjs/plugin/timezone'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisV, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faEllipsisV, faTrash)

import 'virtual:windi.css'

import App from './App.vue'
import router from './router'

dayjs.extend(relativeTime)
dayjs.extend(timeZone)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Vue3Mq)
app.provide('enable-route-transitions', true)
app.config.globalProperties.$dayjs = dayjs
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
