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
        //componer un nuevo objeto que combine las propiedades del pago registro y según su categoria, añada las propiedades de la categoria como el color y el icono.
        registrosCategorias(state, getters, rootState) {
            return state.registros.map((item) => {
                const categorial = rootState.categorias.categorias.find(
                    (categoria) => categoria.id === item.categoria.id
                );
                return {
                    tipo: item.tipo,
                    monto: item.monto,
                    cuentaOrigen: item.cuentaOrigen,
                    cuentaDestino: item.cuentaDestino,
                    nota: item.nota,
                    beneficiado: item.beneficiado,
                    etiqueta: item.etiqueta,
                    fecha: item.fecha,
                    hora: item.hora,
                    color: categorial.color,
                    categoria: item.categoria.nombre,
                    icono: item.categoria.icono,
                    id: item.id,
                };
            });
        },
    },
    mutations: {
        setCategoriaSeleccionada(state, payload) {
            state.registro.categoria = payload;
        },
        setRegistros(state, payload) {
            state.registros = payload;
        },
        setRegistro(state, payload) {
            state.registro = payload;
        },
    },
    actions: {
        getCategoriaSeleccionada({ commit }, subcategoria) {
            commit("setCategoriaSeleccionada", subcategoria);
            router.push("/crearregistro");
        },
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
                    console.log("Registro leidos correctamente");
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
        editarRegistro({ commit }, registro) {
            db.collection("registros")
                .doc(registro.id)
                .update({
                    tipo: registro.tipo,
                    monto: registro.monto,
                    categoria: registro.categoria,
                    cuentaOrigen: registro.cuentaOrigen,
                    cuentaDestino: registro.cuentaDestino,
                    fecha: registro.fecha,
                    beneficiado: registro.beneficiado,
                    nota: registro.nota,
                    etiqueta: registro.etiqueta,
                })
                .then(() => {
                    console.log("Registro editado correctamente");
                    router.push("/registros");
                });
        },
        agregarRegistro({ dispatch, state, commit, getters, rootGetters }, nuevo) {
            db.collection("registros")
                .add({
                    tipo: nuevo.tipo,
                    monto: nuevo.monto,
                    cuentaOrigen: nuevo.cuentaOrigen,
                    cuentaDestino: nuevo.cuentaDestino,
                    fecha: nuevo.fecha,
                    hora: nuevo.hora,
                    beneficiado: nuevo.beneficiado,
                    nota: nuevo.nota,
                    etiqueta: nuevo.etiqueta,
                    categoria: state.registro.categoria,
                })
                .then((doc) => {
                    console.log("Registro agregado correctamente:", nuevo);
                    router.push("/registros");

                    //Despachar la accion para que se actualice el saldo en el módulo de cuentas.
                    dispatch("cuentas/actualizarSaldo", nuevo, { root: true });
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