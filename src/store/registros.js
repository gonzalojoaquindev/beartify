import { db } from "../firebase";
import router from "../router";
export default {
    namespaced: true,
    state: {
        registros: [],
        registro: {
            monto: "",
            moneda: "",
            tipo: "",
            categoria: "",
            cuenta: "",
            fecha: "",
            hora: "",
            notas: "",
            beneficiado: "",
        },
    },
    mutations: {
        setRegistros(state, payload) {
            state.registros = payload;
        },
        setRegistro(state, payload) {
            state.registro = payload;
        },

        setCategorias(state, payload) {
            state.categorias = payload;
        },
        setCategoria(state, payload) {
            state.categoria = payload;
        },
    },
    actions: {
        getRegistros({ commit }) {
            const registros = [];
            db.collection("registros")
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        console.log("registros leidos correctamente");
                        let registro = doc.data();
                        registro.id = doc.id;
                        registros.push(registro);
                    });
                    commit("setRegistros", registros);
                });
        },
        getRegistro({ commit }, idRegistro) {
            db.collection("registros")
                .doc(idRegistro)
                .get()
                .then((doc) => {
                    console.log("registro leido correctamente");
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
                    cuenta: registro.cuenta,
                    fecha: registro.fecha,
                    hora: registro.hora,
                    beneficiado: registro.beneficiado,
                    nota: registro.nota,
                })
                .then(() => {
                    console.log("registro editado correctamente");
                    router.push("/registros");
                });
        },
        agregarRegistro({ commit }, nuevo) {
            db.collection("registros")
                .add({
                    tipo: nuevo.tipo,
                    monto: nuevo.monto,
                    categoria: nuevo.categoria,
                    cuenta: nuevo.cuenta,
                    fecha: nuevo.fecha,
                    hora: nuevo.hora,
                    beneficiado: nuevo.beneficiado,
                    nota: nuevo.nota,
                })
                .then((doc) => {
                    console.log("registro agregado correctamente");
                    router.push("/registros");
                });
        },
        eliminarRegistro({ commit }, idRegistro) {
            db.collection("registros")
                .doc(idRegistro)
                .delete()
                .then(() => {
                    console.log("registro eliminado correctamente");
                    router.push("/registros");
                });
        },
    },
};