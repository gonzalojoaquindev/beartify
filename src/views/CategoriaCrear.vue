<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon>
        <v-dialog v-model="modalSalir" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon>
              <v-icon v-on="on" v-bind="attrs">mdi-close</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">Salir</v-card-title>
            <v-card-text>¿Estas seguro de salir sin guardar los cambios?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="modalSalir = false">NO</v-btn>
              <v-btn color="primary" text>
                <router-link to="/cuentas">SI</router-link>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Nueva Categoria</v-toolbar-title>
      <v-spacer></v-spacer>

      <!--Ventana modal para salir------------>
      <v-btn icon>
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-toolbar>
    <v-app>
      <v-container>
        <!--Fin Ventana modal para salir---------->

        <!--Incio de inputs---------->
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Nombre de la Categoría"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field label="icono"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="color"></v-text-field>
          </v-col>
        </v-row>
        <!--Fin de inputs---------->
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "CuentaCrear",
  data() {
    return {
      modalSalir: false,
      cuentas: [""],
      nuevaCuenta: {
        icon: "",
        nombre: "",
        institucion: "",
        tipo: "",
        color: "",
        moneda: "",
        numero: "",
      },
      moneda: ["CLP", "USD"],
      color: ["orange", "blue", "red", "teal", "yellow", "pink"],
      tipo: ["Debito", "Debito con sobregiro", "Crédito", "Ahorro", "Efectivo"],
    };
  },
  methods: {
    crearCuenta: function () {
      console.log(this.registros);
      this.registros.push({
        icon: this.nuevaCuenta.icon,
        tipo: this.nuevaCuenta.tipo,
        nombre: this.nuevaCuenta.nombre,
        color: this.nuevaCuenta.color,
        moneda: this.nuevaCuenta.moneda,
        institucion: this.nuevaCuenta.institucion,
        numero: this.nuevaCuenta.numero,
      });
      this.nuevaCuenta = "";
      localStorage.setItem("cuentas-vue", JSON.stringify(this.cuentas));
    },
  },
};
</script>
