import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";
import router from "../router";
import registros from "./registros";
import categorias from "./categorias";
import cuentas from "./cuentas";
import programados from "./programados";
import beneficiados from "./beneficiados";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { registros, categorias, cuentas, programados, beneficiados },
});