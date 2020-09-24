<template>
  <v-app>
    <Navbar :titulo="'Inicio'" />
    <!--  <TarjetaCuentaLista /> -->
    <TarjetaSaldoCuenta />
    <TarjetaGastosMes />
    <!--     <TarjetaEstructuraGastos /> -->
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BotonFlotante from "@/components/BotonFlotante.vue";
import TarjetaCuentaLista from "@/components/TarjetaCuentaLista.vue";
import TarjetaSaldoCuenta from "@/components/TarjetaSaldoCuenta.vue";
import TarjetaEstructuraGastos from "@/components/TarjetaEstructuraGastos.vue";
import TarjetaGastosMes from "@/components/TarjetaGastosMes.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    BotonFlotante,
    TarjetaCuentaLista,
    TarjetaSaldoCuenta,
    TarjetaEstructuraGastos,
    TarjetaGastosMes,
  },
};
</script>


