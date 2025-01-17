import Vue from 'vue'
import App from './App.vue'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
console.log('ElementUI',ElementUI)


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
