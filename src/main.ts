import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./route";
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import { useBlacklistStore } from "./blacklist/store/blacklistStore";

const app = createApp(App);
const pinia = createPinia();

app.use(ArcoVue);
app.use(pinia);
app.use(router);

// 初始化blacklist store的缓存
const blacklistStore = useBlacklistStore();
blacklistStore.initialize();

app.mount("#app");
