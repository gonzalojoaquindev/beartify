<template>
  <v-card class="mx-auto my-1" width="96%">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Lista de cuentas</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-btn text color="secondary" outlined>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item-group v-model="item" color="secondary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-content>
            <v-list-item-subtitle v-text="item.nombre"></v-list-item-subtitle>
            <v-list-item-title v-text="item.saldo"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TarjetaCuentaLista",
  created() {
    this.getRegistros();
  },
  methods: {
    ...mapActions("registros", ["getRegistros"]),
  },

  computed: {
    ...mapState("registros", ["registros"]),
  },
  data: () => ({
    item: 1,
    items: [
      { nombre: "Cuenta RUT", saldo: "120.00", color: "teal" },
      { nombre: "Cuenta corriente", saldo: "400.500", color: "orange" },
    ],
  }),
};
</script>