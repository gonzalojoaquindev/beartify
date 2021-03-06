import { db, firebase } from "../firebase";
import router from "../router";
export default {
    namespaced: true,
    state: {
        categorias: [],
        categoria: {
            nombre: "",
            icono: "",
            color: "",
            sub: [],
        },
        categoriaSeleccionada: "",
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
                        let categoria = doc.data();
                        categoria.id = doc.id;
                        categorias.push(categoria);
                    });
                    commit("setCategorias", categorias);
                    console.log("categorias leidas correctamente");
                });
        },
        getCategoria({ commit }, idCategoria) {
            db.collection("categorias")
                .doc(idCategoria)
                .get()
                .then((doc) => {
                    console.log("categoria leida correctamente");
                    console.log(doc.data());
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
                    console.log("categoria editada correctamente");
                    router.push("/categorias");
                });
        },
        agregarCategoria({ commit }, nuevo) {
            db.collection("categorias")
                .add({
                    nombre: nuevo.nombre,
                    icono: nuevo.icono,
                    color: nuevo.color,
                    sub: [],
                })
                .then((doc) => {
                    console.log("categoria agregada correctamente");
                    router.push("/categorias");
                });
        },
        eliminarCategoria({ commit }, idCategoria) {
            db.collection("categorias")
                .doc(idCategoria)
                .delete()
                .then(() => {
                    console.log("categoria eliminada correctamente");
                    router.push("/categorias");
                });
        },
        agregarSubcategoria({ commit }, subcategoria) {
            db.collection("categorias")
                .doc(subcategoria.id)
                .update({
                    sub: firebase.firestore.FieldValue.arrayUnion(subcategoria),
                })
                .then(() => {
                    console.log("Subcategoria agregada correctamente");
                    router.push("/categorias");
                });
        },
    },
};