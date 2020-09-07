import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: () =>
            import ("../views/Home.vue"),
    },
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
        path: "/ajustes",
        name: "Ajustes",
        component: () =>
            import ("../views/Ajustes.vue"),
    },
    {
        path: "/selecionarcategoria",
        name: "CategoriaSelec",
        component: () =>
            import ("../views/CategoriaSelec.vue"),
    },
    {
        path: "/selecionarsubcategoria",
        name: "CategoriaSubSelec",
        component: () =>
            import ("../views/CategoriaSubSelec.vue"),
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