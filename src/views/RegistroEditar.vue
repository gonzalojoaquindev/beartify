<template>
  <div>
    <!--incio de formulario------------------------------------------->
    <form @submit.prevent="editarRegistro(registro)">
      <!--Incio de toolbar--------------------------->
      <v-toolbar>
        <v-btn icon :to="{ name: 'RegistroLeer' }">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>Detalle de registro</v-toolbar-title>
        <v-spacer></v-spacer>

        <!--Ventana modal------------>
        <v-dialog v-model="modalEliminar" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon>
              <v-icon v-on="on" v-bind="attrs">mdi-delete</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline"></v-card-title>
            <v-card-text>¿Estas seguro de que quieres eliminar este elemento?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="modalEliminar = false">NO</v-btn>
              <!--aqui boton para eliminar---------->
              <v-btn color="primary" text @click="eliminarRegistro(registro.id)">SI</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--Fin Ventana modal---------->

        <v-btn icon>
          <v-icon>mdi-call-split</v-icon>
        </v-btn>
        <v-btn icon type="submit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-toolbar>

      <!--Fin de toolbar-------------------------------->

      <!--Selector-->
      <v-tabs :value="registro.tipo" :grow="true" v-model="registro.tipo">
        <v-tab>INGRESO</v-tab>
        <v-tab>GASTO</v-tab>
        <v-tab>TRANSFERIR</v-tab>
      </v-tabs>
      <!------------->

      <!--Monto y moneda--------------------->
      <v-container>
        <v-row>
          <!--Monto----------------->
          <v-col cols="6" sm="6" md="3">
            <v-text-field label="Monto" type="number" prefix="$" v-model="registro.monto"></v-text-field>
          </v-col>
          <!---------------------------->
          <!--Moneda-------------------------->

          <v-col cols="6" sm="6" md="3">
            <v-select :items="moneda" label="Moneda"></v-select>
          </v-col>
        </v-row>
        <!---------------------------------->

        <!--Cuentas y categorias-------------------->
        <v-row>
          <!--Cuentas-->
          <v-col cols="6">
            <v-select :items="categorias" label="Categoria" v-model="registro.categoria"></v-select>
          </v-col>
          <!--Categorias-->
          <v-col cols="6">
            <v-select :items="cuentas" label="Cuenta" v-model="registro.cuenta"></v-select>
          </v-col>
        </v-row>
        <!--Fin Cuentas y categorias-------------------->

        <!--Fecha y hora--------------------------->

        <v-row>
          <!--Input Fecha-->
          <v-col cols="6">
            <v-dialog
              ref="dialog"
              v-model="modalFecha"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="registro.fecha"
                  label="Fecha"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker v-model="registro.fecha" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalFecha = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <!--Fin Fecha-->

          <!--Input hora-->
          <v-col cols="6">
            <v-dialog
              ref="dialog"
              v-model="modalHora"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="registro.hora"
                  label="Hora"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="modalHora" v-model="registro.hora" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalHora = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <!--Fin hora-->

        <!--Fecha y hora--------------------------->

        <!--Input notas-->
        <v-text-field label="Notas" v-model="registro.nota"></v-text-field>

        <!--Input Beneficiado-->
        <v-text-field label="Beneficiado" v-model="registro.beneficiado"></v-text-field>
      </v-container>
    </form>
  </div>
  <!--fin del formulario----------------------------------------->
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    source: String,
  },
  name: "RegistroEditar",
  data() {
    return {
      id: this.$route.params.id,
      modalEliminar: false,
      modalFecha: false,
      modalHora: false,
      date: new Date().toISOString().substr(0, 10),
      time: null,
      cuentas: ["cuenta rut", "cuenta corriente", "Mastercard Banco Estado"],
      categorias: ["viajes", "casa", "salud", "automovil"],
      moneda: ["CLP", "USD"],
    };
  },
  created() {
    this.getRegistro(this.id);
  },
  methods: {
    ...mapActions("registros", [
      "getRegistro",
      "editarRegistro",
      "eliminarRegistro",
    ]),
  },
  computed: {
    ...mapState("registros", ["registro"]),
  },
};
</script>





