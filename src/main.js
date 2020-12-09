import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from "./store";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import firebase from "firebase";
var firebaseConfig = {
  apiKey: process.env.VUE_APP_ENV_FIRE_BASE_KEY,
  authDomain: "vue-managers-ac712.firebaseapp.com",
  projectId: "vue-managers-ac712",
  storageBucket: "vue-managers-ac712.appspot.com",
  messagingSenderId: "427923273393",
  appId: "1:427923273393:web:c985e5601113a711f8d490"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(async user => {
  await store.dispatch("fetchUser", user);
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
