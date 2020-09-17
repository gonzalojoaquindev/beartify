<template>
  <v-card class="mx-auto my-1" width="96%">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Saldo por cuentas</v-list-item-title>
          <v-card-title primary-title>{{total}}</v-card-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-btn text color="secondary" outlined>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item v-for="(item, i) in SaldosFormateados" :key="i">
        <v-list-item-content>
          <v-list-item-subtitle v-text="item.nombre"></v-list-item-subtitle>
          <v-list-item-subtitle v-text="item.moneda"></v-list-item-subtitle>
          <v-progress-linear :value="item.numero *100/saldoMayor" :color="item.color"></v-progress-linear>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { currency } from "../currency.js";
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
    cuentasFiltradas: function () {
      //filtrar solo las cuentas que sean de debito, efectivo o cuenta corriente
      let cuentasEfectivo = this.cuentas.filter((cuenta) => {
        return cuenta.tipo !== "Crédito";
      });
      /*   //ordenar por el saldo de mayor a menor
      cuentasEfectivo.sort(function (a, b) {
        return b.saldo - a.saldo;
      }); */
      return cuentasEfectivo;
    },
    cuentasOrdenadas: function () {
      let ordenadas = this.cuentasFiltradas.sort(function (a, b) {
        return b.saldo - a.saldo;
      });
      return ordenadas;
    },
    SaldosFormateados: function () {
      let formateados = this.cuentasOrdenadas.map((cuenta) => {
        return {
          nombre: cuenta.nombre,
          color: cuenta.color,
          numero: parseInt(cuenta.saldo),
          saldo: cuenta.saldo,
          moneda: currency(parseInt(cuenta.saldo, 10)),
        };
      });
      return formateados;
    },
    saldoMayor: function () {
      return this.SaldosFormateados[0].numero;
    },
    total: function () {
      const sumarSaldos = (saldos, siguienteCuenta) =>
        saldos + parseInt(siguienteCuenta.saldo, 10);
      const saldos = this.cuentasFiltradas.reduce(sumarSaldos, 0);
      const totalFormatoDinero = currency(saldos);
      return totalFormatoDinero;
    },
  },

  data: () => ({
    item: 1,
  }),
};
</script>