import { db } from "../firebase";
import router from "../router";
export default {
    namespaced: true,
    state: {
        cuentas: [],
        cuenta: {
            nombre: "",
            icono: "",
            color: "",
        },
    },
    mutations: {
        setCuentas(state, payload) {
            state.cuentas = payload;
        },
        setCuenta(state, payload) {
            state.cuenta = payload;
        },
    },
    actions: {
        getCuentas({ commit }) {
            const cuentas = [];
            db.collection("cuentas")
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        console.log("cuenta", doc.id);
                        let cuenta = doc.data();
                        cuenta.id = doc.id;
                        cuentas.push(cuenta);
                    });
                    commit("setCuentas", cuentas);
                });
        },
        getCuenta({ commit }, idCuenta) {
            db.collection("cuentas")
                .doc(idCuenta)
                .get()
                .then((doc) => {
                    console.log(doc.id);
                    let cuenta = doc.data();
                    cuenta.id = doc.id;
                    commit("setCuenta", cuenta);
                });
        },
        editarCuenta({ commit }, cuenta) {
            db.collection("cuentas")
                .doc(cuenta.id)
                .update({
                    nombre: cuenta.nombre,
                    icono: cuenta.icono,
                    color: cuenta.color,
                })
                .then(() => {
                    console.log("cuenta editada");
                    router.push("/cuentas");
                });
        },
        agregarCuenta({ commit }, nuevo) {
            db.collection("cuentas")
                .add({
                    nombre: nuevo.nombre,
                    icono: nuevo.icono,
                    color: nuevo.color,
                })
                .then((doc) => {
                    console.log(doc.id);
                    router.push("/cuentas");
                });
        },
        eliminarCuenta({ commit }, idCuenta) {
            db.collection("cuentas")
                .doc(idCuenta)
                .delete()
                .then(() => {
                    console.log("cuenta eliminada");
                    router.push("/cuentas");
                });
        },
    },
};