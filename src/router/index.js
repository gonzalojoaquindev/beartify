import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: () =>
            import ("../views/Home.vue"),
    },

    //Cuentas
    {
        path: "/editarcuenta/:id",
        name: "CuentaEditar",
        component: () =>
            import ("../views/CuentaEditar.vue"),
    },
    {
        path: "/cuentas",
        name: "CuentaLeer",
        component: () =>
            import ("../views/CuentaLeer.vue"),
    },
    {
        path: "/crearcuenta",
        name: "CuentaCrear",
        component: () =>
            import ("../views/CuentaCrear.vue"),
    },

    //Registros
    {
        path: "/crearregistro",
        name: "RegistroCrear",
        component: () =>
            import ("../views/RegistroCrear.vue"),
    },
    {
        path: "/editarregistro/:id",
        name: "RegistroEditar",
        component: () =>
            import ("../views/RegistroEditar.vue"),
    },
    {
        path: "/registros",
        name: "RegistroLeer",
        component: () =>
            import ("../views/RegistroLeer.vue"),
    },

    //Categorias
    {
        path: "/editarcategoria/:id",
        name: "CategoriaEditar",
        component: () =>
            import ("../views/CategoriaEditar.vue"),
    },
    {
        path: "/categorias",
        name: "CategoriaLeer",
        component: () =>
            import ("../views/CategoriaLeer.vue"),
    },
    {
        path: "/crearcategoria",
        name: "CategoriaCrear",
        component: () =>
            import ("../views/CategoriaCrear.vue"),
    },
    {
        path: "/selecionarcategoria",
        name: "CategoriaSeleccionar",
        component: () =>
            import ("../views/CategoriaSeleccionar.vue"),
    },

    //Subcategorias
    {
        path: "/editarsubcategoria/:id/:position",
        name: "SubcategoriaEditar",
        component: () =>
            import ("../views/SubcategoriaEditar.vue"),
    },
    {
        path: "/subcategorias",
        name: "SubcategoriaLeer",
        component: () =>
            import ("../views/SubcategoriaLeer.vue"),
    },
    {
        path: "/crearsubcategoria",
        name: "SubcategoriaCrear",
        component: () =>
            import ("../views/SubcategoriaCrear.vue"),
    },
    {
        path: "/selecionarsubcategoria",
        name: "SubcategoriaSeleccionar",
        component: () =>
            import ("../views/SubcategoriaSeleccionar.vue"),
    },
    {
        path: "/ajustes",
        name: "Ajustes",
        component: () =>
            import ("../views/Ajustes.vue"),
    },


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

function notificar() {
    alert = true;
}

export default router;