import { db } from "../firebase";
import router from "../router";
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
            hora: "",
            notas: "",
            beneficiado: "",
            etiqueta: "",
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
                        programado.push(programados);
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
                    hora: programado.hora,
                    beneficiado: programado.beneficiado,
                    nota: programado.nota,
                    etiqueta: programado.etiqueta,
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
                    hora: nuevo.hora,
                    beneficiado: nuevo.beneficiado,
                    nota: nuevo.nota,
                    etiqueta: nuevo.etiqueta,
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