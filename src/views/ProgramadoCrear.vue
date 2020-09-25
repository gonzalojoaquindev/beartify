
<template>
  <!--incio de <formulario------------------------------------------->
  <div>
    <!--formulario------------------------------------------->
    <v-form @submit.prevent="agregarProgramado(nuevo)">
      <v-toolbar>
        <v-btn icon :to="{ name: 'ProgramadoLeer' }">
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
          <v-text-field
            label="0"
            solo
            type="number"
            suffix="CLP"
            prefix="$"
            v-model="nuevo.monto"
            required
          ></v-text-field>
        </v-col>
        <!------------------------------>
        <!--Cuentas y categorias-------------------->
        <v-row>
          <!--cuentas-->
          <v-col cols="6">
            <!--Si es un  ingreso-->
            <v-select
              v-if="nuevo.tipo === 0"
              :items="cuentasSaldo"
              label="Cuenta"
              v-model="nuevo.cuentaDestino"
            ></v-select>
            <!--Si es un  gasto-->
            <v-select
              v-if="nuevo.tipo === 1"
              :items="cuentasTodas"
              label="Cuenta"
              v-model="nuevo.cuenta"
            ></v-select>
            <!--Si es una trasnferencia -->
            <v-select
              v-if="nuevo.tipo === 2"
              :items="cuentasSaldo"
              label="Cuenta de origen"
              v-model="nuevo.cuentaOrigen"
            ></v-select>
          </v-col>

          <!--categorias-->
          <v-col cols="6">
            <!--<router-link :to="{name:'CategoriaSeleccionar'}">-->
            <v-select
              v-if="nuevo.tipo !== 2"
              :items="categorias"
              label="Categoria"
              v-model="nuevo.categoria"
            ></v-select>
            <!--</router-link>-->

            <v-select
              v-if="nuevo.tipo === 2"
              :items="cuentasSaldo"
              label="Cuenta de destino"
              v-model="nuevo.cuentaDestino"
            ></v-select>
          </v-col>
        </v-row>

        <!--Fin Cuentas y categorias-------------------->

        <!--Frecuencia, fecha y recordar--------------------------->
        <v-row>
          <v-col cols="12">
            <v-select
              :items="frecuencia"
              label="Frecuencia"
              v-model="nuevo.frecuencia"
            ></v-select>
          </v-col>

          <!--Input Fecha-->
          <v-col cols="6" sm="6" md="6">
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
                  label="Fecha"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="nuevo.fecha" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="secondary" @click="modalFecha = false"
                  >Cancel</v-btn
                >
                <v-btn text color="secondary" @click="$refs.dialog.save(date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>

          <!--Fin Fecha-->
          <!--Input recordar-->

          <v-col cols="6" sm="6" md="6">
            <v-select
              :items="recordar"
              label="Recordar"
              v-model="nuevo.recordar"
            ></v-select>
          </v-col>
        </v-row>

        <!--Recuerrencia: repetir, cada y seguir hasta-->
        <v-row v-if="nuevo.frecuencia === 'Repetir'">
          <!--REPETIR-->
          <v-col cols="7" sm="6">
            <v-select
              :items="recurrencia.repetir"
              v-model="nuevo.repetir"
            ></v-select>
          </v-col>
          <!--CADA-->
          <v-col cols="5" sm="6">
            <v-text-field
              prefix="cada"
              :suffix="sufijo"
              type="number"
              v-model="nuevo.cada"
            ></v-text-field>
          </v-col>

          <!--SEGUIR HASTA-->

          <v-col cols="7">
            <v-select
              label="Repetir"
              :items="recurrencia.seguir"
              item-text="nombre"
              item-valor="valor"
              v-model="nuevo.seguir.nombre"
            ></v-select>
          </v-col>
          <!--Input Fecha-->
          <v-col cols="5" v-if="nuevo.seguir.nombre === 'Hasta una fecha'">
            <v-dialog
              ref="dialogFecha"
              v-model="modalFechaLimite"
              :return-value.sync="seguirHastaUnaFecha"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="nuevo.seguir.evento"
                  label="Fecha"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="nuevo.seguir.evento" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="secondary" @click="modalFechaLimite = false"
                  >Cancelar</v-btn
                >
                <v-btn
                  text
                  color="secondary"
                  @click="$refs.dialogFecha.save(seguirHastaUnaFecha)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col
            cols="5"
            v-if="nuevo.seguir.nombre === 'Por un número de eventos'"
          >
            <v-text-field
              :suffix="sufijoEvento"
              type="number"
              v-model="nuevo.seguir.evento"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <!--Input notas-->
          <v-col cols="12">
            <v-text-field label="Notas" v-model="nuevo.nota"></v-text-field>
          </v-col>
          <!--Input Beneficiado-->
          <v-col cols="12">
            <v-text-field
              label="Beneficiado"
              v-model="nuevo.beneficiado"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              :items="eventos"
              label="Etiquetas"
              v-model="nuevo.etiquetas"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>

  <!--fin del formulario----------------------------------------->
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ProgramadoCrear",

  data() {
    return {
      modalParaRecurrencia: "",
      modalFechaLimite: false,
      seguirHastaUnaFecha: new Date().toISOString().substr(0, 10),
      frecuencia: ["Una vez", "Repetir"],
      modalRecurrencia: false,
      recurrencia: {
        repetir: [
          "Repetir diariamente",
          "Repetir semanalmente",
          "Repetir mensualmente",
          "Repetir anualmente",
        ],
        seguir: ["Por siempre", "Hasta una fecha", "Por un número de eventos"],
      },
      recordar: [
        "No recordar",
        "1 día antes",
        "3 días antes",
        "1 semana antes",
        "Primer día del mes",
      ],

      eventos: [
        { nombre: "Cumplaños", color: "", icono: "mdi-cake" },
        { nombre: "Aniversario", color: "red", icono: "mdi-heart" },
        { nombre: "Navidad", color: "", icono: "mdi-gift" },
        { nombre: "Vacaciones", color: "", icono: "mdi-palm-tree" },
      ],

      nuevo: {
        tipo: "",
        monto: "",
        cuentaOrigen: "",
        cuentaDestino: "",
        categoria: "",
        frecuencia: "Repetir",
        repetir: "Repetir mensualmente",
        cada: "1",
        seguir: { nombre: "Por siempre", evento: "" },
        recordar: "Primer día del mes",
        fecha: new Date().toISOString().substr(0, 10),
        icon: "",
        beneficiado: "",
        nota: "",
        etiqueta: "",
      },

      date: new Date().toISOString().substr(0, 10),
      modalFecha: false,
      fecha: false,
      time: null,
      categorias: ["Diversión", "Casa", "Viajes", "Automovil"],
    };
  },
  created() {
    this.getCuentas();
  },

  methods: {
    ...mapActions("programados", ["agregarProgramado"]),
    ...mapActions("cuentas", ["getCuentas"]),
  },
  computed: {
    ...mapState("cuentas", ["cuentas"]),
    //filtrar en la opción de ingreso que se vean solo las cuentas que tienen saldo.
    cuentasSaldo: function () {
      let cuentas = this.cuentas.filter((cuenta) => {
        return cuenta.tipo !== "Crédito";
      });
      let nombres = cuentas.map((cuenta) => {
        return cuenta.nombre;
      });
      return nombres;
    },
    //destructurar el array de objetos, para que sea un array con los nombres de las cuentas.
    cuentasTodas: function () {
      let nombres = this.cuentas.map((cuenta) => {
        return cuenta.nombre;
      });
      return nombres;
    },
    sufijo: function () {
      if (this.nuevo.repetir === "Repetir diariamente") {
        if (this.nuevo.cada == 1) {
          return "día";
        } else {
          return "días";
        }
      } else if (this.nuevo.repetir === "Repetir semanalmente") {
        if (this.nuevo.cada == 1) {
          return "semana";
        } else {
          return "semanas";
        }
      } else if (this.nuevo.repetir === "Repetir mensualmente") {
        if (this.nuevo.cada == 1) {
          return "mes";
        } else {
          return "meses";
        }
      } else {
        if (this.nuevo.cada == 1) {
          return "año";
        } else {
          return "años";
        }
      }
    },
    sufijoEvento: function () {
      if (this.nuevo.seguir.eventos == 1) {
        return "evento";
      } else {
        return "eventos";
      }
    },
  },
};
</script>





