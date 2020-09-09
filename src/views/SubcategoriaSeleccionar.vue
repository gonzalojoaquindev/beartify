<template>
  <div>
    <v-toolbar>
      <v-btn icon :to="{name:'RegistroCrear'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{categoria.nombre}}</v-toolbar-title>
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
            <v-list-item>
              <v-list-item-avatar>
                <v-icon :class="categoria.color">{{categoria.icono}}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{categoria.nombre}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-subheader v-if="categoria.sub != ['']">SUBCATEGORIAS</v-subheader>

        <v-card width="96%" class="mx-auto mb-1" v-for="item in categoria.sub" :key="item.title">
          <v-list>
            <v-list-item>
              <v-list-item-avatar :color="categoria.color">
                <v-icon>{{item.icono}}</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{item.nombre}}</v-list-item-title>
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
  },
  computed: {
    ...mapState("categorias", ["categoria"]),
  },
};
</script>