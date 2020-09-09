
<template>
  <!--incio de <formulario------------------------------------------->
  <div>
    <!--formulario------------------------------------------->
    <v-form @submit.prevent="agregarRegistro(nuevo)">
      <v-toolbar>
        <v-btn icon :to="{name:'RegistroLeer'}">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon type="submit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-toolbar>

      <!--Selector-->
      <v-tabs :grow="true" v-model="nuevo.tipo">
        <v-tab>INGRESO</v-tab>
        <v-tab>GASTO</v-tab>
        <v-tab>TRANSFERIR</v-tab>
      </v-tabs>
      <!------------->
      <v-container>
        <!--Monto--------------------->
        <v-col cols="12" sm="6" md="3">
          <v-text-field label="0" solo type="number" suffix="CLP" prefix="$" v-model="nuevo.monto"></v-text-field>
        </v-col>
        <!------------------------------>

        <!--Cuentas y categorias-------------------->
        <v-row>
          <!--cuentas-->
          <v-col cols="6">
            <v-select :items="cuentas" label="Cuenta" v-model="nuevo.cuenta"></v-select>
          </v-col>
          <!--categorias-->
          <v-col cols="6">
            <router-link :to="{name:'CategoriaSeleccionar'}">
              <v-select :items="categorias" label="Categoria" v-model="nuevo.categoria"></v-select>
            </router-link>
          </v-col>
        </v-row>
        <!--Fin Cuentas y categorias-------------------->

        <!--Fecha y hora--------------------------->

        <v-row>
          <!--Input Fecha-->
          <v-col cols="6" sm="6" md="4">
            <v-dialog
              ref="dialog"
              v-model="modalFecha"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="nuevo.fecha"
                  label="Picker in dialog"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="nuevo.fecha" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="secondary" @click="modalFecha = false">Cancel</v-btn>
                <v-btn text color="secondary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <!--Fin Fecha-->

          <!--Input hora-->
          <v-col cols="6">
            <v-dialog
              ref="dialogHora"
              v-model="modalHora"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="nuevo.hora" label="Hora" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-time-picker v-if="modalHora" v-model="nuevo.hora" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalHora = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialogHora.save(time)">OK</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <!--Fin hora-->

        <!--Fecha y hora--------------------------->

        <!--Input notas-->
        <v-text-field label="Notas" v-model="nuevo.nota"></v-text-field>

        <!--Input Beneficiado-->
        <v-text-field label="Beneficiado" v-model="nuevo.beneficiado"></v-text-field>
      </v-container>
    </v-form>
  </div>

  <!--fin del formulario----------------------------------------->
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "RegistroCrear",

  data() {
    return {
      nuevo: {
        monto: "",
        categoria: "",
        nota: "",
        beneficiado: "",
        fecha: new Date().toISOString().substr(0, 10),
        hora: new Date().toString().substr(16, 5),
        icon: "",
        tipo: "",
        cuenta: "cuenta rut",
      },
      date: new Date().toISOString().substr(0, 10),
      modalFecha: false,
      modalHora: false,
      fecha: false,
      time: null,
      cuentas: ["cuenta rut", "cuenta corriente", "Mastercard Banco Estado"],
      categorias: ["viajes", "casa", "salud", "automovil"],
    };
  },
  methods: {
    ...mapActions("registros", ["agregarRegistro"]),
  },
};
</script>





