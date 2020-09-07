<template>
  <div>
    <v-form @submit.prevent="agregarCategoria(nuevaCategoria)">
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

        <v-toolbar-title>Nueva Categoria</v-toolbar-title>
        <v-spacer></v-spacer>

        <!--Ventana modal para salir------------>
        <v-btn icon type="submit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <!--Fin Ventana modal para salir---------->

        <!--Incio de inputs---------->
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Nombre de la Categoría"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field label="icono"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="color"></v-text-field>
          </v-col>
        </v-row>
        <!--Fin de inputs---------->
      </v-container>
    </v-form>
  </div>
</template>



<script>
import { mapActions } from "vuex";
export default {
  name: "CuentaCrear",
  data() {
    return {
      modalSalir: false,
      categorias: [""],
      nuevaCategoria: {
        icono: "",
        nombre: "",
        color: "",
      },
    };
  },
  methods: {
    ...mapActions("categorias", ["agregarCategoria"]),
  },
};
</script>
