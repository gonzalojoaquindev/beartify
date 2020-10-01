<template>
  <div>
    <v-toolbar>
      <v-btn icon :to="{ name: 'RegistroCrear' }">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ categoria.nombre }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-subheader>GENERAL</v-subheader>
        <v-card width="96%" class="mx-auto mb-1">
          <v-list>
            <v-list-item
              @click="getCategoriaSeleccionada(categoriaSeleccionada)"
            >
              <v-list-item-avatar>
                <v-icon :class="categoria.color">{{ categoria.icono }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ categoria.nombre }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-subheader v-if="categoria.sub != ['']">SUBCATEGORIAS</v-subheader>

        <v-card
          width="96%"
          class="mx-auto mb-1"
          v-for="(item, i) in categoria.sub"
          :key="item.i"
        >
          <v-list>
            <v-list-item @click="getCategoriaSeleccionada(categoria.sub[i])">
              <v-list-item-avatar :color="categoria.color">
                <v-icon>{{ item.icono }}</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.nombre }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "SubcategoriaSeleccionar",
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  created() {
    this.getCategoria(this.id);
  },
  methods: {
    ...mapActions("categorias", ["getCategoria"]),
    ...mapActions("registros", ["getCategoriaSeleccionada"]),
  },
  computed: {
    ...mapState("categorias", ["categoria"]),

    //En el caso que se escoja la categoria en vez de una subcategoria, se iba a enviar a la base de datos, todoso los parametros de la ctagoria incluynedo todas sus subcategorias, esto era ineficiente ya que ocupaba mucho espacio de la DB, para solucionar esto, obtengo solo los paramatros necesarios como el nombre para mostrarlo en (nuevo regristro), el id para empatar y su icono.
    categoriaSeleccionada() {
      let destructurado = {
        nombre: this.categoria.nombre,
        id: this.$route.params.id,
        icono: this.categoria.icono,
      };
      return destructurado;
    },
  },
};
</script>