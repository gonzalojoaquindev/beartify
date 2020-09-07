<template>
  <div>
    <Navbar :titulo="'Cuentas'" />
    <v-container>
      <v-card class="mx-auto" max-width="344" outlined v-for="item in cuentas" :key="item.title">
        <router-link to="/editarcuenta">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon color="orange" :class="[item.iconClass]" v-text="item.icon"></v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.nombre"></v-list-item-title>
                <v-list-item-subtitle v-text="item.institucion"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.tipo"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-title v-text="item.monto"></v-list-item-title>
                <v-list-item-subtitle v-text="item.fecha"></v-list-item-subtitle>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </router-link>
      </v-card>
      <!--Boton flotante----------------------------------->

      <BotonFlotante />

      <!--Boton flotante----------------------------------->
    </v-container>
  </div>
</template>



<script>
export default {
  name: "CuentaLeer",
  data: () => ({
    cuentas: [
      {
        icon: "mdi-wallet",
        nombre: "Cuenta corriente",
        institucion: "Banco Estado",
        tipo: "Debito con sobregiro",
        color: "blue",
        moneda: "CLP",
        numero: "120-004-875",
      },
      {
        icon: "mdi-credit-card",
        nombre: "Cuenta Rut",
        institucion: "Banco Estado",
        tipo: "Debito",
        color: "orange",
        moneda: "CLP",
        numero: "18398956",
      },
    ],
  }),
};
</script>