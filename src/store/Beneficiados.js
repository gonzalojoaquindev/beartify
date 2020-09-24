import { db } from "../firebase";
import router from "../router";
export default {
    namespaced: true,
    state: {
        beneficiados: [],
        beneficiado: {
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
        },
    },
    mutations: {
        setBeneficiados(state, payload) {
            state.beneficiados = payload;
        },
        setBeneficiado(state, payload) {
            state.beneficiado = payload;
        },

    },
    actions: {
        getBeneficiados({ commit }) {
            const beneficiados = [];
            db.collection("beneficiados")
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        let beneficiado = doc.data();
                        beneficiado.id = doc.id

                        beneficiados.push(beneficiado);
                    });
                    commit("setBeneficiados", beneficiados);
                    console.log("Beneficiado leidas correctamente");
                });
        },
        getBeneficiado({ commit }, idBeneficiado) {
            db.collection("beneficiados")
                .doc(idBeneficiado)
                .get()
                .then((doc) => {
                    console.log("Beneficiado leida correctamente");
                    let beneficiado = doc.data();
                    beneficiado.id = doc.id;
                    commit("setBeneficiado", beneficiado);
                });
        },
        editarBeneficiado({ commit }, beneficiado) {
            db.collection("beneficiados")
                .doc(beneficiado.id)
                .update({
                    tipo: beneficiado.tipo,
                    monto: beneficiado.monto,
                    categoria: beneficiado.categoria,
                    cuentaOrigen: beneficiado.cuentaOrigen,
                    cuentaDestino: beneficiado.cuentaDestino,
                    fecha: beneficiado.fecha,
                    hora: beneficiado.hora,
                    beneficiado: beneficiado.beneficiado,
                    nota: beneficiado.nota,
                })
                .then(() => {
                    console.log(" Beneficiado editada correctamente");
                    router.push("/beneficiados");
                });
        },
        agregarBeneficiado({ commit }, nuevo) {
            db.collection("beneficiados")
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
                })
                .then((doc) => {
                    console.log("Beneficiado agregada correctamente");
                    router.push("/beneficiados");
                });
        },
        eliminarBeneficiado({ commit }, idBeneficiado) {
            db.collection("beneficiados")
                .doc(idBeneficiado)
                .delete()
                .then(() => {
                    console.log("Beneficiado eliminada correctamente");
                    router.push("/beneficiados");
                });
        },
    },
};