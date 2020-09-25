import { db } from "../firebase";
import router from "../router";
import categorias from "./categorias";
export default {
    namespaced: true,
    state: {
        registros: [],
        registro: {
            monto: "",
            moneda: "",
            tipo: "",
            categoria: "",
            cuentaOrigen: "",
            cuentaDestino: "",
            fecha: "",
            hora: "",
            notas: "",
            beneficiado: "",
            etiqueta: "",
        },
    },
    getters: {
        //componer un nuevo objeto que combine las propiedades del registro y según su categoria, añada las propiedades de la categoria como el color y el icono.
        registros(state, getters, rootState) {
            return state.registros.map((item) => {
                const categorial = rootState.categorias.categorias.find(
                    (categoria) => categoria.nombre === item.categoria
                );
                return {
                    tipo: item.tipo,
                    monto: item.monto,
                    cuentaOrigen: item.cuentaOrigen,
                    cuentaDestino: item.cuentaDestino,
                    nota: item.nota,
                    beneficiado: item.beneficiado,
                    etiquetas: item.etiquetas,
                    fecha: item.fecha,
                    id: item.id,
                    color: categorial.color,
                    categoria: categorial.nombre,
                    icono: categorial.icono,
                };
            });
        },
    },

    mutations: {
        setRegistros(state, payload) {
            state.registros = payload;
        },
        setRegistro(state, payload) {
            state.registro = payload;
        },
    },
    actions: {
        getRegistros({ commit }) {
            const registros = [];
            db.collection("registros")
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        let registro = doc.data();
                        registro.id = doc.id;
                        registros.push(registro);
                    });
                    commit("setRegistros", registros);
                    console.log("Registros leidos correctamente");
                });
        },
        getRegistro({ commit }, idRegistro) {
            db.collection("registros")
                .doc(idRegistro)
                .get()
                .then((doc) => {
                    console.log("Registro leido correctamente");
                    let registro = doc.data();
                    registro.id = doc.id;
                    commit("setRegistro", registro);
                });
        },
        editarRegistro({ commit }, item) {
            db.collection("registros")
                .doc(item.id)
                .update({
                    tipo: item.tipo,
                    monto: item.monto,
                    categoria: item.categoria,
                    cuentaOrigen: item.cuentaOrigen,
                    cuentaDestino: item.cuentaDestino,
                    fecha: item.fecha,
                    beneficiado: item.beneficiado,
                    nota: item.nota,
                    etiqueta: item.etiqueta,
                })
                .then(() => {
                    console.log("Registro editado correctamente");
                    router.push("/registros");
                });
        },
        agregarRegistro({ commit }, nuevo) {
            db.collection("registros")
                .add({
                    tipo: nuevo.tipo,
                    monto: nuevo.monto,
                    categoria: nuevo.categoria,
                    cuentaOrigen: nuevo.cuentaOrigen,
                    cuentaDestino: nuevo.cuentaDestino,
                    fecha: nuevo.fecha,
                    hora: nuevo.hora,
                    beneficiado: nuevo.beneficiado,
                    nota: nuevo.nota,
                    etiqueta: nuevo.etiqueta,
                })
                .then((doc) => {
                    console.log("Registro agregado correctamente");
                    router.push("/registros");
                });
        },
        eliminarRegistro({ commit }, idRegistro) {
            db.collection("registros")
                .doc(idRegistro)
                .delete()
                .then(() => {
                    console.log("Registro eliminado correctamente");
                    router.push("/registros");
                });
        },
    },
};