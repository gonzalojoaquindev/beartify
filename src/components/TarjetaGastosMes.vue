<template>
  <v-card class="mx-auto my-1" width="96%">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Gastos mes Septiembre</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-btn text color="secondary" outlined>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Categoria</th>
              <th class="text-left">Presupuesto</th>
              <th class="text-left">Pagado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in gastos.mensuales" :key="item.categoria">
              <td>
                <v-icon>mdi-home</v-icon>
                {{ item.categoria }}
              </td>
              <td>{{ item.presupuesto }}</td>
              <td>{{ item.pagado }}</td>
            </tr>
            <tr v-for="item in gastos.anuales" :key="item.categoria">
              <td>
                <v-icon>mdi-home</v-icon>
                {{ item.categoria }}
              </td>
              <td>{{ item.presupuesto }}</td>
              <td>{{ item.pagado }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <h3>cuentas:</h3>
      <p>{{cuentas}}</p>
      <br />
      <h3>categorias</h3>
      <p>{{categorias}}</p>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { currency } from "../currency.js";
export default {
  name: "TarjetaCuentaLista",
  data() {
    return {
      gastos: {
        mensuales: [
          { categoria: "casa", presupuesto: 100000, pagado: 0 },
          { categoria: "pasaje bus", presupuesto: 60000, pagado: 0 },
          { categoria: "dentista", presupuesto: 40000, pagado: 0 },
          { categoria: "internet", presupuesto: 30000, pagado: 30000 },
        ],
        anuales: [
          { categoria: "18 de septiembre", presupuesto: 50000, pagado: 0 },
          { categoria: "cumpleaños lalo", presupuesto: 5000, pagado: 0 },
        ],
        variables: [
          { categoria: "CMR", presupuesto: 20000, pagado: 0 },
          { categoria: "MasterCard", presupuesto: 30000, pagado: 0 },
        ],
        ahorro: [
          { categoria: "vivienda", presupuesto: 50000, pagado: 50000 },
          { categoria: "viajes", presupuesto: 70000, pagado: 0 },
        ],
      },
    };
  },
  created() {
    this.getCuentas();
    this.getCategorias();
  },
  methods: {
    ...mapActions("cuentas", ["getCuentas"]),
    ...mapActions("categorias", ["getCategorias"]),
  },

  computed: {
    ...mapState("cuentas", ["cuentas"]),
    ...mapState("categorias", ["categorias"]),

    gastos: function () {
      let formateados = this.categorias.map((categoria) => {
        return {
          categoria: categoria.nombre,
          color: categoria.color,
          presupuesto: currency(1500),
          gastado: currency(1300),
        };
      });
      return formateados;
      /* 
    cuentasFiltradas: function () {
      //filtrar solo las cuentas que sean de debito, efectivo o cuenta corriente
      let cuentasEfectivo = this.cuentas.filter((cuenta) => {
        return cuenta.tipo !== "Crédito";
      });
        //ordenar por el saldo de mayor a menor
      cuentasEfectivo.sort(function (a, b) {
        return b.saldo - a.saldo;
      });
      return cuentasEfectivo;
    },
    cuentasOrdenadas: function () {
      let ordenadas = this.cuentasFiltradas.sort(function (a, b) {
        return b.saldo - a.saldo;
      });
      return ordenadas;
    },
    
    },
    saldoMayor: function () {
      return this.SaldosFormateados[0].numero;
    },
    total: function () {
      const sumarSaldos = (saldos, siguienteCuenta) =>
        saldos + parseInt(siguienteCuenta.saldo, 10);
      const saldos = this.cuentasFiltradas.reduce(sumarSaldos, 0);
      const totalFormatoDinero = currency(saldos);
      return totalFormatoDinero;*/
    },
  },
};
</script>