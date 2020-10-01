<template>
  <v-row>
    <v-card
      width="96%"
      class="mx-auto mb-1"
      v-for="item in categorias"
      :key="item.title"
    >
      <v-list>
        <v-list-item :to="{ name: 'CategoriaEditar', params: { id: item.id } }">
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
</template>




<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TarjetaCategoria",

  created() {
    this.getCategorias();
  },
  methods: {
    ...mapActions("categorias", ["getCategorias"]),
  },

  computed: {
    ...mapState("categorias", ["categorias"]),
  },
};
</script>