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
            institucion: "",
            moneda: "",
            numero: "",
            tipo: "",
            cupo: "",
            vencimiento: "",
            utilizado: "",
            saldo: "",
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
        //obtener todas las cuentas desde firestore
        getCuentas({ commit }) {
            const cuentas = [];
            db.collection("cuentas")
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        let cuenta = doc.data();
                        cuenta.id = doc.id;
                        cuentas.push(cuenta);
                    });

                    //consolidar información traida desde firestore con la información local.
                    commit("setCuentas", cuentas);
                    console.log("cuentas leidas correctamente");
                });
        },

        actualizarSaldo({ dispatch, state, commit, getters }, nuevo) {
            const monto = parseInt(nuevo.monto, 10);
            let saldoNuevoOrigen = null;
            let saldoNuevoDestino = null;

            //Si es un ingreso
            if (nuevo.tipo === 0) {
                //Obtener los datos de la cuenta de destino
                const destino = state.cuentas.find(
                    (element) => element.nombre === nuevo.cuentaDestino
                );
                const cuentaDestinoId = db.collection("cuentas").doc(destino.id);

                const saldoActualDestino = parseInt(destino.saldo, 10);

                saldoNuevoDestino = saldoActualDestino + monto;

                cuentaDestinoId
                    .update({
                        saldo: saldoNuevoDestino,
                    })
                    .then(() => {
                        console.log(
                            "saldo de cuenta destino: ",
                            nuevo.cuentaDestino,
                            "actualizado correctamente, saldo anterior: ",
                            saldoActualDestino,
                            "nuevo saldo: ",
                            saldoNuevoDestino
                        );
                    });

                //Si es un gasto
            } else if (nuevo.tipo === 1) {
                //Obtener los datos de la cuenta en que se realizó el registro.
                const origen = state.cuentas.find(
                    (element) => element.nombre === nuevo.cuentaOrigen
                );
                const cuentaOrigenId = db.collection("cuentas").doc(origen.id);
                const saldoActualOrigen = parseInt(origen.saldo, 10);
                saldoNuevoOrigen = saldoActualOrigen - monto;

                cuentaOrigenId
                    .update({
                        saldo: saldoNuevoOrigen,
                    })
                    .then(() => {
                        console.log(
                            "saldo de cuenta origen",
                            nuevo.cuentaOrigen,
                            "actualizado correctamente, saldo anterior:",
                            saldoActualOrigen,
                            "nuevo saldo",
                            saldoNuevoOrigen
                        );
                    });
                //si es una transferencia
            } else {
                saldoNuevoOrigen = saldoActualOrigen + monto;
                saldoNuevoDestino = saldoActualDestino + monto;

                cuentaOrigenId
                    .update({
                        saldo: saldoNuevoOrigen,
                    })
                    .then(() => {
                        console.log(
                            "saldo de cuenta origen actualizado correctamente, saldo anterior:",
                            saldoActual,
                            "nuevo saldo",
                            nuevoSaldo,
                            "registro:",
                            nuevo
                        );
                    });
                cuentaDestinoId
                    .update({
                        saldo: saldoNuevoDestino,
                    })
                    .then(() => {
                        console.log(
                            "saldo de cuenta destino actualizado correctamente, saldo anterior:",
                            saldoActual,
                            "nuevo saldo",
                            nuevoSaldo,
                            "registro:",
                            nuevo
                        );
                    });
            }
        },
    },

    //obtener una cuenta en particular  a traves de su ID.
    getCuenta({ commit }, idCuenta) {
        db.collection("cuentas")
            .doc(idCuenta)
            .get()
            .then((doc) => {
                console.log("categoria leida correctamente");
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
                institucion: cuenta.institucion,
                tipo: cuenta.tipo,
                moneda: cuenta.moneda,
                numero: cuenta.numero,
                cupo: cuenta.cupo,
                vencimiento: cuenta.vencimiento,
                saldo: cuenta.saldo,
            })
            .then(() => {
                console.log("cuenta editada correctamente");
                router.push("/cuentas");
            });
    },
    agregarCuenta({ commit }, nuevo) {
        db.collection("cuentas")
            .add({
                icono: nuevo.icono,
                nombre: nuevo.nombre,
                institucion: nuevo.institucion,
                tipo: nuevo.tipo,
                color: nuevo.color,
                moneda: nuevo.moneda,
                numero: nuevo.numero,
                saldo: nuevo.saldo,
                vencimiento: nuevo.vencimiento,
                cupo: nuevo.cupo,
            })
            .then((doc) => {
                console.log("cuenta agregada correctamente");
                router.push("/cuentas");
            });
    },
    eliminarCuenta({ commit }, idCuenta) {
        db.collection("cuentas")
            .doc(idCuenta)
            .delete()
            .then(() => {
                console.log("cuenta eliminada correctamente");
                router.push("/cuentas");
            });
    },
};