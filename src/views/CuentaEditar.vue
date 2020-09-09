<template>
  <div>
    <!--incio de formulario------------------------------------------->
    <v-form @submit.prevent="editarCuenta(cuenta)">
      <!--Incio de toolbar--------------------------->
      <v-toolbar>
        <v-btn icon :to="{ name: 'CuentaLeer' }">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>Detalle de cuenta</v-toolbar-title>
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
              <v-btn color="primary" text @click="eliminarCuenta(cuenta.id)">SI</v-btn>
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

      <v-container>
        <!--Fin Ventana modal para salir---------->

        <!--Incio de inputs---------->
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Nombre de la cuenta" v-model="cuenta.nombre"></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="tipo" label="Tipo de cuenta" v-model="cuenta.tipo"></v-select>
          </v-col>
          <v-col v-if="cuenta.tipo !== 'Crédito'" cols="12" sm="6">
            <v-text-field type="number" label="Saldo actual" v-model="cuenta.saldo"></v-text-field>
          </v-col>
        </v-row>
        <!--Si es credito o con linea de credito-->
        <v-row v-if="cuenta.tipo === 'Crédito' || cuenta.tipo === 'Debito con sobregiro'">
          <v-col cols="6" sm="6">
            <v-text-field
              label="Límite tarjeta de crédito"
              v-model="cuenta.cupo"
              :prefix="cuenta.moneda"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-text-field
              type="number"
              label="Línea de crédtio utilizada"
              v-model="cuenta.utilizado"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              type="number"
              label="Fecha de vencimiento del pago"
              v-model="cuenta.vencimiento"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Número de la cuenta bancaria" v-model="cuenta.numero"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Institucion Bancaria o comercial" v-model="cuenta.institucion"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Icono" v-model="cuenta.icono"></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="color" label="Color" v-model="cuenta.color"></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="moneda" label="moneda" v-model="cuenta.moneda"></v-select>
          </v-col>
        </v-row>
        <!--Fin de inputs---------->
      </v-container>
    </v-form>
  </div>
  <!--fin del formulario----------------------------------------->
</template>



<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CuentaEditar",
  data() {
    return {
      item: 1,
      modalSalir: false,
      modalEliminar: false,
      id: this.$route.params.id,
      moneda: ["CLP", "USD"],
      color: [
        "orange",
        "blue",
        "red",
        "teal",
        "yellow",
        "pink",
        "green",
        "deep-purple",
        "purple",
        "indigo",
        "cyan",
        "lime",
        "amber",
        "deep-orange",
        "brown",
        "blue-grey",
      ],
      tipo: ["Debito", "Debito con sobregiro", "Crédito", "Ahorro", "Efectivo"],
    };
  },
  created() {
    this.getCuenta(this.id);
  },
  methods: {
    ...mapActions("cuentas", ["getCuenta", "editarCuenta", "eliminarCuenta"]),
  },
  computed: {
    ...mapState("cuentas", ["cuenta"]),
  },
};
</script>