<template>
  <div>
    <v-form @submit.prevent="agregarSubcategoria(subcategoria, id)">
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
              <v-card-text
                >¿Estas seguro de salir sin guardar los cambios?</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="modalSalir = false"
                  >NO</v-btn
                >
                <v-btn color="primary" :to="{ name: 'CategoriaLeer' }" text
                  >SI</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app-bar-nav-icon>

        <v-toolbar-title>Crear subcategoria</v-toolbar-title>
        <v-spacer></v-spacer>

        <!--Ventana modal para salir------------>
        <v-btn icon type="submit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <!--Fin Ventana modal para salir---------->
        <h4>Crear subcategoría en {{ id }}</h4>
        <h5>{{ subcategoria }}</h5>
        <!--Incio de inputs---------->
        <v-row>
          <v-avatar class="mx-auto mb-1" size="70" :class="categoria.color">
            <v-icon size="50"> {{ subcategoria.icono }}</v-icon>
          </v-avatar>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Nombre de la Subcategoría"
              v-model="subcategoria.nombre"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="icono"
              v-model="subcategoria.icono"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--Fin de inputs---------->
      </v-container>
    </v-form>
  </div>
</template>



<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CuentaCrear",
  data() {
    return {
      modalSalir: false,
      id: this.$route.params.id,
      subcategoria: { nombre: "", icono: "", id: this.$route.params.id },
    };
  },
  created() {
    this.getCategoria(this.id);
  },
  methods: {
    ...mapActions("categorias", [
      "getCategoria",
      "editarCategoria",
      "agregarSubcategoria",
    ]),
  },
  computed: {
    ...mapState("categorias", ["categoria"]),
  },
};
</script>
