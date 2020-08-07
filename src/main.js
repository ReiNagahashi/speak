// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueChatScroll from 'vue-chat-scroll'
import AnimateCSS from 'animate.css'
// ANIMATION
import vWow from 'v-wow'
import VueKinesis from 'vue-kinesis'
import AOS from 'aos'
import 'aos/dist/aos.css';
Vue.use(VueKinesis)
Vue.use(AnimateCSS)
Vue.use(vWow);

// LOADING ANIMATION
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
Vue.use(VueProgress)

// VALIDATION
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// Time stamp for chat
Vue.use(require('vue-moment'));

// Vue scroll
Vue.use(VueChatScroll)

// SASS
require('@/assets/sass/main.scss')

Vue.config.productionTip = false


let app = null

firebase.auth().onAuthStateChanged(() => {
if(!app){
    app = new Vue({
      router,
      components: { App },
      validations: {},
      created () {
        AOS.init()
        
      },
      render: h => h(App)
        }).$mount('#app')
  }
})

