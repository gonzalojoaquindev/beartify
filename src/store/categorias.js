import { db } from "../firebase";
import router from "../router";
export default {
    namespaced: true,
    state: {
        categorias: [],
        categoria: {
            nombre: "",
            icono: "",
            color: "",
        },
    },
    mutations: {
        setCategorias(state, payload) {
            state.categorias = payload;
        },
        setCategoria(state, payload) {
            state.categoria = payload;
        },
    },
    actions: {
        getCategorias({ commit }) {
            const categorias = [];
            db.collection("categorias")
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        console.log("categoria", doc.id);
                        let categoria = doc.data();
                        categoria.id = doc.id;
                        categorias.push(categoria);
                    });
                    commit("setCategorias", categorias);
                });
        },
        getCategoria({ commit }, idCategoria) {
            db.collection("categorias")
                .doc(idCategoria)
                .get()
                .then((doc) => {
                    console.log(doc.id);
                    let categoria = doc.data();
                    categoria.id = doc.id;
                    commit("setCategoria", categoria);
                });
        },
        editarCategoria({ commit }, categoria) {
            db.collection("categorias")
                .doc(categoria.id)
                .update({
                    nombre: categoria.nombre,
                    icono: categoria.icono,
                    color: categoria.color,
                })
                .then(() => {
                    console.log("categoria editada");
                    //  router.push("/categorias");
                });
        },
        agregarCategoria({ commit }, nuevo) {
            db.collection("categorias")
                .add({
                    nombre: nuevo.nombre,
                    icono: nuevo.icono,
                    color: nuevo.color,
                })
                .then((doc) => {
                    console.log(doc.id);
                    router.push("/categorias");
                });
        },
        eliminarCategoria({ commit }, idCategoria) {
            db.collection("categorias")
                .doc(idCategoria)
                .delete()
                .then(() => {
                    console.log("categoria eliminada");
                    router.push("/categorias");
                });
        },
    },
};