<template>
  <v-card class="mx-auto my-1" width="96%">
    <h1>{{cuentasState}}</h1>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Saldo por cuentas</v-list-item-title>
          <v-card-title primary-title>CLP 217.400</v-card-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-btn text color="secondary" outlined>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-content>
          <v-list-item-subtitle v-text="item.nombre"></v-list-item-subtitle>
          <v-list-item-subtitle v-text="item.saldo"></v-list-item-subtitle>
          <v-progress-linear :value="item.saldo" :color="item.color"></v-progress-linear>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TarjetaCuentaLista",
  created() {
    this.getCuentas();
  },
  methods: {
    ...mapActions("cuentas", ["getCuentas"]),
  },

  computed: {
    ...mapState("cuentas", ["cuentas"]),
    cuentasState: function () {
      return this.cuentas;
    },
  },
  data: () => ({
    item: 1,
    items: [
      { nombre: "Cuenta RUT", saldo: "50", color: "teal" },
      { nombre: "Cuenta corriente", saldo: "90", color: "orange" },
    ],
  }),
};
</script>