<template>
  <v-app>
    <Navbar :titulo="'Inicio'" />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BotonFlotante from "@/components/BotonFlotante.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    BotonFlotante,
  },
};
</script>


