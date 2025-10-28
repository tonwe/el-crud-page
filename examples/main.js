import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

// 关闭开发模式提示
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  render: h => h(App)
}).$mount('#app');
