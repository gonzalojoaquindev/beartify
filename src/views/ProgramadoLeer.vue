<template>
  <v-container fluid>
    <Navbar :titulo="'Pagos programados'" />
    <TarjetaPagosProgramados />
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
import TarjetaPagosProgramados from "@/components/TarjetaPagosProgramados.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "ProgramadoLeer",
  components: {
    TarjetaPagosProgramados,
    Navbar,
  },
};
</script>


