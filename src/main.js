import Vue from "vue";
import App from "./App.vue";
import Cloudbase from "@cloudbase/vue-provider";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 注意更新此处的TCB_ENV_ID为你自己的环境ID
window._tcbEnv = window._tcbEnv || {TCB_ENV_ID: "robin-4g8t276zfdd0395e", TCB_REGION: "ap-shanghai"};

export const envId = window._tcbEnv.TCB_ENV_ID;
export const region = window._tcbEnv.TCB_REGION;

Vue.config.productionTip = false;

Vue.use(Cloudbase, {
  env: envId,
  region: region
});

Vue.use(ElementUI);

new Vue({
  render: h => h(App)
}).$mount("#app");
