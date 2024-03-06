import "@/assets/css/global.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as MdIcons from "oh-vue-icons/icons/md";
import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router";
import { store } from "./store";
import HighchartsVue from "highcharts-vue";

const Md = Object.values({ ...MdIcons });
addIcons(...Md);

const app = createApp(App);

app.component("VIcon", OhVueIcon);

app.use(store);
app.use(router);
app.use(HighchartsVue as any);
app.mount("#app");
