import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";
import router from "../router";
import registros from "./registros";
import categorias from "./categorias";
import cuentas from "./cuentas";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { registros, categorias, cuentas },
});