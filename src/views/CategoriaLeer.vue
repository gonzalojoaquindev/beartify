<template>
  <v-container fluid>
    <h1>hola</h1>
    <Navbar :titulo="'Categorias'" />
    <TarjetaCategoria />
    <v-btn :to="{name: 'CategoriaCrear'}" absolute dark fab bottom right fixed color="secondary">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import TarjetaCategoria from "@/components/TarjetaCategoria.vue";
import BotonFlotante from "@/components/BotonFlotante.vue";
import Navbar from "@/components/Navbar.vue";
import Snackbar from "@/components/Snackbar.vue";
export default {
  name: "CategoriaLeer",
  components: {
    TarjetaCategoria,
    BotonFlotante,
    Navbar,
  },
  data() {
    return {
      estado: true,
    };
  },
};
</script>