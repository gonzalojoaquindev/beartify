<template>
  <div>
    <v-form @submit.prevent="agregarCuenta(nuevaCuenta)">
      <v-toolbar>
        <v-btn icon :to="{name:'CuentaLeer'}">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon type="submit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-toolbar>

      <v-container>
        <!--Fin Ventana modal para salir---------->

        <!--Incio de inputs---------->
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Nombre de la cuenta" v-model="nuevaCuenta.nombre"></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="tipo" label="Tipo de cuenta" v-model="nuevaCuenta.tipo"></v-select>
          </v-col>
          <v-col v-if="nuevaCuenta.tipo !== 'Crédito'" cols="12" sm="6" md="3">
            <v-text-field label="Saldo inicial" v-model="nuevaCuenta.saldo"></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="nuevaCuenta.tipo === 'Crédito' || nuevaCuenta.tipo === 'Debito con sobregiro'">
          <v-col cols="6" sm="6">
            <v-text-field
              label="Límite de tarjeta de crédito"
              v-model="nuevaCuenta.cupo"
              :prefix="nuevaCuenta.moneda"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-text-field
              type="number"
              label="Línea de crédtio utilizada"
              v-model="nuevaCuenta.utilizado"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              type="number"
              label="Fecha de vencimiento del pago"
              v-model="nuevaCuenta.vencimiento"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Número de la cuenta bancaria" v-model="nuevaCuenta.numero"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Institucion Bancaria o comercial"
              v-model="nuevaCuenta.institucion"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6" sm="6" md="3">
            <v-text-field label="Icono" v-model="nuevaCuenta.icono"></v-text-field>
          </v-col>

          <v-col cols="6" sm="6">
            <v-select :items="color" label="Color" v-model="nuevaCuenta.color"></v-select>
          </v-col>
        </v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="moneda" label="moneda" v-model="nuevaCuenta.moneda"></v-select>
        </v-col>

        <!--Fin de inputs---------->
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CuentaCrear",
  data() {
    return {
      cuentas: [""],
      nuevaCuenta: {
        icono: "",
        nombre: "",
        institucion: "",
        tipo: "Debito",
        color: "",
        moneda: "CLP",
        numero: "",
        saldo: "0",
        cupo: "0",
        vencimiento: "",
      },
      moneda: ["CLP", "USD"],
      color: ["orange", "blue", "red", "teal", "yellow", "pink", "green"],
      tipo: ["Debito", "Debito con sobregiro", "Crédito", "Ahorro", "Efectivo"],
    };
  },
  methods: {
    ...mapActions("cuentas", ["agregarCuenta"]),
  },
};
</script>
