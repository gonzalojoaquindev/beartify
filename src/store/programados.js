import { db } from "../firebase";
import router from "../router";
import categorias from "./categorias";
export default {
    namespaced: true,
    state: {
        programados: [],
        programado: {
            monto: "",
            moneda: "",
            tipo: "",
            categoria: "",
            cuentaOrigen: "",
            cuentaDestino: "",
            fecha: "",
            notas: "",
            beneficiado: "",
            etiqueta: "",
            frecuencia: "",
            repetir: "",
            cada: "",
            seguir: { nombre: "", eventos: "" },
            recordar: "",
        },

    },
    getters: {
        //componer un nuevo objeto que combine las propiedades del pago programado y según su categoria, añada las propiedades de la categoria como el color y el icono.
        pagosProgramados(state, getters, rootState) {
            return state.programados.map((item) => {
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
                    frecuencia: item.frecuencia,
                    repetir: item.repetir,
                    cada: item.cada,
                    /*           seguir: { nombre: item.seguir.nombre, evento: item.seguir.evento }, */
                    recordar: item.recordar,
                    color: categorial.color,
                    categoria: categorial.nombre,
                    icono: categorial.icono,
                    id: item.id
                };
            });
        },

    },
    mutations: {
        setProgramados(state, payload) {
            state.programados = payload;
        },
        setProgramado(state, payload) {
            state.programado = payload;
        },

    },
    actions: {
        getProgramados({ commit }) {
            const programados = [];
            db.collection("programados")
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        let programado = doc.data();
                        programado.id = doc.id;
                        programados.push(programado);
                    });
                    commit("setProgramados", programados);
                    console.log("Pagos programados leidos correctamente");
                });
        },
        getProgramado({ commit }, idProgramado) {
            db.collection("programados")
                .doc(idProgramado)
                .get()
                .then((doc) => {
                    console.log("Pago programado leido correctamente");
                    let programado = doc.data();
                    programado.id = doc.id;
                    commit("setProgramado", programado);
                });
        },
        editarProgramado({ commit }, programado) {
            db.collection("programados")
                .doc(programado.id)
                .update({
                    tipo: programado.tipo,
                    monto: programado.monto,
                    categoria: programado.categoria,
                    cuentaOrigen: programado.cuentaOrigen,
                    cuentaDestino: programado.cuentaDestino,
                    fecha: programado.fecha,
                    beneficiado: programado.beneficiado,
                    nota: programado.nota,
                    etiqueta: programado.etiqueta,
                    frecuencia: programado.frecuencia,
                    repetir: programado.repetir,
                    cada: programado.cada,
                    seguir: { nombre: programado.seguir.nombre, evento: programado.seguir.evento },
                    recordar: programado.recordar,
                })
                .then(() => {
                    console.log("Pago programado editado correctamente");
                    router.push("/pagosprogramados");
                });
        },
        agregarProgramado({ commit }, nuevo) {
            db.collection("programados")
                .add({
                    tipo: nuevo.tipo,
                    monto: nuevo.monto,
                    categoria: nuevo.categoria,
                    cuentaOrigen: nuevo.cuentaOrigen,
                    cuentaDestino: nuevo.cuentaDestino,
                    fecha: nuevo.fecha,

                    beneficiado: nuevo.beneficiado,
                    nota: nuevo.nota,
                    etiqueta: nuevo.etiqueta,
                    frecuencia: nuevo.frecuencia,
                    repetir: nuevo.repetir,
                    cada: nuevo.cada,
                    seguir: { nombre: nuevo.seguir.nombre, evento: nuevo.seguir.evento },
                    recordar: nuevo.recordar,
                })
                .then((doc) => {
                    console.log("Pago programado agregado correctamente");
                    router.push("/pagosprogramados");
                });
        },
        eliminarProgramado({ commit }, idProgramado) {
            db.collection("programados")
                .doc(idProgramado)
                .delete()
                .then(() => {
                    console.log("Pago programado eliminado correctamente");
                    router.push("/pagosprogramados");
                });
        },
    },
};