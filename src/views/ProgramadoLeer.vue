<template>
  <v-container fluid>
    <Navbar :titulo="'Pagos programados'" />
    <TarjetaRegistro />
    <v-btn
      :to="{ name: 'ProgramadoCrear' }"
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
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import TarjetaRegistro from "@/components/TarjetaRegistro.vue";
import BotonFlotante from "@/components/BotonFlotante.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "ProgramadoLeer",
  components: {
    TarjetaRegistro,
    BotonFlotante,
    Navbar,
  },
};
</script>


