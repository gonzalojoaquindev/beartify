<template>
  <div>
    <!--incio de formulario------------------------------------------->
    <v-form @submit.prevent="editarCategoria(categoria)">
      <!--Incio de toolbar--------------------------->
      <v-toolbar>
        <v-btn icon :to="{ name: 'CategoriaLeer' }">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>{{ categoria.nombre }}</v-toolbar-title>
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
            <v-card-text
              >¿Estas seguro de que quieres eliminar este elemento?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="modalEliminar = false"
                >NO</v-btn
              >
              <!--aqui boton para eliminar---------->
              <v-btn
                color="primary"
                text
                @click="eliminarCategoria(categoria.id)"
                >SI</v-btn
              >
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
          <v-avatar class="mx-auto mb-1" size="70" :class="categoria.color">
            <v-icon size="50">{{ categoria.icono }}</v-icon>
          </v-avatar>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Nombre de la Categoría"
              v-model="categoria.nombre"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="icono"
              v-model="categoria.icono"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="color"
              v-model="categoria.color"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-subheader v-if="categoria.sub != ['']">SUBCATEGORIAS</v-subheader>
        <v-row>
          <v-card
            width="96%"
            class="mx-auto mb-1"
            v-for="item in categoria.sub"
            :key="item.title"
          >
            <v-list>
              <v-list-item
                :to="{
                  name: 'SubcategoriaEditar',
                  params: {
                    id: categoria.id,
                    position: categoria.sub.indexOf(item),
                  },
                }"
              >
                <v-list-item-avatar :color="categoria.color">
                  <v-icon>{{ item.icono }}</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-btn
            :to="{
              name: 'SubcategoriaCrear',
              params: { id: categoria.id },
            }"
            absolute
            dark
            fab
            bottom
            right
            fixed
            color="secondary"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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