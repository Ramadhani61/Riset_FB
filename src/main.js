import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import styles from './assets/styles.css'
// import tailwind from '../public/assets/tailwind.min.css'
// import game from './scripts/game.js'

Vue.config.productionTip = false

new Vue({
  vuetify,
  styles,
  render: h => h(App)
  // tailwind,
  // game,
}).$mount('#app')
