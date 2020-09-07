import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Navbar from "@/components/Navbar.vue";
import BotonFlotante from "@/components/BotonFlotante.vue";
import Toolbar from "@/components/Toolbar.vue";

Vue.component("Navbar", Navbar);
Vue.component("BotonFlotante", BotonFlotante);
Vue.component("Toolbar", Toolbar);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");