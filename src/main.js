import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// tailwind 
import './assets/style.css'

// font awesome import
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { dom } from "@fortawesome/fontawesome-svg-core";

const pinia = createPinia()
const app = createApp(App)

// font awesome add
library.add(fas)
library.add(fab)
library.add(far)
dom.watch()

app.use(pinia)
app.mount('#app')
app.component("font-awesome-icon", FontAwesomeIcon)