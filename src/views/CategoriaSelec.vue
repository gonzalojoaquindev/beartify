<template>
  <div>
    <v-toolbar>
      <v-btn icon :to="{name:'RegistroCrear'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Categoría</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <h1>Seleccionar categoria</h1>
      <v-row>
        <v-card width="96%" class="mx-auto mb-1" v-for="item in categorias" :key="item.title">
          <v-list>
            <v-list-item :to="{name: 'CategoriaSubSelec', params:{id: item.id}}">
              <v-list-item-avatar>
                <v-icon :class="item.color" v-text="item.icono"></v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.nombre"></v-list-item-title>
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
import TarjetaCategoria from "@/components/TarjetaCategoria.vue";
import BotonFlotante from "@/components/BotonFlotante.vue";
import Snackbar from "@/components/Snackbar.vue";
export default {
  name: "CategoriaSelec",
  components: {
    TarjetaCategoria,
    BotonFlotante,
  },
  created() {
    this.getCategorias();
  },
  computed: {
    ...mapState("categorias", ["categorias"]),
  },

  methods: {
    ...mapActions("categorias", ["getCategorias"]),
  },
};
</script>