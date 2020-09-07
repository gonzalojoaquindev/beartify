<template>
  <v-container fluid>
    <Navbar :titulo="'Cuentas'" />
    <TarjetaCuenta />
    <v-btn :to="{name: 'CuentaCrear'}" absolute dark fab bottom right fixed color="secondary">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import TarjetaCuenta from "@/components/TarjetaCuenta.vue";
import BotonFlotante from "@/components/BotonFlotante.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "CuentaLeer",
  components: {
    TarjetaCuenta,
    BotonFlotante,
    Navbar,
  },
};
</script>
