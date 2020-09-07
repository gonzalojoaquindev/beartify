<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon>
        <v-dialog v-model="modalSalir" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon>
              <v-icon v-on="on" v-bind="attrs">mdi-close</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">Salir</v-card-title>
            <v-card-text>¿Estas seguro de salir sin guardar los cambios?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="modalSalir = false">NO</v-btn>
              <v-btn color="primary" text>
                <router-link to="/cuentas">SI</router-link>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Editar categoria</v-toolbar-title>
      <v-spacer></v-spacer>

      <!--Ventana modal para salir------------>
      <v-dialog v-model="modalEliminar" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon>
            <v-icon v-on="on" v-bind="attrs">mdi-delete</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Salir</v-card-title>
          <v-card-text>¿Estas seguro de salir sin guardar los cambios?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="modalEliminar = false">NO</v-btn>
            <v-btn color="primary" text @click="eliminarCategoria">SI</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--Fin Ventana modal para salir---------->

      <v-btn icon>
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-toolbar>

    <h1>EDITAR CAT</h1>

    <v-card class="mx-auto" tile>
      <v-list flat>
        <v-list-item-group v-model="items" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-avatar>
              <v-icon color="white" :class="[item.color]" v-text="item.icon"></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.nombre"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider class="mx-4"></v-divider>
      <v-list flat>
        <v-list-item-group v-model="items[0].sub" color="primary">
          <v-list-item v-for="(item, i) in items.sub" :key="i">
            <v-list-item-avatar>
              <v-icon color="white" :class="[item.color]" v-text="item.icon"></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.nombre"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>



<script>
export default {
  props: {
    source: String,
  },
  name: "CuentaEditar",
  data() {
    return {
      modalSalir: false,
      modalEliminar: false,
      item: 1,
      items: [
        {
          nombre: "Automóvil",
          icon: "mdi-car",
          color: "blue",
          sub: [
            { nombre: "limpieza", icon: "mdi-car-wash" },
            { nombre: "Combustible", icon: "mdi-fuel" },
          ],
        },
      ],

      categorias: [
        {
          icon: "mdi-car",
          nombre: "auto",
          color: "blue",
        },
        {
          icon: "mdi-home",
          nombre: "Vivienda",
          color: "orange",
          subcategoria: [
            {
              nombre: "hipoteca",
              icon: "mdi-home-currensy-usd",
            },
            {
              nombre: "energy",
              icon: "mdi-lightbulb",
            },
          ],
        },
      ],
    };
  },
  methods: {
    editarCategoria: function (index) {
      this.categorias[index].estado = true;
      localStorage.setItem("categorias-vue", JSON.stringify(this.categorias));
    },
    eliminarCategoria: function (index) {
      this.categorias.splice(index, 1);
      localStorage.setItem("categorias-vue", JSON.stringify(this.categorias));
      this.modalEliminar = false;
    },
  },
  created: function () {
    let datosDB = JSON.parse(localStorage.getItem("categorias-vue"));
    if (datosDB === null) {
      this.categorias = [];
    } else {
      this.categorias = datosDB;
    }
  },
};
</script>