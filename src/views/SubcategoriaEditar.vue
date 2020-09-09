<template>
  <div>
    <!--incio de formulario------------------------------------------->
    <v-form @submit.prevent="editarCategoria(categoria)">
      <!--Incio de toolbar--------------------------->
      <v-toolbar>
        <v-btn icon :to="{ name: 'CategoriaLeer' }">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>Editar subcategoria</v-toolbar-title>
        <v-spacer></v-spacer>

        <!--Ventana modal------------>
        <v-dialog v-model="modalEliminar" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon>
              <v-icon v-on="on" v-bind="attrs">mdi-delete</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline"></v-card-title>
            <v-card-text>¿Estas seguro de que quieres eliminar este elemento?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="modalEliminar = false">NO</v-btn>
              <!--aqui boton para eliminar---------->
              <v-btn color="primary" text @click="eliminarCategoria(categoria.id)">SI</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--Fin Ventana modal---------->

        <v-btn icon type="submit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-toolbar>

      <!--Fin de toolbar-------------------------------->
      <v-container>
        <!--Fin Ventana modal para salir---------->

        <!--Incio de inputs---------->
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Nombre de la subcategoría"
              v-model="categoria.sub[position].nombre"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field label="icono" v-model="categoria.sub[position].icono"></v-text-field>
          </v-col>
        </v-row>
        <!--Fin de inputs---------->
      </v-container>
    </v-form>
  </div>
  <!--fin del formulario----------------------------------------->
</template>



<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CategoriaEditar",
  data() {
    return {
      item: 1,
      modalSalir: false,
      modalEliminar: false,
      id: this.$route.params.id,
      position: this.$route.params.position,
    };
  },
  created() {
    this.getCategoria(this.id);
  },
  methods: {
    ...mapActions("categorias", [
      "getCategoria",
      "editarCategoria",
      "eliminarCategoria",
    ]),
  },
  computed: {
    ...mapState("categorias", ["categoria"]),
  },
};
</script>